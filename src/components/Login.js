import React from 'react'
import axios from 'axios'
import Controls from './Controls'
import { toast } from 'react-toastify'
import { WrapperStyled } from './Login.style'
import Background from './Background'

export default function Login() {
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [error, setError] = React.useState('')
  const usernameRef = React.useRef(null)
  const passwordRef = React.useRef(null)
  const loginExpiration = 600
  let expirationTimeout

  const addExpiration = () => {
    expirationTimeout = setTimeout(() => {
      window.localStorage.removeItem('controls')
      setLoggedIn(false)
      setError('Přihlášení vypršelo!')
    }, loginExpiration * 1000)
  }

  const removeExpiration = () => {
    clearTimeout(expirationTimeout)
  }

  const fetchAccount = async () => {
    if (!usernameRef || !usernameRef.current || !passwordRef || !passwordRef.current) return
    const toastId = toast.loading('Ověřování údajů...')

    setError('')
    await axios({
      method: 'PUT',
      url: '/api',
      data: {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      }
    }).then(({ data }) => {
      if (data) {
        toast.update(toastId, { render: 'Úspěšně přihlášen!', type: 'success', isLoading: false, autoClose: 3000 })
        setLoggedIn(true)
      }
      else toast.update(toastId, { render: 'Chybně zadané údaje!', type: 'error', isLoading: false, autoClose: 3000 })
    })
    .catch(() => {
      toast.update(toastId, { render: 'Chyba se spojením se serverem!', type: 'error', isLoading: false, autoClose: 3000 })
    })
  }

  const handleEnterKey = (event) => {
    if (event.key === 'Enter') fetchAccount()
  }

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage.getItem('controls')) {
      const controls = JSON.parse(window.localStorage.getItem('controls'))
      const secondsFromLastLogin = new Date() - new Date(controls.time)
      if (secondsFromLastLogin < loginExpiration * 1000) {
        setLoggedIn(true)
      } else {
        setError('Přihlášení vypršelo!')
        window.localStorage.removeItem('controls')
      }
    }

    window.addEventListener('keydown', handleEnterKey)
    return () => window.removeEventListener('keydown', handleEnterKey)
  }, [])

  React.useEffect(() => {
    if (loggedIn) {
      addExpiration()
    } else {
      removeExpiration()
    }

    return () => removeExpiration()
  }, [loggedIn])

  return (
    <WrapperStyled>
      <Background />
      {loggedIn ? <Controls /> : (
        <>
          <h2>Přihlášení</h2>
          <input ref={usernameRef} placeholder='přezdívka' />
          <input ref={passwordRef} type='password' placeholder='heslo' />
          {error.length > 0 && <span>{error}</span>}
          <button onClick={() => fetchAccount()}>Přihlásit se</button>
        </>
      )}
    </WrapperStyled>
  )
}
