import React from 'react'
import axios from 'axios'
import { FormControlLabel, FormGroup, Input, Switch } from '@mui/material'
import { WrapperStyled } from './Controls.style'

export default function Controls() {
  const [controls, setControls] = React.useState({})

  const fetchControls = async () => {
    await axios({
      method: 'POST',
      url: '/api',
      data: {
        type: 'controls',
        method: 'get',
      }
    }).then(({ data }) => {
      setControls(data)
      window.localStorage.setItem('controls', JSON.stringify({
        loggedIn: true,
        time: new Date(),
      }))
    })
    .catch(() => {
      console.error('Chyba se spojením se serverem!')
    })
  }

  const changeControls = async (type, field, value) => {
    const newControls = { ...controls, [type]: { ...controls[type], [field]: value } }
    await axios({
      method: 'POST',
      url: '/api',
      data: {
        type: 'controls',
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
        {Object.keys(controls).map(type => {
          if (type === '_id') return <React.Fragment key={type} />

          return (
            <div key={type}>
              <h3>{type}</h3>
              <div>
                <FormControlLabel control={<Switch color='primary' checked={controls[type].enable} onChange={({ target }) => changeControls(type, 'enable', target.checked)} />} label={controls[type].enable ? 'Zapnuto' : 'Vypnuto'} />
                <FormControlLabel control={<Input value={controls[type].min} onChange={({ target }) => parseFloat(target.value) > 0 && changeControls(type, 'min', parseFloat(target.value))} />} label='Minimální částka' />
              </div>
            </div>
          )
        })}
      </FormGroup>
    </WrapperStyled>
  )
}
