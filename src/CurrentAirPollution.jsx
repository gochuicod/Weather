const CurrentAirPollution = props => {
    const data = props.data

    return (
        <div className="shadow rounded rounded-4 slide-from-top fs-7 mb-3">
            <div className="d-flex justify-content-evenly align-items-center py-3">
                <div className="d-flex flex-row justify-content-center">
                    <div className="d-flex flex-column justify-content-center">
                        <div>SO<sub>2</sub> {handleAirQualityIndexLevel(data.list?.[0]?.components?.so2,20,80,250,350)}</div>
                        <div>NO<sub>2</sub> {handleAirQualityIndexLevel(data.list?.[0]?.components?.no2,40,70,150,200)}</div>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-center">
                    <div className="d-flex flex-column justify-content-center">
                        <div>PM<sub>10</sub> {handleAirQualityIndexLevel(data.list?.[0]?.components?.pm10,20,50,100,200)}</div>
                        <div>PM<sub>2.5</sub> {handleAirQualityIndexLevel(data.list?.[0]?.components?.pm2_5,10,25,50,75)}</div>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-center">
                    <div className="d-flex flex-column justify-content-center">
                        <div>O<sub>3</sub> {handleAirQualityIndexLevel(data.list?.[0]?.components?.o3,60,100,140,180)}</div>
                        <div>CO {handleAirQualityIndexLevel(data.list?.[0]?.components?.o3,4400,9400,12400,15400)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const handleAirQualityIndexLevel = (value,l1,l2,l3,l4) => {
    if(value > -1 && value < l1+1) return <span className="fw-semibold text-success ms-2">Good</span>
    if(value > l1-1 && value < l2+1) return <span className="fw-semibold text-info ms-2">Fair</span>
    if(value > l2-1 && value < l3+1) return <span className="fw-semibold text-primary ms-2">Moderate</span>
    if(value > l3-1 && value < l4+1) return <span className="fw-semibold text-warning ms-2">Poor</span>
    if(value > l4-1) return <span className="fw-semibold text-danger ms-2">Very Poor</span>
}

export default CurrentAirPollution