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
import axios from 'axios'

export default function App() {
  const [data, setData] = React.useState({})
  const footerRef = React.useRef(null)

  const fetchData = async () => {
    await axios({
      method: 'POST',
      url: '/api',
      data: {
        query: window.location.search
      }
    }).then(({ data }) => setData(data))
  }

  React.useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (Object.keys(data).length === 0) return <></>

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
