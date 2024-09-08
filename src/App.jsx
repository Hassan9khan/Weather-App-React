import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

const App = () => {

    const [addweather, setaddweather] = useState([])
    let inputRef = useRef()

    useEffect(() => {

    }, [checkStatus])

    function checkStatus(event) {
        event.preventDefault()
        if (inputRef.current.value === ``) {
            alert(`please enter city name`)
        }
        // async function getdata() {
        
        axios(`https://api.weatherapi.com/v1/current.json?key=e3e98122324b454b92f44333241406&q=${inputRef.current.value}&aqi=no`)
            .then(response => {
                console.log(response.data);
                addweather.push(response.data)
                setaddweather([...addweather])
                console.log(addweather);
            }).catch(error => {
                console.log(error);
                alert(`not a city name`)
            })

        inputRef.current.value = ``
    }

    return (
        <>
            <h1>Weather App</h1>
            <form onSubmit={checkStatus}>
                <input type="text" placeholder='Enter city name!' ref={inputRef} />
                <button>Success</button>
            </form>

            <div>
                {(
                    addweather.map((item, index) => (
                        <div key={index}>
                            <h2>{item.location.name}, {item.location.country}</h2>
                            <p className="text-lg">Temperature: {item.current.temp_c}°C</p>
                            <p>Condition: {item.current.condition.text}</p>
                            <img src={item.current.condition.icon} alt="Loading"/>
                            <p>Humidity: {item.current.humidity}%</p>
                            <p>Wind Speed: {item.current.wind_kph} kph</p>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}

export default App

