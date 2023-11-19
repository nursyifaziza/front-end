// Chakra imports
import {
    Avatar,
    Box,
    Card,
    SimpleGrid,
    Text,
    useColorModeValue
} from "@chakra-ui/react";

export default function BannerPsycholog(props) {
    // eslint-disable-next-line react/prop-types
    const {banner, avatar, name} = props;

    // Chakra Color Mode
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("white !important", "#111C44 !important");

    return (
        <Card padding="20px" borderRadius='20px' align='left'>
            <Box
                bg={`url(${banner})`}
                bgSize='cover'
                borderRadius='16px'
                h='131px'
                w='100%'/>
            <Avatar
                mx='auto'
                src={avatar}
                h='87px'
                w='87px'
                mt='-43px'
                border='4px solid'
                borderColor={borderColor}/>
            <Text
                color={textColorPrimary}
                fontWeight='bold'
                fontSize='xl'
                mt='10px'
                mb='4px'
                align={"center"}>
                {name}
            </Text>

            <SimpleGrid columns={2} columnGap={1}>
                <Text fontWeight={"bold"}>Gender</Text>
                <Text>Female</Text>
            </SimpleGrid>

            <SimpleGrid columns={2} columnGap={1}>
                <Text fontWeight={"bold"}>Email</Text>
                <Text>patient@gmail.com</Text>
            </SimpleGrid>

            <SimpleGrid columns={2} columnGap={1}>
                <Text fontWeight={"bold"}>WhatsApp</Text>
                <Text>087714556632</Text>
            </SimpleGrid>

            <SimpleGrid columns={2} columnGap={1}>
                <Text fontWeight={"bold"}>Method</Text>
                <Text>Video call</Text>
            </SimpleGrid>

            <SimpleGrid columns={2} columnGap={1}>
                <Text fontWeight={"bold"}>Problems</Text>
                <Text>Sleep, Depression, Relationship</Text>
            </SimpleGrid>

            <SimpleGrid columns={2} columnGap={1}>
                <Text fontWeight={"bold"}>Appointment date</Text>
                <Text>Sep 30, 2023</Text>
            </SimpleGrid>

            <SimpleGrid columns={2} columnGap={1}>
                <Text fontWeight={"bold"}>Appointment time</Text>
                <Text>03:00-03.30 PM</Text>
            </SimpleGrid>
        
        </Card>
    );
}
