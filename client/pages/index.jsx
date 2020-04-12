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
import Search from '../actions/search.actions'

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

const HomePage = () => {
  const classes = useStyles()
  const [state, setState] = useState({
    country: 'Egypt',
    city: 'Cairo',
    y: 2020,
    m: 4,
    d: 9
  })

  const submitSearch = async () => {
    try {
      const results = await Search(state)
      console.log(results)
    } catch (e) {
      console.log(e)
    }
  }

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
            <Select value={10}>
              <MenuItem value={10}>Egypt</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <MuiPickersUtilsProvider utils={DateFnsUtils} >
            <KeyboardDatePicker
              style={{ backgroundColor: "#FFF", width: '40%', padding: 3 }}
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              id="date-picker-inline"
              label="Date"
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>

          <FormControl variant="filled" style={{ backgroundColor: "#FFF", width: '40%' }}>
            <InputLabel>City</InputLabel>
            <Select value={10}>
              <MenuItem value={10}>Cairo</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <Button style={{ backgroundColor: "red", width: '40%', color: "#FFF" }} onClick={submitSearch}>Search</Button>
        </div>
      </div>
      <div className={classes.topBar}></div>
    </div>
  )
}

export default HomePage