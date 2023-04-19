import Utilities from "./Utilities";

const HourlyForecast = props => {
    let data = []
    props.data.list?.slice(0,11).map(item => data.push(item))

    return (
        <div>
            <div className="d-flex flex-row justify-content-center mt-5 mb-3 zoom-in">
                <span>3-hour Step Forecast</span>
            </div>
            {
                data.map((item,index) => {
                    return (
                        <div className="d-flex justify-content-evenly align-items-center shadow rounded rounded-4 slide-from-top mb-3 fs-7 py-1" key={index}>
                            <div className="d-flex flex-row justify-content-center align-items-center">
                                <img src={`https://openweathermap.org/img/wn/${item.weather?.[0]?.icon}@2x.png`} />
                                <div className="d-flex flex-column">
                                    <span className="fw-normal">{item.weather?.[0]?.main}</span>
                                    <span className="fw-light">{item.main?.temp} °C</span>
                                    <span className="fw-lighter">{Utilities.handleLocalTime(item.dt)}</span>
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-center align-items-center">
                                <div className="d-flex flex-column">
                                    <div>
                                        <i className="bi bi-speedometer me-2" />
                                        <span>{Utilities.handleAtmosphericPressure(item.main?.pressure)}</span>
                                    </div>
                                    <div>
                                        <i className="bi bi-droplet-half me-2" />
                                        <span>{item.main?.humidity}</span>
                                    </div>
                                    <div>
                                        <i className="bi bi-cloud me-2" />
                                        <span>{item.clouds?.all}%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-center align-items-center">
                                <div className="d-flex flex-column">
                                    <div>
                                        <i className="bi bi-wind me-2" />
                                        <span>{item.wind?.speed} m/s</span>
                                    </div>
                                    <div>
                                        <i className="bi bi-cloud-rain me-2" />
                                        <span>{Math.floor(item.pop*100)} %</span>
                                    </div>
                                    <div>
                                        <i className="bi bi-eye me-2" />
                                        <span>{item.visibility/1000} km</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default HourlyForecast