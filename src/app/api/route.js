import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req) {
  const { query } = await req.json()
  const casinoUrl = 'https://casinovictory.leris.cz/modules/playgames_jackpot/script/jackpotservice.php' + query

  const test = await axios({
    method: 'GET',
    url: casinoUrl,
  })

  return NextResponse.json(test?.data)
}