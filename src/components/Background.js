import React from 'react'
import { BackgroundStyled } from './Background.style'

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

export default function Background() {
  const backgroundRef = React.useRef(null)

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
        styles += `width: ${(width / columnNumbers) - 30 > 10 ? (width / columnNumbers) - 30 : 10}px;`
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
    if (!backgroundRef || !backgroundRef.current) return
    createSymbolsInBackground()
    window.addEventListener('resize', createSymbolsInBackground)
    return () => window.removeEventListener('resize', createSymbolsInBackground)
  }, [backgroundRef])

  return <BackgroundStyled ref={backgroundRef} />
}
