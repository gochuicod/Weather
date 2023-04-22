import { Text } from "@mantine/core"

const Utilities = {
    handleAtmosphericPressure: value => value < 1013 ? "Low" : "High",
    handleLocalTime: value => {
        const time = new Date(value*1000).toLocaleTimeString()
        return time.substring(0,time.length-2)
    },
    handleAirQualityIndexLevel: (value,l1,l2,l3,l4) => {
        if(value > -1 && value < l1+1) return <Text fw={'bold'} c={'green'}>Good</Text>
        if(value > l1-1 && value < l2+1) return <Text fw={'bold'} c={'yellow'}>Fair</Text>
        if(value > l2-1 && value < l3+1) return <Text fw={'bold'} c={'blue'}>Moderate</Text>
        if(value > l3-1 && value < l4+1) return <Text fw={'bold'} c={'orange'}>Poor</Text>
        if(value > l4-1) return <Text c={'red'}>Very Poor</Text>
    }
}

export default Utilities