import React from 'react'
import axios from 'axios'
import { Button, FormControlLabel, FormGroup, Input, Switch } from '@mui/material'
import { toast } from 'react-toastify'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CustomHistoryWrapperStyled, NewJackpotButtonsWrapperStyled, NewJackpotErrorsWrapperStyled, NewJackpotWrapperStyled, WrapperStyled } from './Controls.style'

export default function Controls() {
  const [controls, setControls] = React.useState({})
  const [createJackpot, setCreateJackpot] = React.useState(false)
  const [selectedType, setSelectedType] = React.useState('')
  const [errors, setErrors] = React.useState([])
  const fullNameRef = React.useRef(null)
  const cityRef = React.useRef(null)
  const amountRef = React.useRef(null)
  const machineRef = React.useRef(null)
  const dateRef = React.useRef(null)

  const createJackpotFunc = async () => {
    const fullName = fullNameRef?.current?.childNodes[0]?.value
    const city = cityRef?.current?.childNodes[0]?.value
    const amount = amountRef?.current?.childNodes[0]?.value
    const machine = machineRef?.current?.childNodes[0]?.value
    const date = dateRef?.current?.childNodes[0]?.value
    if (!fullName || !city || !amount || !machine || !date || !selectedType) {
      const allErrors = []
      if (!fullName) allErrors.push('Zadej celé jméno podniku!')
      if (!city) allErrors.push('Zadej město!')
      if (!machine) allErrors.push('Zadej název mašiny!')
      if (!date) allErrors.push('Zadej datum!')
      if (!amount) allErrors.push('Zadej částku!')
      if (!selectedType) allErrors.push('Vyber typ jackpotu!')
      return setErrors(allErrors)
    }
    setErrors([])
    const toastId = toast.loading('Čekání na server...')
    const jackpot = {
      jackpot: parseFloat(amount).toFixed(2),
      sql_bar: fullName,
      sql_city: city,
      sql_jp_name: selectedType,
      sql_machine: machine,
      sql_inserted: new Date(date).toLocaleDateString("en-US").replaceAll('/', '.'),
    }
    await axios({
      method: 'post',
      url: '/api',
      data: {
        method: 'put',
        jackpot,
      }
    })
    .then(() => toast.update(toastId, { render: 'Jackpot úspěšně uložen!', type: 'success', isLoading: false, autoClose: 3000 }))
    .catch(() => toast.update(toastId, { render: 'Chyba se spojením se serverem!', type: 'error', isLoading: false, autoClose: 3000 }))
  }

  const fetchControls = async () => {
    const toastId = toast.loading('Čekání na server...')
    await axios({
      method: 'POST',
      url: '/api',
      data: {
        type: 'controls',
        method: 'get',
      }
    })
    .then(({ data }) => {
      toast.update(toastId, { render: 'Nastavení úspěšně získáno!', type: 'success', isLoading: false, autoClose: 3000 })
      setControls(data)
      window.localStorage.setItem('controls', JSON.stringify({
        loggedIn: true,
        time: new Date(),
      }))
    })
    .catch(() => {
      toast.update(toastId, { render: 'Chyba se spojením se serverem!', type: 'error', isLoading: false, autoClose: 3000 })
    })
  }

  const changeControls = async (newControls) => {
    const toastId = toast.loading('Kontaktování serveru a přepisování databáze...')
    await axios({
      method: 'POST',
      url: '/api',
      data: {
        method: 'post',
        newControls,
      }
    }).then((data) => {
      if (data) {
        toast.update(toastId, { render: 'Nastavení úspěšně nahráno!', type: 'success', isLoading: false, autoClose: 3000 })
        setControls(newControls)
        window.localStorage.setItem('controls', JSON.stringify({
          loggedIn: true,
          time: new Date(),
        }))
      } else {
        toast.update(toastId, { render: 'Chyba při ukládání nastavení!', type: 'error', isLoading: false })
      }
    })
    .catch(() => {
      toast.update(toastId, { render: 'Chyba se spojením se serverem!', type: 'error', isLoading: false })
    })
  }

  React.useEffect(() => {
    fetchControls()
  }, [])

  return (
    <WrapperStyled>
      <h2>Ovládací panel</h2>
      {createJackpot ? (
        <NewJackpotWrapperStyled>
          <ArrowBackIcon onClick={() => setCreateJackpot(false)} />
          <FormControlLabel label='Celé jméno podniku' labelPlacement='start' control={<Input ref={fullNameRef} type='text'/>} />
          <FormControlLabel label='Město' labelPlacement='start' control={<Input ref={cityRef} type='text' />} />
          <FormControlLabel label='Částka' labelPlacement='start' control={<Input ref={amountRef} type='number' />}/>
          <FormControlLabel label='Jméno mašiny' labelPlacement='start' control={<Input ref={machineRef} type='text'/>} />
          <FormControlLabel label='Kdy padnul jackpot' labelPlacement='start' control={<Input ref={dateRef} type='date'/>} />
          <NewJackpotButtonsWrapperStyled>
            <Button className={selectedType === 'Gold' ? 'selected' : ''} onClick={() => setSelectedType('Gold')} >Gold</Button>
            <Button className={selectedType === 'Silver' ? 'selected' : ''} onClick={() => setSelectedType('Silver')}>Silver</Button>
            <Button className={selectedType === 'Bronze' ? 'selected' : ''} onClick={() => setSelectedType('Bronze')}>Bronze</Button>
          </NewJackpotButtonsWrapperStyled>
          {errors.length > 0 && (
            <NewJackpotErrorsWrapperStyled>
              {errors.map((error, i) => (
                <span key={i}>{error}</span>
              ))}
            </NewJackpotErrorsWrapperStyled>
          )}
          <Button onClick={() => createJackpotFunc()}>Přidat</Button>
        </NewJackpotWrapperStyled>
      ) : (
        <FormGroup>
          {Object.keys(controls).length > 0 && (
            <>
              <h4>Zobrazit x posledních jackpotů</h4>
              <CustomHistoryWrapperStyled>
                <div>
                  <h3>Gold</h3>
                  <Input value={controls['lastJackpotsGold']} onChange={({ target }) => changeControls({ ...controls, 'lastJackpotsGold': parseInt(target.value)})} />
                </div>
                <div>
                  <h3>Silver</h3>
                  <Input value={controls['lastJackpotsSilver']} onChange={({ target }) => changeControls({ ...controls, 'lastJackpotsSilver': parseInt(target.value)})} />
                </div>
                <div>
                  <h3>Bronze</h3>
                  <Input value={controls['lastJackpotsBronze']} onChange={({ target }) => changeControls({ ...controls, 'lastJackpotsBronze': parseInt(target.value)})} />
                </div>
              </CustomHistoryWrapperStyled>
              <FormControlLabel control={<Input value={controls['refreshData']} onChange={({ target }) => changeControls({ ...controls, 'refreshData': parseInt(target.value)})} />} label='Každých x vteřin obnovení dat' />
              <FormControlLabel control={<Input value={controls['lastJackpotsShow']} onChange={({ target }) => changeControls({ ...controls, 'lastJackpotsShow': parseInt(target.value)})} />} label='Každých x vteřin zobrazit poslední jackpoty' />
              <FormControlLabel control={<Input value={controls['lastJackpotsHold']} onChange={({ target }) => changeControls({ ...controls, 'lastJackpotsHold': parseInt(target.value)})} />} label='Poslední jackpoty se zobrazují x vteřin' />
              <div>
                {Object.keys(controls).map(type => {
                  if (type !== 'gold' && type !== 'silver' && type !== 'bronze' && type !== 'red' && type !== 'green') return <React.Fragment key={type} />

                  return (
                    <div key={type}>
                      <h3>{type}</h3>
                      <div>
                        <FormControlLabel control={<Switch color='primary' checked={controls[type].enableMin} onChange={({ target }) => {
                          const newControls = { ...controls, [type]: { ...controls[type], 'enableMin': target.checked } }
                          changeControls(newControls)
                        }} />} label={controls[type].enableMin ? 'Zapnuto' : 'Vypnuto'} />
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
              </div>
            </>
          )}
          <Button onClick={() => setCreateJackpot(true)}>Přidat jackpot</Button>
        </FormGroup>
      )}
    </WrapperStyled>
  )
}
