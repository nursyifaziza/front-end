import {
  Box,
  Center,
  Flex,
  Text,
  Avatar,
  Stack,
  TagLabel,
  Tag,
  TagLeftIcon,
  Icon,
  Select,
  Button,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBriefcase } from "react-icons/fa";
import { HiOutlineIdentification } from "react-icons/hi";
import { IoSchoolOutline } from "react-icons/io5";
import { BsFileEarmark } from "react-icons/bs";
import axios from "axios";

function Booking() {
  // fetching data
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [listSchedule, setListSchedule] = useState([]);
  const [problem, setProblem] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [amount, setAmount] = useState(null);

  const goTo = useNavigate();

  const fetchData = async () => {
    axios
      .get(`http://localhost:5000/api/account/psychologist/${id}`)
      .then((res) => {
        setData(res.data.data.psychologist);
      })
      .catch((err) => console.log(err));
  };

  const getAvailableSchedule = async () => {
    axios
      .get(`http://localhost:5000/api/psychologist/schedule/${id}`)
      .then((res) => {
        setListSchedule(res.data.data.schedules);
      })
      .catch((err) => console.log(err));
  };

  const handlePackage = (select, amount) => {
    setSelectedPackage(select);
    setAmount(amount);
  };

  const handleNext = () => {
    const dataBooking = {
      psychologistId: id,
      scheduleId: selectedSchedule,
      package: selectedPackage,
      amount: amount,
      userProblem: problem,
    };
    const dataDate = listSchedule.find((item) => item._id == selectedSchedule);
    goTo("payment", {
      state: {
        dataBooking: dataBooking,
        dataDate: dataDate,
        doctorName: data.fullName,
      },
    });
  };

  useEffect(() => {
    fetchData();
    getAvailableSchedule();
  }, [id]);

  // card
  const Package = () => {
    return (
      <Flex justify="space-around" px={20} pt={10}>
        <Card
          transform={
            selectedPackage === "Video Call" ? "translateY(-20px)" : ""
          }
        >
          <CardHeader>
            <Heading size="md" textAlign="center">
              Video Call
            </Heading>
          </CardHeader>
          <CardBody>
            <Text> A video call session for an hour. </Text>
            <Text fontWeight="semibold"> Rp200.000 </Text>
          </CardBody>
          <CardFooter>
            <Box display="flex" justifyContent="center">
              <CardFooter>
                <Button
                  bg="#FFAC31"
                  color="white"
                  onClick={() => handlePackage("Video Call", 200000)}
                >
                  Select
                </Button>
              </CardFooter>
            </Box>
          </CardFooter>
        </Card>

        <Card
          transform={
            selectedPackage === "Voice Call" ? "translateY(-40px)" : ""
          }
        >
          <CardHeader>
            <Heading size="md" textAlign="center">
              Voice Call
            </Heading>
          </CardHeader>
          <CardBody>
            <Text> A voice call session for an hour. </Text>
            <Text fontWeight="semibold"> Rp100.000 </Text>
          </CardBody>
          <CardFooter>
            <Box display="flex" justifyContent="center">
              <CardFooter>
                <Button
                  bg="#FFAC31"
                  color="white"
                  onClick={() => handlePackage("Voice Call", 100000)}
                >
                  Select
                </Button>
              </CardFooter>
            </Box>
          </CardFooter>
        </Card>
      </Flex>
    );
  };

  return (
    <Box bg="white" p="24px" borderTop="1px" borderTopColor="gray.200">
      <Box className="profile" pr="80px" pl="80px">
        <Box className="title">
          <Center>
            <Text fontSize="18px" fontWeight="semibold">
              Psychologyst Detail
            </Text>
          </Center>
        </Box>
        <Box mt={6} className="profil-psikolog">
          <Flex gap={6} flexWrap="wrap">
            <Avatar size="xl" src={data.photo} />
            <Box flexBasis="calc(100% - 140px)">
              <Text fontSize="lg" fontWeight="semibold">
                {data.fullName}
              </Text>
              <Text color="gray.500" fontSize="md">
                {data.currentJob}
              </Text>
              <Flex gap={4}>
                <Tag variant="solid" mt="6px" colorScheme="orange" size="md">
                  <TagLeftIcon as={FaBriefcase} fontSize="12px" />
                  <TagLabel>{data.yearsOfExperienceAsCounselor} years</TagLabel>
                </Tag>
              </Flex>
              <Text fontSize="16px" mt={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Cursus mattis molestie a iaculis at. Purus in mollis nunc sed
                id. Mattis rhoncus urna neque viverra justo nec ultrices. Netus
                et malesuada fames ac.
              </Text>
            </Box>
          </Flex>
        </Box>

        <Box className="details" mt="20px">
          <Box className="box 1" p={4} mr="30px">
            <Flex justifyContent="space-between">
              <Flex gap="2" flexWrap="wrap">
                <Icon as={HiOutlineIdentification} fontSize="24px" />
                <Box>
                  <Text fontSize="16px" fontWeight="semibold">
                    Lisence
                  </Text>
                  <Text> 1234567890 </Text>
                </Box>
              </Flex>

              <Flex gap="2" flexWrap="wrap">
                <Icon as={IoSchoolOutline} fontSize="24px" />
                <Box>
                  <Text fontSize="16px" fontWeight="semibold">
                    Education
                  </Text>
                  <Text> {data.levelOfEducation} </Text>
                </Box>
              </Flex>
            </Flex>
          </Box>

          <Box p={4}>
            <Flex gap="2">
              <Icon as={BsFileEarmark} fontSize="18px" />
              <Box>
                <Text fontSize="16px" fontWeight="semibold">
                  Areas of Focus
                </Text>
                <Tag
                  size="md"
                  colorScheme="orange"
                  variant="subtle"
                  borderRadius="full"
                  mt="6px"
                  mr="6px"
                >
                  <TagLabel>{data.expertiseFields}</TagLabel>
                </Tag>
              </Box>
            </Flex>
          </Box>
        </Box>

        <Box>
          <FormControl id="problem" isRequired>
            <Text fontWeight="semibold" mb={2}>
              Your Problem
            </Text>
            <Input
              placeholder="example: badmood about schools"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
            />
          </FormControl>
        </Box>

        <Box className="jadwal" mt="40px">
          <Stack spacing={3}>
            <Text fontWeight="semibold"> Available Schedules </Text>
            <Select
              placeholder="Book an appoinment"
              size="md"
              value={selectedSchedule}
              onChange={(e) => setSelectedSchedule(e.target.value)}
            >
              {listSchedule
                .filter((item) => !item.isBooked)
                .map((item) => (
                  <option key={item._id} value={item._id}>
                    {new Date(item.date).toDateString()} /{" "}
                    {new Date(item.timeSlots.startTime).toLocaleTimeString()} -{" "}
                    {new Date(item.timeSlots.endTime).toLocaleTimeString()}
                  </option>
                ))}
            </Select>
          </Stack>
        </Box>

        <Box mt="40px">
          <Text textAlign="center" fontWeight="semibold" mb="10px">
            What do you need?
          </Text>
          <Package />
        </Box>

        <Box mt="20px" display="flex" justifyContent="flex-end">
          <Button bg="#FFAC31" color="white" onClick={handleNext}>
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Booking;
