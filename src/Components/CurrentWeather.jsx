import Utilities from "./Utilities";
import { Box, Container, Flex, Group, Image, Text } from "@mantine/core";
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
                    <Image maw={100} src={`https://openweathermap.org/img/wn/${data.weather?.[0]?.icon}@2x.png`}/>
                    <Flex direction={'column'}>
                        <Text fw={'bolder'}>{data.name}</Text>
                        <Text>{data.weather?.[0]?.main}</Text>
                        <Text>{data.main?.temp} °C</Text>
                        <Text fw={'lighter'}>{Utilities.handleLocalTime(data.dt)}</Text>
                    </Flex>
                    <Flex direction={'column'}>
                        <Group spacing={10}>
                            <IconRainbowOff width={16}/>
                            <Text>{Utilities.handleAtmosphericPressure(data.main?.pressure)}</Text>
                        </Group>
                        <Group spacing={10}>
                            <IconDropletFilled2 width={16}/>
                            <Text>{data.main?.humidity}%</Text>
                        </Group>
                        <Group spacing={10}>
                            <IconCloud width={16}/>
                            <Text>{data.clouds?.all}%</Text>
                        </Group>
                    </Flex>
                    <Flex direction={'column'}>
                        <Group spacing={10}>
                            <IconWind width={16}/>
                            <Text>{data.wind?.speed}</Text>
                        </Group>
                        <Group spacing={10}>
                            <IconSunrise width={16}/>
                            <Text>{Utilities.handleLocalTime(data.sys?.sunrise)}</Text>
                        </Group>
                        <Group spacing={10}>
                            <IconSunset width={16}/>
                            <Text>{Utilities.handleLocalTime(data.sys?.sunset)}</Text>
                        </Group>
                    </Flex>
                </Flex>
            </Container>
        </Box>
    )
}

export default CurrentWeather