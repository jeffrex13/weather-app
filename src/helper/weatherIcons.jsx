import { IoMdSunny } from 'react-icons/io'
import {
  BsFillCloudRainFill,
  BsSnow,
  BsFillCloudsFill,
  BsFillCloudHazeFill,
  BsFillCloudDrizzleFill,
} from 'react-icons/bs'
import { WiSmoke } from 'react-icons/wi'
import { RiMistFill } from 'react-icons/ri'

export const weatherIcons = (weather) => {
  switch (weather) {
    case 'Clear':
      return <IoMdSunny className="text-[#FFC24F]" />
    case 'Rain':
      return <BsFillCloudRainFill className="text-[#7b8fa8]" />
    case 'Snow':
      return <BsSnow />
    case 'Clouds':
      return <BsFillCloudsFill className="text-[#a3bbda]" />
    case 'Haze':
      return <BsFillCloudHazeFill />
    case 'Smoke':
      return <WiSmoke />
    case 'Mist':
      return <RiMistFill />
    case 'Drizzle':
      return <BsFillCloudDrizzleFill />
    default:
      break
  }
}
