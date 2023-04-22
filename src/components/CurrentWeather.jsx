import Utilities from "./Utilities";
import { Box, Container, Flex, Group, Image, Text, Tooltip } from "@mantine/core";
import { IconCloud, IconDropletFilled2, IconRainbowOff, IconSunrise, IconSunset, IconWind } from "@tabler/icons-react";

const CurrentWeather = props => {
    const data = props.data

    return (
        <Box>
            <Container 
                className="slide-from-top"
                size={'md'}
                fz={'xs'}
                sx={{
                    boxShadow: '10px 15px 15px rgba(221,221,221,0.5)',
                    borderRadius: 24
                }}
            >
                <Flex
                    justify={'space-evenly'}
                    align={'center'}
                    direction={'row'}
                >
                    <Image className="zoom-in" maw={100} src={`https://openweathermap.org/img/wn/${data.weather?.[0]?.icon}@2x.png`}/>
                    <Flex direction={'column'} className="zoom-in">
                        <Text fw={'bolder'}>{data.name}</Text>
                        <Text>{data.weather?.[0]?.main}</Text>
                        <Text>{data.main?.temp} °C</Text>
                        <Text fw={'lighter'}>{Utilities.handleLocalTime(data.dt)}</Text>
                    </Flex>
                    <Flex direction={'column'} className="zoom-in">
                        <Group spacing={10}>
                            <Tooltip label="Atmospheric Pressure">
                                <IconRainbowOff width={16}/>
                            </Tooltip>
                            <Text>{Utilities.handleAtmosphericPressure(data.main?.pressure)}</Text>
                        </Group>
                        <Group spacing={10}>
                            <Tooltip label="Humidity">
                                <IconDropletFilled2 width={16}/>
                            </Tooltip>
                            <Text>{data.main?.humidity}%</Text>
                        </Group>
                        <Group spacing={10}>
                            <Tooltip label="Clouds">
                                <IconCloud width={16}/>
                            </Tooltip>
                            <Text>{data.clouds?.all}%</Text>
                        </Group>
                    </Flex>
                    <Flex direction={'column'} className="zoom-in">
                        <Group spacing={10}>
                            <Tooltip label="Wind Speed">
                                <IconWind width={16}/>
                            </Tooltip>
                            <Text>{data.wind?.speed}</Text>
                        </Group>
                        <Group spacing={10}>
                            <Tooltip label="Sunrise">
                                <IconSunrise width={16}/>
                            </Tooltip>
                            <Text>{Utilities.handleLocalTime(data.sys?.sunrise)}</Text>
                        </Group>
                        <Group spacing={10}>
                            <Tooltip label="Sunset">
                                <IconSunset width={16}/>
                            </Tooltip>
                            <Text>{Utilities.handleLocalTime(data.sys?.sunset)}</Text>
                        </Group>
                    </Flex>
                </Flex>
            </Container>
        </Box>
    )
}

export default CurrentWeather