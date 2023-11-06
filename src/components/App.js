import React from 'react'
import {
  FooterWrapperStyled,
  JackpotsWrapperStyled,
  NormalJackpotsWrapperStyled,
  WrapperStyled,
  SpecialJackpotsWrapperStyled,
  BackgroundStyled,
  ShowcaseContainerWrapperStyled,
  FooterBackgroundStyled
} from './App.style'
import Jackpot from './Jackpot'
import SpecialJackpot from './SpecialJackpot'
import WinShowcase from './WinShowcase'

const testData = {
  current: {
    gold: {
      inserted: '',
      jackpot: '155876.6636',
      running: '1',
      is_tsunami: '0',
      is_happyHour: null
    },
    silver: {
      inserted: '',
      jackpot: '9936.0841',
      running: '1',
      is_tsunami: '0',
      is_happyHour: null
    },
    bronze: {
      inserted: '',
      jackpot: '1507.0932',
      running: '1',
      is_tsunami: '0',
      is_happyHour: null
    },
    platinum: false,
    red: {
      inserted: '',
      jackpot: '816.7000',
      running: '0',
      is_tsunami: '0',
      is_happyHour: null
    },
    green: {
      inserted: '',
      jackpot: '4031.2000',
      running: '0',
      is_tsunami: '0',
      is_happyHour: null
    },
    blue: false
  },
  history: [
    {
      sql_inserted: '5.11.2023',
      sql_machine: 'E-gaming 45',
      sql_bar: 'CASINO VICTORY Plan\u00e1',
      sql_city: 'Plan\u00e1',
      sql_jp_name: 'Bronze',
      jackpot: '1656.00'
    },
    {
      sql_inserted: '5.11.2023',
      sql_machine: 'E-gaming 47',
      sql_bar: 'CASINO VICTORY Plan\u00e1',
      sql_city: 'Plan\u00e1',
      sql_jp_name: 'Bronze',
      jackpot: '1919.00'
    },
    {
      sql_inserted: '4.11.2023',
      sql_machine: 'E-gaming 45',
      sql_bar: 'CASINO VICTORY Plan\u00e1',
      sql_city: 'Plan\u00e1',
      sql_jp_name: 'Bronze',
      jackpot: '1622.00'
    },
    {
      sql_inserted: '4.11.2023',
      sql_machine: 'Apollo 31',
      sql_bar: 'CASINO VICTORY Plan\u00e1',
      sql_city: 'Plan\u00e1',
      sql_jp_name: 'Bronze',
      jackpot: '1914.00'
    },
    {
      sql_inserted: '3.11.2023',
      sql_machine: 'Apollo nov\u00e9 1',
      sql_bar: 'CASINO VICTORY Plan\u00e1',
      sql_city: 'Plan\u00e1',
      sql_jp_name: 'Bronze',
      jackpot: '1617.00'
    },
    {
      sql_inserted: '3.11.2023',
      sql_machine: 'E-gaming 23',
      sql_bar: 'CASINO VICTORY Plan\u00e1',
      sql_city: 'Plan\u00e1',
      sql_jp_name: 'Bronze',
      jackpot: '1825.00'
    },
    {
      sql_inserted: '2.11.2023',
      sql_machine: 'MODplay 58',
      sql_bar: 'CASINO VICTORY Plan\u00e1',
      sql_city: 'Plan\u00e1',
      sql_jp_name: 'Bronze',
      jackpot: '1488.00'
    },
    {
      sql_inserted: '2.11.2023',
      sql_machine: 'E-gaming 19',
      sql_bar: 'CASINO VICTORY Plan\u00e1',
      sql_city: 'Plan\u00e1',
      sql_jp_name: 'Bronze',
      jackpot: '852.00'
    },
    {
      sql_inserted: '2.11.2023',
      sql_machine: 'E-gaming 64',
      sql_bar: 'CASINO VICTORY Plan\u00e1',
      sql_city: 'Plan\u00e1',
      sql_jp_name: 'Bronze',
      jackpot: '1386.00'
    },
    {
      sql_inserted: '2.11.2023',
      sql_machine: 'Apollo nov\u00e9 1',
      sql_bar: 'CASINO VICTORY Plan\u00e1',
      sql_city: 'Plan\u00e1',
      sql_jp_name: 'Silver',
      jackpot: '14395.00'
    },
    {
      sql_inserted: '2.11.2023',
      sql_machine: 'E-gaming 17',
      sql_bar: 'CASINO VICTORY Plan\u00e1',
      sql_city: 'Plan\u00e1',
      sql_jp_name: 'Bronze',
      jackpot: '1450.00'
    },
    {
      sql_inserted: '1.11.2023',
      sql_machine: 'E-gaming 28',
      sql_bar: 'CASINO VICTORY Plan\u00e1',
      sql_city: 'Plan\u00e1',
      sql_jp_name: 'Bronze',
      jackpot: '1426.00'
    },
    {
      sql_inserted: '1.11.2023',
      sql_machine: 'E-gaming 26',
      sql_bar: 'CASINO VICTORY Plan\u00e1',
      sql_city: 'Plan\u00e1',
      sql_jp_name: 'Bronze',
      jackpot: '1618.00'
    },
    {
      sql_inserted: '1.11.2023',
      sql_machine: 'MODplay 28',
      sql_bar: 'HERNA GALAXY Most',
      sql_city: 'Most',
      sql_jp_name: 'Bronze',
      jackpot: '1842.00'
    },
    {
      sql_inserted: '1.11.2023',
      sql_machine: 'E-gaming 74',
      sql_bar: 'CASINO VICTORY Plan\u00e1',
      sql_city: 'Plan\u00e1',
      sql_jp_name: 'Bronze',
      jackpot: '1517.00'
    }
  ],
  jackpot: [],
  jackpot_tsunami: []
}

