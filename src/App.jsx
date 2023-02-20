import { useRef, useState } from 'react'
import './App.css'
import { FcSearch } from 'react-icons/fc'
import axios from 'axios'
import { weatherIcons } from './helper/weatherIcons'

function App() {
  const apiKey = import.meta.env.VITE_API_KEY
  const inputRef = useRef(null)
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(false)

  // call API data
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
      setError(false)
      setWeatherData(response.data)
    } catch (error) {
      console.log(error)
      setError(true)
    }
  }

  // call fetchWeather() when Enter key is pressed
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      fetchWeather()
    }
  }

  return (
    <div className="bg-[#1e354d] h-screen grid place-items-center">
      <div className="bg-gray-800 w-[28rem] p-4 pb-4 rounded-2xl">
        <div className="flex items-center justify-between mx-auto gap-4 w-[95%]">
          <input
            type="text"
            placeholder="Enter your location"
            className="flex-1 text-sm text-white p-4 uppercase bg-[#242526] rounded-lg"
            ref={inputRef}
            onKeyDown={handleKeyDown}
          />
          <button onClick={fetchWeather}>
            <FcSearch className="text-3xl" />
          </button>
        </div>
        {!error ? (
          weatherData && (
            <div className="items-center flex flex-col mt-10 pb-8 gap-6">
              <div className="flex items-center gap-8">
                <p className="text-[8rem]">
                  {weatherIcons(weatherData?.weather[0]?.main)}
                </p>
                <div className="flex flex-col">
                  <p className="text-xl text-white">{weatherData?.name}</p>
                  <p className="font-semibold text-2xl text-white">
                    {weatherData?.main?.temp}&#176;C
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 items-center text-white">
                <p className="text-2xl font-semibold">
                  {weatherData?.weather[0]?.main}
                </p>
                <p className="text-base font-semibold uppercase">
                  {weatherData?.weather[0]?.description}
                </p>
              </div>
            </div>
          )
        ) : (
          <div className="text-center p-8">
            <p className="text-white text-xl">Data not found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
