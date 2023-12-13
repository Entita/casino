import React from 'react'
import axios from 'axios'
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
import JackpotAnimation from './JackpotAnimation'

export default function App() {
  const [data, setData] = React.useState({})
  const [prevData, setPrevData] = React.useState({})
  const footerRef = React.useRef(null)

  const fetchData = async () => {
    await axios({
      method: 'POST',
      url: '/api',
      data: {
        query: window.location.search
      }
    }).then(({ data }) =>
      setData((oldData) => {
        setPrevData(oldData)
        return data
      })
    )
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      fetchData()
    }, 15000)
    fetchData()

    return () => clearTimeout(interval)
  }, [])

  if (Object.keys(data).length === 0) return <></>

  return (
    <WrapperStyled>
      {/* <JackpotAnimation /> */}
      <BackgroundStyled />
      <JackpotsWrapperStyled>
        <NormalJackpotsWrapperStyled>
          <Jackpot
            type='gold'
            amount={data.current.gold.jackpot}
            prevAmount={prevData?.current?.gold?.jackpot || 0}
            minBet='xx'
          />
          <Jackpot
            type='silver'
            amount={data.current.silver.jackpot}
            prevAmount={prevData?.current?.silver?.jackpot || 0}
            minBet='xx'
          />
          <Jackpot
            type='bronze'
            amount={data.current.bronze.jackpot}
            prevAmount={prevData?.current?.bronze?.jackpot || 0}
            minBet='xx'
          />
        </NormalJackpotsWrapperStyled>
        <SpecialJackpotsWrapperStyled>
          <SpecialJackpot
            type='red'
            amount={data.current.red.jackpot}
            prevAmount={prevData?.current?.red?.jackpot || 0}
            minBet='xx'
          />
          <SpecialJackpot
            type='green'
            amount={data.current.green.jackpot}
            prevAmount={prevData?.current?.green?.jackpot || 0}
            minBet='xx'
          />
        </SpecialJackpotsWrapperStyled>
      </JackpotsWrapperStyled>
      <FooterWrapperStyled>
        <FooterBackgroundStyled />
        <ShowcaseContainerWrapperStyled
          ref={footerRef}
          $time={data.history.length || 0}
        >
          {data.history.map((history, index) => (
            <WinShowcase
              key={index}
              type={history.sql_jp_name.toLowerCase()}
              amount={history.jackpot}
              place={history.sql_city}
            />
          ))}
          {data.history.map((history, index) => (
            <WinShowcase
              key={index}
              duplicate={true}
              type={history.sql_jp_name.toLowerCase()}
              amount={history.jackpot}
              place={history.sql_city}
            />
          ))}
        </ShowcaseContainerWrapperStyled>
      </FooterWrapperStyled>
    </WrapperStyled>
  )
}
