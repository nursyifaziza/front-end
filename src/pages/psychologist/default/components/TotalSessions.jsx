// Chakra imports
import {
    Box,
    Button,
    Card,
    CardBody,
    Flex,
    Icon,
    Text,
    useColorModeValue
} from "@chakra-ui/react";

// Custom components
import LineChart from "@/components/charts/LineChart";
import {MdOutlineCalendarToday} from "react-icons/md";

// Assets
import {RiArrowUpSFill} from "react-icons/ri";
import {lineChartDataTotalSpent, lineChartOptionsTotalSpent} from "@/variables/charts";

export default function TotalSessions(props) {
    const {
        ...rest
    } = props;

    // Chakra Color Mode
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

    return (
        <Card
            padding="20px"
            borderRadius='20px'
            w="100%"
            mb="0px"
            {...rest}>
            <CardBody>
                <Flex justify="space-between" ps="0px" pe="20px" pt="5px">
                    <Flex align="center" w="100%">
                        <Button
                            bg={boxBg}
                            fontSize="sm"
                            fontWeight="500"
                            color={textColorSecondary}
                            borderRadius="7px">
                            <Icon as={MdOutlineCalendarToday} color={textColorSecondary} me="4px"/>
                            This month
                        </Button>
                    </Flex>
                </Flex>
                <Flex
                    w="100%"
                    flexDirection={{
                    base: "column",
                    lg: "row"
                }}>
                    <Flex flexDirection="column" mt={4}>
                        <Text
                            color={textColor}
                            fontSize="34px"
                            textAlign="start"
                            fontWeight="700"
                            lineHeight="100%">
                            20
                        </Text>
                        <Flex align="center" mb="20px">
                            <Text
                                color="secondaryGray.600"
                                fontSize="sm"
                                fontWeight="500"
                                mt="4px"
                                me="0px"
                                align={"left"}>
                                total sessions
                            </Text>
                            <Flex align="center">
                                <Icon as={RiArrowUpSFill} color="green.500" me="2px" mt="2px"/>
                                <Text color="green.500" fontSize="sm" fontWeight="700">
                                    +15%
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Box minH="260px" minW="75%" mt="auto">
                        <LineChart
                            chartData={lineChartDataTotalSpent}
                            chartOptions={lineChartOptionsTotalSpent}/>
                    </Box>
                </Flex>
            </CardBody>
        </Card>
    );
}
