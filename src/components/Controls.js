import React from 'react'
import axios from 'axios'
import { FormControlLabel, FormGroup, Input, Switch } from '@mui/material'
import { toast } from 'react-toastify'
import { WrapperStyled } from './Controls.style'

export default function Controls() {
  const [controls, setControls] = React.useState({})

  const fetchControls = async () => {
    const toastId = toast.loading('Kontaktování serveru a přepisování databáze ...')
    await axios({
      method: 'POST',
      url: '/api',
      data: {
        type: 'controls',
        method: 'get',
      }
    })
    .then(({ data }) => {
      toast.update(toastId, { render: 'Nastavení úspěšně nahráno!', type: 'success', isLoading: false })
      setControls(data)
      window.localStorage.setItem('controls', JSON.stringify({
        loggedIn: true,
        time: new Date(),
      }))
    })
    .catch(() => {
      toast.update(toastId, { render: 'Chyba se spojením se serverem!', type: 'error', isLoading: false })
    })
  }

  const changeControls = async (newControls) => {
    await axios({
      method: 'POST',
      url: '/api',
      data: {
        method: 'post',
        newControls,
      }
    }).then((data) => {
      if (data) {
        setControls(newControls)
        window.localStorage.setItem('controls', JSON.stringify({
          loggedIn: true,
          time: new Date(),
        }))
      } else {
        console.error('Chyba při změny ovládání!')
      }
    })
    .catch(() => {
      console.error('Chyba se spojením se serverem!')
    })
  }

  React.useEffect(() => {
    fetchControls()
  }, [])

  return (
    <WrapperStyled>
      <h2>Ovládací panel</h2>
      <FormGroup>
        {Object.keys(controls).length > 0 && (
          <>
            <FormControlLabel control={<Input value={controls['refreshData']} onChange={({ target }) => changeControls({ ...controls, 'refreshData': parseInt(target.value)})} />} label='Každých x vteřin obnovení dat' />
            <FormControlLabel control={<Input value={controls['lastJackpotsShow']} onChange={({ target }) => changeControls({ ...controls, 'lastJackpotsShow': parseInt(target.value)})} />} label='Každých x vteřin zobrazit poslední jackpoty' />
            <FormControlLabel control={<Input value={controls['lastJackpotsHold']} onChange={({ target }) => changeControls({ ...controls, 'lastJackpotsHold': parseInt(target.value)})} />} label='Poslední jackpoty se zobrazují x vteřin' />
            {Object.keys(controls).map(type => {
              if (type !== 'gold' && type !== 'silver' && type !== 'bronze' && type !== 'red' && type !== 'green') return <React.Fragment key={type} />

              return (
                <div key={type}>
                  <h3>{type}</h3>
                  <div>
                    <FormControlLabel control={<Switch color='primary' checked={controls[type].enable} onChange={({ target }) => {
                      const newControls = { ...controls, [type]: { ...controls[type], 'enable': target.checked } }
                      changeControls(newControls)
                    }} />} label={controls[type].enable ? 'Zapnuto' : 'Vypnuto'} />
                    <FormControlLabel control={<Input value={controls[type].min} onChange={({ target }) => {
                      if (parseFloat(target.value) > 0) {
                        const newControls = { ...controls, [type]: { ...controls[type], 'min': parseFloat(target.value) } }
                        changeControls(newControls)
                      }
                    }} />} label='Minimální částka' />
                  </div>
                </div>
              )
            })}
          </>
        )}
      </FormGroup>
    </WrapperStyled>
  )
}
