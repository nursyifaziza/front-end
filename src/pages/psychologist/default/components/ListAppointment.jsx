// Chakra imports
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    HStack,
    Heading,
  } from "@chakra-ui/react";
  
  // Custom components import Card from "@/components/card/Card.jsx";
  import Appointment from "./Appointment";
  import { Link } from "react-router-dom";

function ListAppointment({status, listSchedule}) {
  return (
    <Card
      justifyContent="center"
      align="left"
      w="100%"
      mb="0px"
      borderRadius="20px"
    >
      <CardHeader>
        <HStack justifyContent={"space-between"}>
          <Heading size="md">{status} Appointment</Heading>
          <Link to={"/p/appointments"}>
            <Button fontWeight={500} size="sm" variant="outline">
              View all
            </Button>
          </Link>
        </HStack>
      </CardHeader>

      <CardBody maxH="50vh" overflowY="auto">
        {listSchedule.map((item) => (
          <Appointment key={item._id} item={item} />
        ))}
      </CardBody>
    </Card>
  );
}

export default ListAppointment;