export default function App() {
  const [data, setData] = React.useState(testData)
  const footerRef = React.useRef(null)
  const queryParams = window.location.search

  const fetchData = async () => {
    fetch(
      'https://casinovictory.leris.cz/modules/playgames_jackpot/script/jackpotservice.php' +
        queryParams
    )
      .then((res) => res.text())
      .then((text) => setData(text))
      .catch((err) => console.log(err))
  }

  React.useEffect(() => {
    // fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(data)

  return (
    <WrapperStyled>
      <BackgroundStyled />
      <JackpotsWrapperStyled>
        <NormalJackpotsWrapperStyled>
          <Jackpot type='gold' amount={data.current.gold.jackpot} minBet='xx' />
          <Jackpot type='silver' amount={data.current.silver.jackpot} minBet='xx' />
          <Jackpot type='bronze' amount={data.current.bronze.jackpot} minBet='xx' />
        </NormalJackpotsWrapperStyled>
        <SpecialJackpotsWrapperStyled>
          <SpecialJackpot type='red' amount={data.current.red.jackpot} minBet='xx' />
          <SpecialJackpot type='green' amount={data.current.green.jackpot} minBet='xx' />
        </SpecialJackpotsWrapperStyled>
      </JackpotsWrapperStyled>
      <FooterWrapperStyled>
        <FooterBackgroundStyled />
        <ShowcaseContainerWrapperStyled ref={footerRef} $time={data.history.length || 0}>
          {data.history.map((history, index) =>
            <WinShowcase key={index} type={history.sql_jp_name.toLowerCase()} amount={history.jackpot} place={history.sql_city} />
          )}
          {data.history.map((history, index) =>
            <WinShowcase key={index} duplicate={true} type={history.sql_jp_name.toLowerCase()} amount={history.jackpot} place={history.sql_city} />
          )}
        </ShowcaseContainerWrapperStyled>
      </FooterWrapperStyled>
    </WrapperStyled>
  )
}
