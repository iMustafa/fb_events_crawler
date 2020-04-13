import { makeStyles } from '@material-ui/core'
import Search from '../actions/search.actions'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import moment from 'moment'

const useStyles = makeStyles({
  topBar: {
    height: 20,
    backgroundColor: '#333F3D'
  },
  body: {
    padding: 30
  },
  title: {
    color: "#c4323a",
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 28
  },
  header: {
    display: 'flex'
  },
  icons: {
    flex: 1
  },
  buttonHolder: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    justifyItems: 'center'
  },
  button: {
    backgroundColor: '#4E7F2D',
    color: '#FFF'
  },
  icon: {
    width: 53,
    height: 54,
    backgroundRepeat: 'no-repeat'
  },
  events: {
    marginTop: 20,
  },
  eventCardGreen: {
    backgroundColor: '#ecf1ea',
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderBottom: '2px solid #E0E0E0'
  },
  eventCardWhite: {
    backgroundColor: '#FFF',
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderBottom: '2px solid #E0E0E0'
  },
  calendar: {
    position: 'relative',
    zIndex: 2
  },
  calendarTitle: {
    backgroundColor: "#7ca35d",
    color: "#FFF",
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  calendarBody: {
    backgroundColor: '#e0e8d1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    justifyItems: 'center'
  },
  secondCalendar: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 5,
    left: 5
  }
})
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const days = ["Sun", "Mon", "Tus", "Wed", "Thu", "Fri", "Sat"]

const ResultsPage = (data) => {
  const classes = useStyles()
  const { events, query } = data
  const { d, m, y } = query
  const date = moment(`${m}/${d}/${y}`, "MM-DD-YYYY")

  const renderCalendar = (date_time) => {
    const isMultipleDays = date_time.indexOf('–') >= 0
    const firstDay = isMultipleDays ? date_time.substr(0, date_time.indexOf(' ')) : query.d
    const firstMonth = isMultipleDays ? date_time.substr(date_time.indexOf(' '), date_time.indexOf('–') - 1) : months[date.month()]
    const dayStr = moment(`${date.month()}/${firstDay}/${y}`, `MM-DD-YYYY`).format('ddd')

    if (isMultipleDays)
      return (
        <div style={{ position: 'relative' }}>
          <Card className={classes.calendar}>
            <div className={classes.calendarTitle}>
              <h3 style={{ margin: 0 }}>{firstMonth}</h3>
            </div>
            <div className={classes.calendarBody}>
              <h4>{firstDay}</h4>
              <Typography>{dayStr}</Typography>
            </div>
          </Card>
          <Card className={classes.secondCalendar}>
            <div className={classes.calendarTitle}>
              <h3 style={{ margin: 0 }}>{firstMonth}</h3>
            </div>
            <div className={classes.calendarBody}>
              <h4>03</h4>
              <Typography>Thu</Typography>
            </div>
          </Card>
        </div>
      )

    return (
      <Card className={classes.calendar}>
        <div className={classes.calendarTitle}>
          <h3 style={{ margin: 0 }}>{firstMonth}</h3>
        </div>
        <div className={classes.calendarBody}>
          <h4>{firstDay}</h4>
          <Typography>{dayStr}</Typography>
        </div>
      </Card>
    )
  }

  const EventItem = (event, index) => {
    const { date_time, id, image, info, name } = event
    return (
      <Grid container spacing={2} key={id} className={index % 2 == 0 ? classes.eventCardGreen : classes.eventCardWhite}>
        <Grid item xs={2}>
          {renderCalendar(date_time)}
        </Grid>
        <Grid item xs={2}>
          <Typography style={{ textAlign: 'center' }}>{date_time}</Typography>
        </Grid>
        <Grid item xs={6}>
          <h6>{name}</h6>
          <Typography>{info}</Typography>
        </Grid>
        <Grid item xs={2}>
          <img src={image} style={{ width: '100%' }} alt="" />
        </Grid>
      </Grid>
    )
  }

  return (
    <div className='container'>
      <div className={classes.topBar}></div>
      <div>
        <img src={require('public/images/header.png')} alt="Header" style={{ width: '100%' }} />
      </div>
      <div className={classes.body}>
        <h3 className={classes.title}>Whats Up Today in: {query.city}</h3>
        <div className={classes.header}>
          <div className={classes.icons}>
            <img className={classes.icon} src={require('../public/images/Info-Icon.png')} />
            <img className={classes.icon} src={require('../public/images/24h_inactive.jpg')} />
            <img className={classes.icon} src={require('../public/images/12h.jpg')} />
          </div>
          <div className={classes.buttonHolder}>
            <Button className={classes.button}>New Search</Button>
          </div>
        </div>

        <div className={classes.events}>
          {events.map((event, i) => EventItem(event, i))}
        </div>
      </div>
    </div>
  )
}

ResultsPage.getInitialProps = async ({ query }) => {
  const { country, city, y, m, d } = query
  const results = await Search({ country, city, y, m, d })
  return {
    events: results,
    query: { country, city, y, m, d }
  }
}

export default ResultsPage