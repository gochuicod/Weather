const Utilities = {
    handleAtmosphericPressure: value => value < 1013 ? "Low" : "High",
    handleLocalTime: value => {
        const time = new Date(value*1000).toLocaleTimeString()
        return time.substring(0,time.length-2)
    }
}

export default Utilities