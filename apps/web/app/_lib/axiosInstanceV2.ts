import axios from 'axios'

const axiosInstanceV2 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_V2,
  withCredentials: true,
})

export default axiosInstanceV2
