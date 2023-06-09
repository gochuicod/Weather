import { Box, Container, Flex, Group, Text, Tooltip } from "@mantine/core"
import Utilities from "./Utilities"

const CurrentAirPollution = props => {
    const data = props.data

    return (
        <Box>
            <Container
                className="slide-from-top card-scale-on-hover"
                size={'md'}
                fz={'xs'}
                py={'md'}
                sx={{
                    boxShadow: '5px 5px 10px rgba(220,220,220,0.5)',
                    borderRadius: 24
                }}
            >
                <Flex
                    justify={'space-evenly'}
                    align={'center'}
                    direction={'row'}
                >
                    <Flex direction={'column'} className="zoom-in">
                        <Group>
                            <Tooltip label="Sulfur Dioxide">
                                <Text>SO<sub>2</sub></Text>
                            </Tooltip>
                            {Utilities.handleAirQualityIndexLevel(data.list?.[0]?.components?.so2,20,80,250,350)}
                        </Group>
                        <Group>
                            <Tooltip label="Nitrogen Dioxide">
                                <Text>NO<sub>2</sub></Text>
                            </Tooltip>
                            {Utilities.handleAirQualityIndexLevel(data.list?.[0]?.components?.no2,40,70,150,200)}
                        </Group>
                    </Flex>
                    <Flex direction={'column'} className="zoom-in">
                        <Group>
                            <Tooltip label="Particulate Matter">
                                <Text>PM<sub>10</sub></Text>
                            </Tooltip>
                            {Utilities.handleAirQualityIndexLevel(data.list?.[0]?.components?.pm10,20,50,100,200)}
                        </Group>
                        <Group>
                            <Tooltip label="Fine Particulate Matter">
                                <Text>PM<sub>2.5</sub></Text>
                            </Tooltip>
                            {Utilities.handleAirQualityIndexLevel(data.list?.[0]?.components?.pm2_5,10,25,50,75)}
                        </Group>
                    </Flex>
                    <Flex direction={'column'} className="zoom-in">
                        <Group>
                            <Tooltip label="Ozone">
                                <Text>O<sub>3</sub></Text>
                            </Tooltip>
                            {Utilities.handleAirQualityIndexLevel(data.list?.[0]?.components?.o3,60,100,140,180)}
                        </Group>
                        <Group>
                            <Tooltip label="Carbon Monoxide">
                                <Text>CO</Text>
                            </Tooltip>
                            {Utilities.handleAirQualityIndexLevel(data.list?.[0]?.components?.co,4400,9400,12400,15400)}
                        </Group>
                    </Flex>
                </Flex>
            </Container>
        </Box>
    )
}

export default CurrentAirPollution