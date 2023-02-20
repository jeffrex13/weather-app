import { useEffect, useRef, useState } from 'react'
import './App.css'
import { FcSearch } from 'react-icons/fc'
import axios from 'axios'
import { weatherIcons } from './helper/weatherIcons'

function App() {
  const apiKey = import.meta.env.VITE_API_KEY
  const inputRef = useRef(null)
  const [weatherData, setWeatherData] = useState(null)

  const fetchWeather = async () => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${apiKey}`

    // fetch(URL)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data, '--data')
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
    try {
      const response = await axios({
        method: 'GET',
        url: URL,
      })

      setWeatherData(response.data)
      console.log(weatherData)
      console.log(weatherData?.weather[0]?.main)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=" bg-gray-800 h-screen grid place-items-center">
      <div className="bg-[#E5E5E5] w-96 p-4 pb-12 rounded-lg">
        <div className="flex items-center justify-between gap-2">
          <input
            type="text"
            placeholder="Enter your location"
            className="flex-1 text-xl border-b-2 p-4 border-gray-300 uppercase bg-inherit"
            ref={inputRef}
          />
          <button onClick={fetchWeather}>
            <FcSearch className="text-3xl" />
          </button>
        </div>
        {weatherData && (
          <div className="items-center flex flex-col mt-10 gap-6">
            <p className="text-2xl font-semibold">{weatherData?.name}</p>
            <p className="text-[8rem]">
              {weatherIcons(weatherData?.weather[0]?.main)}
            </p>
            <p className="text-2xl font-semibold">
              {weatherData?.weather[0]?.main}
            </p>
            <p className="text-2xl font-bold">
              {weatherData?.main?.temp} &#176;C
            </p>
            <FaTemperatureLow />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
