import {
  Stack,
  VStack,
  Flex,
  Button,
  Modal,
  useDisclosure,
} from "@chakra-ui/react";

// Assets
import EventCalendar from "@/components/calendar/MiniCalendar";
import TodayAppointments from "../default/components/TodaySessions";
import Schedule from "../default/components/Schedule";
import InputSchedule from "../default/components/InputSchedule";
import axios from "axios";
import { useEffect, useState } from "react";
import ListAppointment from "../default/components/ListAppointment";

export default function Schedules() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [listSchedule, setListSchedule] = useState([]);

  const getSession = async () => {
    const id = localStorage.getItem("idAccount");
    axios
      .get(`http://localhost:5000/api/psychologist/schedule/${id}`, {
        headers: { "x-access-token": localStorage.getItem("accessToken") },
      })
      .then((res) => {
        setListSchedule(res.data.data.schedules);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getSession();
  }, []);

  return (
    <Stack p={"32px"}>
      <Flex justifyContent="flex-end">
        <Button onClick={onOpen} fontWeight={500} size="md" colorScheme="brand">
          + Create availability
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <InputSchedule onClose={onClose} />
      </Modal>
      <Stack direction={"row"} spacing={8}>
        <ListAppointment
          status="Available"
          listSchedule={listSchedule.filter((item) => item.isBooked == false)}
        />
        <ListAppointment
          status="Booked"
          listSchedule={listSchedule.filter((item) => item.isBooked == true)}
        />
      </Stack>
    </Stack>
  );
}
