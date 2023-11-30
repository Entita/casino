import { NextResponse } from 'next/server'
import axios from 'axios'
import Jackpot from '@/app/models/Jackpot';
import dbConnect from '@/utils/dbConnect'

dbConnect()

const createJackpot = async (data) => {
  return await Jackpot(data).save();
};

export async function POST(req) {
  const { query } = await req.json()
  const casinoUrl = 'https://casinovictory.leris.cz/modules/playgames_jackpot/script/jackpotservice.php' + query

  const data = await axios({
    method: 'GET',
    url: casinoUrl,
  })

  if (data?.data.jackpot.length > 0) {
    await createJackpot({
      jackpot: JSON.stringify(data?.data.jackpot)
    });
  }

  return NextResponse.json(data?.data)
}
