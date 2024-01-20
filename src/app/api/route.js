import { NextResponse } from 'next/server'
import axios from 'axios'
import Jackpot from '@/app/models/Jackpot';
import dbConnect from '@/utils/dbConnect'

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
  )) || 0
}

export async function POST(req) {
  const { query } = await req.json()
  const casinoUrl = 'https://casinovictory.leris.cz/modules/playgames_jackpot/script/jackpotservice.php' + query

  const data = await axios({
    method: 'GET',
    url: casinoUrl,
  })

  var jackpots = data?.data
  const jackpotsHistory = jackpots?.history
  if (lastJackpot !== null && jackpotsHistory) {
    const indexOfLastJackpot = getIndexOfJackpot(jackpotsHistory, lastJackpot)
    if (indexOfLastJackpot > 0) {
      for (let i = 0; i < indexOfLastJackpot; i++) {
        await createJackpot({
          jackpot: JSON.stringify(data.data.history[i])
        });
      }
      jackpots.jackpot = jackpotsHistory[0]
      lastJackpot = jackpotsHistory[0]
    }
  } else {
    if (jackpotsHistory) lastJackpot = jackpotsHistory[0]
  }

  return NextResponse.json(jackpots)
}
