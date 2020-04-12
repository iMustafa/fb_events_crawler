import axios from 'axios'
import config from 'next/config'
const { API_URL } = config().publicRuntimeConfig

const search = ({ country, city, y, m, d }) => new Promise(async (resolve, reject) => {
  try {
    const results = await axios.get(`${API_URL}`, { params: { country, city, y, m, d } })
    resolve(results.data)
  } catch (err) {
    console.log(err)
    reject(err)
  }
})

export default search