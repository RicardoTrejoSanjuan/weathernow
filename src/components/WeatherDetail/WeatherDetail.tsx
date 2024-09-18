import { Weather } from "../../types"
import { formatTemperature } from "../../utils"
import styles from "./WeatherDetail.module.css"

type WeatherDetailProps = {
  weather: Weather,
  imagen: string
}
export default function WeatherDetail({ weather, imagen }: WeatherDetailProps) {
  return (
    <div className={styles.container} style={{
      backgroundImage: `linear-gradient(to right, rgba(110, 110, 110, 0.7), rgba(110, 110, 110, 0.7)), url(${imagen})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#fff',
    }}>
      <h2>Clima de: </h2>
      <p className={styles.current}>{formatTemperature(weather.main.temp)}&deg;C</p>
      <div className={styles.temperature}>
        <p>Min: <span>{formatTemperature(weather.main.temp_min)}&deg;C</span></p>
        <p>Max: <span>{formatTemperature(weather.main.temp_max)}&deg;C</span></p>
      </div>
    </div>
  )
}
