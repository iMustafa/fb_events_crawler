import { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import DateFnsUtils from '@date-io/moment'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import router from 'next/router'
import moment from 'moment'

const useStyles = makeStyles({
  topBar: {
    height: 20,
    backgroundColor: '#333F3D'
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20
  },
  body: {
    backgroundImage: `url(${require('../public/images/bg.jpg')})`,
    height: 450,
    display: 'flex',
    flexDirection: 'column',
    padding: 40,
    marginTop: 30,
    marginBottom: 15
  },
  form: {
    display: 'flex',
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
  }
})

const cities = {
  'United Kingdom': ['London'],
  'Bolivia': ['La Paz'],
  'China': ['Shanghai'],
  'Argentina': ['San Juan'],
  'Thailand': ['Chiang Mai', 'Bangkok', 'Phuket'],
  'Maharashtra': ['Mumbai'],
  'Poland': ['Gdansk'],
  'Chad': ["N'Djamena"],
  'Indonesia': ['Surabaya'],
  'Turkey': ['Istanbul'],
  'Vietnam': ['Da Nang'],
  'Yemen': ['Sanaa'],
  'Egypt': ['Cairo', 'Tanta']
}
const countries = Object.keys(cities)

const HomePage = () => {
  const classes = useStyles()
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [state, setState] = useState({
    country: 'Egypt',
    city: 'Cairo',
    y: moment().year(),
    m: moment().month() + 1,
    d: moment().date(),
    isLoading: false
  })

  const submitSearch = () => {
    const { country, city, y, m, d } = state
    if (country && city && y && m && d) {
      setState({ ...state, isLoading: true })
      router.push({
        pathname: '/results',
        query: { country, city, y, m, d }
      })
    }
  }

  const handleDateChange = (date) => {
    const d = date.day()
    const m = date.month()
    const y = date.year()
    setState({ ...state, d, m, y })
    setSelectedDate(date)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    if (name == 'country') {
      setState({
        ...state, [name]: value, city: null
      });
    } else {
      setState({
        ...state, [name]: value
      });
    }
  };

  return (
    <div className='container'>
      <div className={classes.topBar}></div>
      <div className={classes.logo}>
        <img src={require('public/images/logo.png')} alt="Logo" style={{ width: '20%' }} />
      </div>
      <div className={classes.body}>
        <h3 style={{ color: "#FFF", display: 'flex' }}>Events in your city.</h3>

        <div className={classes.form}>
          <FormControl variant="filled" style={{ backgroundColor: "#FFF", width: '40%' }}>
            <InputLabel>Country</InputLabel>
            <Select value={state.country} onChange={handleChange} name='country'>
              {countries.map(country => <MenuItem value={country} key={country}>{country}</MenuItem>)}
            </Select>
          </FormControl>

          <MuiPickersUtilsProvider utils={DateFnsUtils} >
            <KeyboardDatePicker
              style={{ backgroundColor: "#FFF", width: '40%', padding: 3 }}
              disableToolbar
              variant="inline"
              format="DD/MM/YYYY"
              onChange={handleDateChange}
              value={selectedDate}
              id="date-picker-inline"
              label="Date"
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>

          <FormControl variant="filled" style={{ backgroundColor: "#FFF", width: '40%' }}>
            <InputLabel>City</InputLabel>
            <Select value={state.city} onChange={handleChange} name='city'>
              {cities[state.country].map(city => <MenuItem value={city} key={city}>{city}</MenuItem>)}
            </Select>
          </FormControl>

          <Button disabled={state.isLoading} style={{ backgroundColor: "red", width: '40%', color: "#FFF" }} onClick={submitSearch}>Search</Button>
        </div>
      </div>
      {state.isLoading && <LinearProgress />}
      <div className={classes.topBar}></div>
    </div>
  )
}

export default HomePage