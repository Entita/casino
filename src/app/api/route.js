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

  const jackpots = data?.data?.history
  if (lastJackpot !== null) {
    const indexOfLastJackpot = getIndexOfJackpot(jackpots, lastJackpot)
    console.log(jackpots, lastJackpot, indexOfLastJackpot)
    if (indexOfLastJackpot > 0) {
      for (let i = 0; i < indexOfLastJackpot; i++) {
        console.log('added jackpot', data.data.history, data.data.history[i])
        await createJackpot({
          jackpot: JSON.stringify(data.data.history[i])
        });
      }
      lastJackpot = jackpots[0]
    }
  } else {
    lastJackpot = jackpots[0]
  }

  return NextResponse.json(data?.data)
}
