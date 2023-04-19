import Utilities from "./Utilities"

const CurrentWeather = props => {
    const data = props.data

    return (
        <div className={`d-flex justify-content-evenly shadow rounded rounded-4 slide-from-top mb-3 fs-7 py-1`}>
            <div className="d-flex flex-row justify-content-center align-items-center">
                <img src={`https://openweathermap.org/img/wn/${data.weather?.[0]?.icon}@2x.png`} />
                <div className="d-flex flex-column">
                    <span className="fw-bold">{data.name}</span>
                    <span className="fw-normal">{data.weather?.[0]?.main}</span>
                    <span className="fw-light">{data.main?.temp} °C</span>
                    <span className="fw-lighter fs-8">{Utilities.handleLocalTime(data.dt)}</span>
                </div>
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center">
                <div className="d-flex flex-column">
                    <div>
                        <i className="bi bi-speedometer me-2" />
                        <span>{Utilities.handleAtmosphericPressure(data.main?.pressure)}</span>
                    </div>
                    <div>
                        <i className="bi bi-droplet-half me-2" />
                        <span>{data.main?.humidity}%</span>
                    </div>
                    <div>
                        <i className="bi bi-cloud me-2" />
                        <span>{data.clouds?.all}%</span>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center">
                <div className="d-flex flex-column">
                    <div>
                        <i className="bi bi-wind me-2" />
                        <span>{data.wind?.speed} m/s</span>
                    </div>
                    <div>
                        <i className="bi bi-sunrise me-2" />
                        <span>{Utilities.handleLocalTime(data.sys?.sunrise)}</span>
                    </div>
                    <div>
                        <i className="bi bi-sunset me-2" />
                        <span>{Utilities.handleLocalTime(data.sys?.sunset)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentWeather