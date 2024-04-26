import { NextResponse } from 'next/server'
import axios from 'axios'
import Jackpot from '@/app/models/Jackpot';
import BronzeJackpot from '@/app/models/BronzeJackpot';
import SilverJackpot from '@/app/models/SilverJackpot';
import GoldJackpot from '@/app/models/GoldJackpot';
import Account from '@/app/models/Account';
import Control from '@/app/models/Control';
import { dbConnect, findAllMongo, findXMongo, findMongo, updateMongo } from '@/utils/dbMongo'
import md5 from 'md5'

dbConnect()

const createJackpot = async (jackpotData, saveToAll = true) => {
  const data = {jackpot: JSON.stringify(jackpotData)}
  const dateTemp = jackpotData.sql_inserted.split('.')
  const date = new Date(`${dateTemp[1]}/${dateTemp[0]}/${dateTemp[2]}`)
  if (jackpotData.sql_jp_name.toLowerCase() === 'bronze') await BronzeJackpot({ ...data, date }).save()
  else if (jackpotData.sql_jp_name.toLowerCase() === 'silver') await SilverJackpot({ ...data, date }).save()
  else if (jackpotData.sql_jp_name.toLowerCase() === 'gold') await GoldJackpot({ ...data, date }).save()
  if (saveToAll) await Jackpot(data).save()
  return true
};

const getJackpotCollection = (type) => {
  if (type === 'bronze') return BronzeJackpot
  else if (type === 'silver') return SilverJackpot
  else if (type === 'gold') return GoldJackpot
}

let lastJackpot = null
let temp = 4

const getIndexOfJackpot = (jackpots, lastJackpot) => {
  return jackpots.findIndex((obj) => (
    obj.jackpot === lastJackpot.jackpot &&
    obj.sql_bar === lastJackpot.sql_bar &&
    obj.sql_city === lastJackpot.sql_city &&
    obj.sql_inserted === lastJackpot.sql_inserted &&
    obj.sql_jp_name === lastJackpot.sql_jp_name &&
    obj.sql_machine === lastJackpot.sql_machine
  ))
}

export async function GET() {
  const casinoUrl = 'https://casinovictory.leris.cz/modules/playgames_jackpot/script/jackpotservice.php?IDbar=2'

  const data = await axios({
    method: 'GET',
    url: casinoUrl,
  })
  const controls = await findMongo(Control)

  var jackpots = data?.data
  const jackpotsHistory = jackpots?.history
  const jackpotsHistoryDB = (await findAllMongo(Jackpot))?.map((jackpot => JSON.parse(jackpot.jackpot || {})))
  if (!jackpotsHistoryDB) return NextResponse.json({ ...jackpots, controls })

  const historySettings = {
    gold: controls ? controls.lastJackpotsGold : 2,
    silver: controls ? controls.lastJackpotsSilver : 4,
    bronze: controls ? controls.lastJackpotsBronze : 5,
  }
  const history = {}
  for (const type in historySettings) {
    const numberToFind = historySettings[type]
    if (numberToFind > 0) {
      const jackpotsDB = (await findXMongo(getJackpotCollection(type), numberToFind))?.map((jackpot => JSON.parse(jackpot.jackpot || {})))
      history[type] = jackpotsDB
    }
  }
  jackpotsHistoryDB.sort((a, b) => new Date(b.sql_inserted) - new Date(a.sql_inserted))

  if (lastJackpot !== null) {
    const indexOfLastJackpot = getIndexOfJackpot(jackpotsHistory, lastJackpot)
    if (indexOfLastJackpot > 0) {
      for (let i = jackpotsHistory.length - 1; i >= 0; i--) {
        try {
          await createJackpot(jackpotsHistory[i])
        } catch {
          continue
        }
      }
      jackpots.newJackpot = jackpotsHistory[0]
    } else if (indexOfLastJackpot === -1) {
      for (let i = jackpotsHistory.length - 1; i >= 0; i--) {
        try {
          await createJackpot(jackpotsHistory[i])
        } catch {
          continue
        }
      }
    }
    lastJackpot = jackpotsHistory[0]
  } else {
    const databaseIndex = getIndexOfJackpot(jackpotsHistoryDB, jackpotsHistory[0])
    if (databaseIndex === -1) {
      for (let i = jackpotsHistory.length - 1; i >= 0; i--) {
        try {
          await createJackpot(jackpotsHistory[i])
        } catch {
          continue
        }
      }
    } else {
      for (let i = 0; i < databaseIndex; i++) {
        try {
          await createJackpot(jackpotsHistoryDB[i])
        } catch {
          continue
        }
      }
    }
    lastJackpot = jackpotsHistory[0]
  }

  if (controls.practice && temp % 5 === 0) jackpots.newJackpot = jackpotsHistory[0]
  temp ++

  return NextResponse.json({
    ...jackpots,
    customHistory: history,
    controls: controls || {},
  })
}

export async function POST(req) {
  const { method, newControls, jackpot } = await req.json()
  if (method === 'get') {
    const controls = await findMongo(Control)
    return NextResponse.json(controls)
  } else if (method === 'post') {
    const isUpdated = await updateMongo(Control, {}, newControls)
    return NextResponse.json(isUpdated)
  } else if (method === 'put') {
    const isSaved = await createJackpot(jackpot, false)
    return NextResponse.json({ success: isSaved })
  }

  return NextResponse.json({})
}

export async function PUT(req) {
  const { username, password } = await req.json()
  const account = await findMongo(Account, { username, password: md5(password) })

  return NextResponse.json(!!account)
}
