import { NextResponse } from 'next/server'
import axios from 'axios'
import Jackpot from '@/app/models/Jackpot';
import Account from '@/app/models/Account';
import Control from '@/app/models/Control';
import { dbConnect, findAllMongo, findMongo, updateMongo } from '@/utils/dbMongo'
import md5 from 'md5'

dbConnect()

const createJackpot = async (data) => {
  return await Jackpot(data).save();
};

let lastJackpot = null

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

export async function POST(req) {
  const { query, type, method, newControls } = await req.json()
  if (type === 'controls') {
    if (method === 'get') {
      const controls = await findMongo(Control)
      return NextResponse.json(controls)
    } else if (method === 'post') {
      const isUpdated = await updateMongo(Control, {}, newControls)
      return NextResponse.json(isUpdated)
    }

    return NextResponse.json({})
  } else {
    const casinoUrl = 'https://casinovictory.leris.cz/modules/playgames_jackpot/script/jackpotservice.php' + query

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
      gold: 2,
      silver: 4,
      bronze: 5,
    }
    const history = {}
    for (const type in historySettings) {
      const numberToFind = historySettings[type]
      const typeJackpotsDB = jackpotsHistoryDB.reverse().filter((jackpotHistoryDB) => jackpotHistoryDB['sql_jp_name'].toLowerCase() === type)
      for (let i = 0; i < numberToFind; i++) {
        if (!typeJackpotsDB[i]) continue
        if (!history[type]) {
          history[type] = [typeJackpotsDB[i]]
        } else {
          history[type].push(typeJackpotsDB[i])
        }
      }
      if (history[type]) history[type].sort((a, b) => new Date(b.sql_inserted) - new Date(a.sql_inserted))
    }
    jackpots.customHistory = history
    jackpotsHistoryDB.sort((a, b) => new Date(b.sql_inserted) - new Date(a.sql_inserted))

    if (lastJackpot !== null) {
      const indexOfLastJackpot = getIndexOfJackpot(jackpotsHistory, lastJackpot)
      if (indexOfLastJackpot > 0) {
        for (let i = jackpotsHistory.length - 1; i >= 0; i--) {
          try {
            await createJackpot({
              jackpot: JSON.stringify(jackpotsHistory[i])
            })
          } catch {
            continue
          }
        }
        jackpots.newJackpot = jackpotsHistory[0]
      } else if (indexOfLastJackpot === -1) {
        for (let i = jackpotsHistory.length - 1; i >= 0; i--) {
          try {
            await createJackpot({
              jackpot: JSON.stringify(jackpotsHistory[i])
            })
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
            await createJackpot({
              jackpot: JSON.stringify(jackpotsHistory[i])
            })
          } catch {
            continue
          }
        }
      } else {
        for (let i = 0; i < databaseIndex; i++) {
          try {
            await createJackpot({
              jackpot: JSON.stringify(jackpotsHistoryDB[i])
            })
          } catch {
            continue
          }
        }
      }
      lastJackpot = jackpotsHistory[0]
    }

    return NextResponse.json({ ...jackpots, controls })
  }
}

export async function PUT(req) {
  const { username, password } = await req.json()
  const account = await findMongo(Account, { username, password: md5(password) })

  return NextResponse.json(!!account)
}
