import { Box, Container, Flex, Group, Text } from "@mantine/core"
import Utilities from "./Utilities"

const CurrentAirPollution = props => {
    const data = props.data

    return (
        <Box>
            <Container
                className="slide-from-top"
                size={'md'}
                fz={'xs'}
                py={'md'}
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
                    <Flex direction={'column'}>
                        <Group>
                            <Text>SO<sub>2</sub></Text>
                            {Utilities.handleAirQualityIndexLevel(data.list?.[0]?.components?.so2,20,80,250,350)}
                        </Group>
                        <Group>
                            <Text>NO<sub>2</sub></Text>
                            {Utilities.handleAirQualityIndexLevel(data.list?.[0]?.components?.no2,40,70,150,200)}
                        </Group>
                    </Flex>
                    <Flex direction={'column'}>
                        <Group>
                            <Text>PM<sub>10</sub></Text>
                            {Utilities.handleAirQualityIndexLevel(data.list?.[0]?.components?.pm10,20,50,100,200)}
                        </Group>
                        <Group>
                            <Text>PM<sub>2.5</sub></Text>
                            {Utilities.handleAirQualityIndexLevel(data.list?.[0]?.components?.pm2_5,10,25,50,75)}
                        </Group>
                    </Flex>
                    <Flex direction={'column'}>
                        <Group>
                            <Text>O<sub>2</sub></Text>
                            {Utilities.handleAirQualityIndexLevel(data.list?.[0]?.components?.o3,60,100,140,180)}
                        </Group>
                        <Group>
                            <Text>CO</Text>
                            {Utilities.handleAirQualityIndexLevel(data.list?.[0]?.components?.o3,4400,9400,12400,15400)}
                        </Group>
                    </Flex>
                </Flex>
            </Container>
        </Box>
    )
}

export default CurrentAirPollution