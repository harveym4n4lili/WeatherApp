import { useState } from 'react'
import WeatherPanel from './components/WeatherPanel.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <WeatherPanel/>
    </>
  )
}

export default App
