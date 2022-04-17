import { useState, useEffect } from 'react'
import axios from 'axios'

const BasicData = (props) => {

    const [weather, setWeather] = useState([])

    const capital = props.basicData.capital;
    const APIkey = process.env.REACT_APP_API_KEY

    useEffect(() => {
        console.log('effect')
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?c={${capital}}&appid={${APIkey}}`)
          .then(response => {
            console.log('promise fulfilled')
            setWeather(response.data)
            console.log(APIkey)
          })
    })

    return(
        <div key={props.basicData.name.cioc}>
            <h1>{props.basicData.name.common}</h1>
            <div>Capital: {props.basicData.capital}</div>
            <div>Area: {props.basicData.area}</div>
            <h3>Languages:</h3>
            <div>
                {Object.values(props.basicData.languages).map(language => 
                    <li key={language}>{language}</li>)}
            </div>
            <p><img alt={props.basicData.name.common} src={props.basicData.flags.png}/></p>
            <p>{weather}</p>
        </div>
    )
  }

export default BasicData