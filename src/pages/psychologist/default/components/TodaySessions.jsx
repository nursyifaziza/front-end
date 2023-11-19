// Chakra imports
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";

// Custom components import Card from "@/components/card/Card.jsx";
import { IoCalendarOutline, IoTimeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function TodaySessions(props) {
  const { ...rest } = props;

  const [todaySession, setTodaySession] = useState([]);

  const getSession = async () => {
    axios
      .get(`http://localhost:5000/api/appointment`, {
        headers: { "x-access-token": localStorage.getItem("accessToken") },
      })
      .then((res) => {
        setTodaySession(res.data.data.appointments);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getSession();
  }, []);

  return (
    <Card
      justifyContent="center"
      align="left"
      w="100%"
      mb="0px"
      borderRadius="20px"
      {...rest}
    >
      <CardHeader>
        <HStack justifyContent={"space-between"}>
          <Heading size="md">Today Sessions</Heading>
          <Link to={"/p/appointments"}>
            <Button fontWeight={500} size="sm" variant="outline">
              View all
            </Button>
          </Link>
        </HStack>
      </CardHeader>

      <CardBody maxH="50vh" overflowY="auto">
        {/* {todaySession.filter((item) => item.scheduleId.date)} */}
        {todaySession.map((item) => (
          <Card
            key={item._id}
            bgColor={"grass.100"}
            borderRadius="16px"
            border={"2px solid"}
            borderColor={"grass.300"}
            justifyContent="center"
            align="left"
            w="100%"
            mb="0px"
            mt="16px"
            fontSize={"sm"}
            direction={{
              base: "column",
              sm: "column",
            }}
            overflow="hidden"
            variant="outline"
          >
            <CardBody>
              <Flex mb={2}>
                <Icon
                  marginRight="4px"
                  transition="0.2s linear"
                  w="20px"
                  h="20px"
                  as={IoCalendarOutline}
                  color="black.400"
                />
                <Text>{new Date(item.scheduleId.date).toDateString()}</Text>
              </Flex>
              <Flex justifyContent="space-between" alignItems="center">
                <HStack>
                  <Icon
                    marginRight="4px"
                    transition="0.2s linear"
                    w="20px"
                    h="20px"
                    as={IoTimeOutline}
                    color={"grass.500"}
                  />
                  <Text>
                    {item.scheduleId.timeSlots &&
                      new Date(
                        item.scheduleId.timeSlots.startTime
                      ).toLocaleTimeString()}{" "}
                    -{" "}
                    {item.scheduleId &&
                      new Date(
                        item.scheduleId.timeSlots.endTime
                      ).toLocaleTimeString()}
                  </Text>
                </HStack>
                <Link to={item.linkSession}>
                  <Button variant="solid" colorScheme="green">
                    Start
                  </Button>
                </Link>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </CardBody>
    </Card>
  );
}
