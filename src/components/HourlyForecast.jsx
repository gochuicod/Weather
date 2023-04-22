import Utilities from "./Utilities";
import { Box, Container, Flex, Group, Image, Text, Tooltip } from "@mantine/core";
import { IconCloud, IconCloudRain, IconDropletFilled2, IconEye, IconRainbowOff, IconWind } from "@tabler/icons-react";

const HourlyForecast = props => {
    let data = []
    props.data.list?.slice(0,11).map(item => data.push(item))

    return (
        <Box>
            {
                data.map((item,index) => {
                    return (
                        <Container
                            className="slide-from-top"
                            key={index}
                            size={'md'}
                            fz={'xs'}
                            mb={'lg'}
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
                                <Image className="zoom-in" maw={100} src={`https://openweathermap.org/img/wn/${item.weather?.[0]?.icon}@2x.png`}/>
                                <Flex direction={'column'} className="zoom-in">
                                    <Text>{item.weather?.[0]?.main}</Text>
                                    <Text>{item.main?.temp} °C</Text>
                                    <Text fw={'lighter'}>{Utilities.handleLocalTime(item.dt)}</Text>
                                </Flex>
                                <Flex direction={'column'} className="zoom-in">
                                    <Group spacing={10}>
                                        <Tooltip label="Atmospheric Pressure">
                                            <IconRainbowOff width={16}/>
                                        </Tooltip>
                                        <Text>{Utilities.handleAtmosphericPressure(item.main?.pressure)}</Text>
                                    </Group>
                                    <Group spacing={10}>
                                        <Tooltip label="Humidity">
                                            <IconDropletFilled2 width={16}/>
                                        </Tooltip>
                                        <Text>{item.main?.humidity}</Text>
                                    </Group>
                                    <Group spacing={10}>
                                        <Tooltip label="Clouds">
                                            <IconCloud width={16}/>
                                        </Tooltip>
                                        <Text>{item.clouds?.all}%</Text>
                                    </Group>
                                </Flex>
                                <Flex direction={'column'} className="zoom-in">
                                    <Group spacing={10}>
                                        <Tooltip label="Wind Speed">
                                            <IconWind width={16}/>
                                        </Tooltip>
                                        <Text>{item.wind?.speed} m/s</Text>
                                    </Group>
                                    <Group spacing={10}>
                                        <Tooltip label="Probability of Precipitation">
                                            <IconCloudRain width={16}/>
                                        </Tooltip>
                                        <Text>{Math.floor(item.pop*100)} %</Text>
                                    </Group>
                                    <Group spacing={10}>
                                        <Tooltip label="Visibility">
                                            <IconEye width={16}/>
                                        </Tooltip>
                                        <Text>{item.visibility/1000} km</Text>
                                    </Group>
                                </Flex>
                            </Flex>
                        </Container>
                    )
                })
            }
        </Box>
    )
}

export default HourlyForecast