import './css/Custom.css'
import { useEffect, useState, useRef } from 'react'

import ProjectTitle from './Components/ProjectTitle'
import CurrentWeather from './Components/CurrentWeather'
import HandleFetchData from './Components/HandleFetchData'
import CurrentAirPollution from './Components/CurrentAirPollution'
import HourlyForecast from './Components/HourlyForecast'

import { ActionIcon, Box, Flex, Group, TextInput, Text, Container, Transition, Button, Paper } from '@mantine/core'
import { IconMapPin, IconSearch } from '@tabler/icons-react'

const App = () => {
    const apiKey = "925f99c7a911db368626814750c8bc61"
    
    const [query, setQuery] = useState('')
    const [data, setData] = useState(null)

    const [weatherData, setWeatherData] = useState([])
    const [airPollutionData, setAirPollutionData] = useState([])
    const [hourlyForecastData, setHourlyForecastData] = useState([])

    const isMounted = useRef(false)
    const [isPressedEnter, setIsPressedEnter] = useState(false)
    const [isButtonClicked, setIsButtonClicked] = useState(false)

    const handleOnChange = event => setQuery(event.target.value)
    const handleKeyDown = event => {
        if(event.key == "Enter") {
            event.target.blur()
            setData(query.trim())
            setIsPressedEnter(true)
            setQuery("")
        }
    }

    const handleOnClick = event => {
        event.preventDefault()
        event.target.blur()
        setData(query.trim())
        setQuery("")
    }

    useEffect(() => {
        const fetchData = async () => {
            if(data != null){
                const weatherData = await HandleFetchData(`https://api.openweathermap.org/data/2.5/weather?q=${data}&units=metric&appid=${apiKey}`)
                setWeatherData(weatherData)
                
                if(!weatherData.message){
                    const {lat,lon} = weatherData.coord
                    const airPollutionData = await HandleFetchData(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`)
                    setAirPollutionData(airPollutionData)
    
                    const HourlyForecastData = await HandleFetchData(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
                    setHourlyForecastData(HourlyForecastData)
                }
            }
        }

        if(!isMounted.current && (!isPressedEnter || !isButtonClicked)){
            isMounted.current = true;
            fetchData()
        }
        
        isMounted.current = false
        setIsButtonClicked(false)
        setIsPressedEnter(false)
    },[data,apiKey])

    return (
        <div>
            <Box my={'md'} className='zoom-in'>
                <ProjectTitle name="Weather" source="openweathermap"/>
            </Box>

            <Box mb={'xl'}>
                <Container
                    size={'md'}
                >
                    <Flex
                        justify={"center"}
                        align={"center"}
                        gap={"lg"}
                    >
                        <Group>
                            <TextInput
                                className='expand'
                                variant='unstyled'
                                value={query}
                                onChange={handleOnChange}
                                onKeyDown={handleKeyDown}
                                icon={<IconMapPin/>}
                                placeholder='Search weather'
                                radius={'lg'}
                                rightSection={
                                    <ActionIcon
                                        onClick={handleOnClick}
                                        c={'dark.0'}
                                        sx={{
                                            '&': { backgroundColor: 'transparent' },
                                            '&:hover': { backgroundColor: 'transparent' }
                                        }}
                                    >
                                        <IconSearch/>
                                    </ActionIcon>
                                }
                            />
                        </Group>
                    </Flex>
                </Container>
            </Box>

            <Box>
                {
                    data == null ? null : (!isButtonClicked || !isPressedEnter) && weatherData.message ?
                    <Flex
                        c={'red'}
                        justify={'center'}
                        align={'center'}
                    >
                        <Text>{weatherData.message}</Text>
                    </Flex>
                    :
                    <Box>
                        <Box>
                            <CurrentWeather data={weatherData}/>
                        </Box>
                        <Box my={'xl'}>
                            <CurrentAirPollution data={airPollutionData}/>
                        </Box>
                        <Box>
                            <HourlyForecast data={hourlyForecastData}></HourlyForecast>
                        </Box>
                    </Box>
                }
            </Box>
        </div>
    )
}

export default App