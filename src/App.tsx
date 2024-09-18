import style from "./App.module.css";
import Alert from "./components/Alert/Alert";
import Form from "./components/Form/Form";
import Spinner from "./components/Spinner/Spinner";
import WeatherDetail from "./components/WeatherDetail/WeatherDetail";
import useWeather from "./hooks/useWeather";
function App() {

  const { weather, loading, notFound, imagen, fetchWeather, hasWeatherData } = useWeather();

  // ? Asi se leen las variabels de ambiente
  console.log('Variables', import.meta.env)
  return (
    <div>
      <h1 className={style.title}>WeatherNow</h1>
      <p className={style.description}>WeatherNow is a React application that allows you to quickly and easily check the current weather for any city. It provides up-to-date information on temperature, humidity, wind speed, and more, giving you a comprehensive overview of the weather conditions wherever you are.</p>

      <div className={style.container}>
        <Form
          fetchWeather={fetchWeather} />
        {
          loading && <Spinner />
        }
        {
          hasWeatherData && <WeatherDetail weather={weather} imagen={imagen} />
        }
        {
          notFound && <Alert>City not found</Alert>
        }
      </div>
    </div>
  )
}

export default App
