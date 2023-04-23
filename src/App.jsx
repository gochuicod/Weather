import './css/Custom.css'
import { useEffect, useState, useRef } from 'react'

import ProjectTitle from './components/ProjectTitle'
import CurrentWeather from './components/CurrentWeather'
import HandleFetchData from './components/HandleFetchData'
import CurrentAirPollution from './components/CurrentAirPollution'
import HourlyForecast from './components/HourlyForecast'
import Utilities from './components/Utilities'

import { ActionIcon, Box, Flex, Group, TextInput, Text, Container, Loader } from '@mantine/core'
import { IconCloudSearch, IconMapPin } from '@tabler/icons-react'

const App = () => {
    const apiKey = Utilities.apiKey

    const [data, setData] = useState(null)
    const inputRef = useRef(null)

    const [weatherData, setWeatherData] = useState([])
    const [airPollutionData, setAirPollutionData] = useState([])
    const [hourlyForecastData, setHourlyForecastData] = useState([])

    const [isPressedEnter, setIsPressedEnter] = useState(false)
    const [isButtonClicked, setIsButtonClicked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleKeyDown = event => {
        if(event.key == "Enter"){
            setIsPressedEnter(true)
            event.target.blur()
            setData(inputRef.current.value.trim())
            inputRef.current.value = ''
        }
    }

    const handleOnClick = event => {
        event.preventDefault()
        setIsButtonClicked(true)
        event.target.blur()
        setData(inputRef.current.value.trim())
        inputRef.current.value = ''
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
                setIsLoading(false)
            }
        }

        if(isPressedEnter == true || isButtonClicked == true) {
            setIsLoading(true)
            fetchData()
        }
        
        setIsButtonClicked(false)
        setIsPressedEnter(false)
    },[data,apiKey])

    return (
        <Container
            mt={'lg'}
            py={'md'}
        >
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
                                ref={inputRef}
                                onKeyDown={handleKeyDown}
                                icon={<IconMapPin/>}
                                placeholder='Search weather'
                                radius={'lg'}
                                rightSection={
                                    <ActionIcon
                                        onClick={handleOnClick}
                                        c={'dark.0'}
                                        sx={{
                                            '&': { backgroundColor: '#fff' },
                                            '&:hover': { backgroundColor: '#fff' },
                                        }}
                                    >
                                        <IconCloudSearch/>
                                    </ActionIcon>
                                }
                            />
                        </Group>
                    </Flex>
                </Container>
            </Box>

            <Box align={'center'} justify={'center'} >
                {
                    isLoading == true ? <Loader mt={'xl'} variant='bars' color='rgba(72,72,74)'/> :
                    weatherData.cod == 200 ?
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
                    : weatherData.cod == '404' || weatherData.cod == '400' ?
                    <Flex
                        c={'red'}
                        justify={'center'}
                        align={'center'}
                    >
                        <Text>{weatherData.message}</Text>
                    </Flex>
                    : null
                }
            </Box>
        </Container>
    )
}

export default App