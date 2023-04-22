import { Box, Container, Flex, Group, Image, Text } from "@mantine/core";
import Utilities from "./Utilities";
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
                                <Image maw={100} src={`https://openweathermap.org/img/wn/${item.weather?.[0]?.icon}@2x.png`}/>
                                <Flex direction={'column'}>
                                    <Text>{item.weather?.[0]?.main}</Text>
                                    <Text>{item.main?.temp} °C</Text>
                                    <Text fw={'lighter'}>{Utilities.handleLocalTime(item.dt)}</Text>
                                </Flex>
                                <Flex direction={'column'}>
                                    <Group spacing={10}>
                                        <IconRainbowOff width={16}/>
                                        <Text>{Utilities.handleAtmosphericPressure(item.main?.pressure)}</Text>
                                    </Group>
                                    <Group spacing={10}>
                                        <IconDropletFilled2 width={16}/>
                                        <Text>{item.main?.humidity}</Text>
                                    </Group>
                                    <Group spacing={10}>
                                        <IconCloud width={16}/>
                                        <Text>{item.clouds?.all}%</Text>
                                    </Group>
                                </Flex>
                                <Flex direction={'column'}>
                                    <Group spacing={10}>
                                        <IconWind width={16}/>
                                        <Text>{item.wind?.speed} m/s</Text>
                                    </Group>
                                    <Group spacing={10}>
                                        <IconCloudRain width={16}/>
                                        <Text>{Math.floor(item.pop*100)} %</Text>
                                    </Group>
                                    <Group spacing={10}>
                                        <IconEye width={16}/>
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