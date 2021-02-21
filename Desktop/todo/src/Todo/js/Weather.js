import React, { PureComponent } from 'react'
import axios from 'axios'
import classes from "../css/Weather.module.css"
class Weather extends PureComponent {
    state = {
        temp: null,
        city: null,
        icon: null
    }
    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=31e74680f3cbdb6d75e16ee87adbdece
                `).then((res) => {
                    this.setState({
                        city: res.data.name,
                        temp: (res.data.main.temp - 273).toFixed(2),
                        icon: res.data.weather[0].icon
                    })
                })
            })
        }
        else {
            alert("your browser doesnt support geolocation")
        }
    }

    render() {
        let display = this.state.temp !== null ? <p title="Weather">{this.state.temp} &#xB0;</p> : <p>Weather</p>
        return (
            <div className={classes.Weather} >
                <div style={{ textAlign: 'right' }} className={classes.icon}>
                    {this.state.icon ?
                        <img src={`http://openweathermap.org/img/w/${this.state.icon}.png`} alt="icon" id="img" />
                        : null}
                    {display}
                </div>
                <div className={classes.city} title="City">{this.state.city}</div>
            </div>
        )
    }
}

export default Weather