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
  FooterBackgroundStyled,
} from './App.style'
import Jackpot from './Jackpot'
import SpecialJackpot from './SpecialJackpot'
import WinShowcase from './WinShowcase'
import JackpotAnimation from './JackpotAnimation'

const createSpade = (styles) => {
  const spadeElement = document.createElement('img')
  spadeElement.src = 'images/spade.png'
  spadeElement.classList.add('symbol', 'spade')
  spadeElement.style = styles
  return spadeElement
}
const createDiamond = (styles) => {
  const diamondElement = document.createElement('img')
  diamondElement.src = 'images/diamond.png'
  diamondElement.classList.add('symbol', 'diamond')
  diamondElement.style = styles
  return diamondElement
}
const createHeart = (styles) => {
  const heartElement = document.createElement('img')
  heartElement.src = 'images/heart.png'
  heartElement.classList.add('symbol', 'heart')
  heartElement.style = styles
  return heartElement
}
const createClub = (styles) => {
  const clubElement = document.createElement('img')
  clubElement.src = 'images/club.png'
  clubElement.classList.add('symbol', 'club')
  clubElement.style = styles
  return clubElement
}

export default function App() {
  const [data, setData] = React.useState({})
  const [prevData, setPrevData] = React.useState({})
  const footerRef = React.useRef(null)
  const backgroundRef = React.useRef(null)

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

  const createSymbolsInBackground = () => {
    backgroundRef.current.innerHTML = ''
    const size = backgroundRef.current.getBoundingClientRect()
    const rowNumbers = 20
    const columnNumbers = 30
    const width = size.width
    const height = (size.height + size.top)
    for (let i = 0; i < columnNumbers; i++) {
      for (let o = 0; o < rowNumbers; o++) {
        let element
        const random = Math.random()
        const isOutsideOfCircle = i + o < 14 || i - o > 15 || i + o > 33 || i - o < -4
        let styles = `left: ${(width / columnNumbers) * i + 15}px; top: ${(height / rowNumbers) * o + 15}px;`
        styles += `width: ${(width / columnNumbers) - 30}px;`
        if (random > 0.75) element = createSpade(styles)
        else if (random > 0.5) element = createDiamond(styles)
        else if (random > 0.25) element = createClub(styles)
        else element = createHeart(styles)

        if (isOutsideOfCircle) {
          element.style.animationDelay = `${Math.random() * 150}s`
          element.classList.add('glow')
        } else {
          element.classList.add('center')
        }
        backgroundRef.current.appendChild(element)
      }
    }
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      fetchData()
    }, 15000)
    fetchData()

    return () => clearTimeout(interval)
  }, [])

  React.useEffect(() => {
    if (!backgroundRef || !backgroundRef.current) return
    createSymbolsInBackground()
    window.addEventListener('resize', createSymbolsInBackground)
    return () => window.removeEventListener('resize', createSymbolsInBackground)
  }, [backgroundRef])

  return (
    <WrapperStyled>
      {/* <JackpotAnimation /> */}
      <BackgroundStyled ref={backgroundRef} />
      {Object.keys(data).length > 0 && (
      <>
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
      </>
      )}
    </WrapperStyled>
  )
}
