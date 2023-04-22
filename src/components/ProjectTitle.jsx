import { Flex, Text } from "@mantine/core"

const ProjectTitle = props => {
    return (
        <Flex
            align={'center'}
            justify={'center'}
            fz={'xs'}
        >
            <Text fw={'bold'}>{props.name}&nbsp;</Text>
            <Text>data sourced from&nbsp;</Text>
            <Text fw={'lighter'} fs={'italic'}>{props.source}</Text>
        </Flex>
    )
}

export default ProjectTitle