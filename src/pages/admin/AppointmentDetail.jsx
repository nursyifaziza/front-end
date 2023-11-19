import {
  Box,
  Flex,
  Heading,
  Avatar,
  Text,
  Tag,
  TagLeftIcon,
  TagLabel,
  Icon,
  Stack,
  HStack,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FiMail, FiCalendar, FiPhone, FiUsers, FiClock } from "react-icons/fi";
import { BsArrowLeftRight } from "react-icons/bs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";

function AppointmentDetail() {
  const goTo = useNavigate();
  // fetching API
  const { id } = useParams();
  const [data, setData] = useState();
  const [linkSession, setLinkSession] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const fetchData = async () => {
    axios
      .get(`http://localhost:5000/api/appointment/detail/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const updateLinkSession = async () => {
    axios
      .put(`http://localhost:5000/api/appointment/${id}`, {
        linkSession: linkSession,
      })
      .then((res) => {
        setModalMessage(res.data.message);
        setModalOpen(true);
        setTimeout(() => {
          goTo("/a");
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const ModalComponent = () => {
    return (
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Success</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{modalMessage}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="brand" onClick={() => setModalOpen(false)}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  //status
  const Status = () => {
    if (data && data.paymentTime !== null) {
      return (
        <Tag variant="subtle" size="md" colorScheme="green">
          <TagLeftIcon as={FiCalendar} />
          <TagLabel> Scheduled </TagLabel>
        </Tag>
      );
    } else
      return (
        <Tag variant="subtle" size="md" colorScheme="orange">
          <TagLeftIcon as={FiClock} />
          <TagLabel> Waiting for Payment </TagLabel>
        </Tag>
      );
  };

  // input link
  //   const [input, setInput] = useState({ link: "" });
  //   function handleSubmit(event) {
  //     event.preventDefault();
  //     console.log(input);

  // axios
  //   .post(`http://localhost:8000/appointment/${id}`, { ...data, ...input })
  //   .then((res) => {
  //     alert("Link added successfully.");
  //   })
  //   .catch((err) => console.log(err));
  //   }

  return (
    <div className="detail">
      {/* <form onSubmit={handleSubmit}> */}
      <form>
        <Box p="24px">
          <Heading size="lg" mb={"5"}>
            Order Details
          </Heading>
          <Box
            p={5}
            border="1px"
            borderColor="gray.200"
            borderRadius="5px"
            bg="white"
          >
            <Flex alignItems="center" justifyContent="space-evenly">
              <Box className="user" p={3}>
                <Flex alignItems="center" flexWrap="wrap" gap={3}>
                  {data && data.userImage && (
                    <Avatar size="lg" src={data.userImage} />
                  )}
                  <Box>
                    {data && data.userId.fullName && (
                      <Text fontSize="md" fontWeight="semibold" mb="4px">
                        {data.userId.fullName}
                      </Text>
                    )}
                    <Status />
                  </Box>
                </Flex>
              </Box>

              <Box>
                <Icon fontSize="24px" as={BsArrowLeftRight} />
              </Box>

              <Box className="konselor" p={3}>
                <Flex alignItems="center" flexWrap="wrap" gap={3}>
                  {data && data.counselorImage && (
                    <Avatar size="lg" src={data.counselorImage} />
                  )}
                  <Box>
                    {data && data.psychologistId.fullName && (
                      <Text fontSize="md" fontWeight="semibold" mb="4px">
                        {data.psychologistId.fullName}
                      </Text>
                    )}
                    {data && data.psychologistId.currentJob && (
                      <Text fontSize="md">
                        {data.psychologistId.currentJob}
                      </Text>
                    )}
                  </Box>
                </Flex>
              </Box>
            </Flex>

            <Box mt={3} p={5} borderTop="1px" borderColor="gray.200">
              <Box>
                <Flex justifyContent="space-between">
                  <Box className="order" pl={8} pr={8}>
                    <Text
                      fontSize="lg"
                      fontWeight="semibold"
                      color="gray.400"
                      mb={1}
                    >
                      Order Details
                    </Text>
                    <HStack spacing={30}>
                      <Box>
                        <Stack spacing={2}>
                          <Text fontWeight="semibold"> Order Time </Text>
                          <Text fontWeight="semibold"> Payment Time </Text>
                          <Text fontWeight="semibold"> Amount </Text>
                        </Stack>
                      </Box>
                      <Box>
                        <Stack spacing={2}>
                          {data && data.orderTime && (
                            <Text>
                              {" "}
                              {new Date(data.orderTime).toDateString()}{" "}
                            </Text>
                          )}
                          {data && data.paymentTime && (
                            <Text>
                              {" "}
                              {new Date(data.paymentTime).toDateString()}{" "}
                            </Text>
                          )}
                          {data && data.amount && (
                            <Text> Rp {data.amount} </Text>
                          )}
                        </Stack>
                      </Box>
                    </HStack>
                  </Box>
                  <Box pl={8} pr="130px">
                    <Text
                      fontSize="lg"
                      fontWeight="semibold"
                      color="gray.400"
                      mb={1}
                    >
                      Appointment Details
                    </Text>
                    <HStack spacing={30}>
                      <Box>
                        <Stack spacing={2}>
                          <Text fontWeight="semibold"> Package </Text>
                          <Text fontWeight="semibold"> Date </Text>
                          <Text fontWeight="semibold"> Time </Text>
                        </Stack>
                      </Box>
                      <Box>
                        <Stack spacing={2}>
                          {data && data.package && (
                            <Text> {data.package} </Text>
                          )}
                          {data && data.scheduleId.date && (
                            <Text>
                              {" "}
                              {new Date(
                                data.scheduleId.date
                              ).toDateString()}{" "}
                            </Text>
                          )}
                          <HStack>
                            {data && data.scheduleId.timeSlots.startTime && (
                              <Text>
                                {new Date(
                                  data.scheduleId.timeSlots.startTime
                                ).toLocaleTimeString()}{" "}
                                -{" "}
                              </Text>
                            )}
                            {data && data.scheduleId.timeSlots.endTime && (
                              <Text>
                                {" "}
                                {new Date(
                                  data.scheduleId.timeSlots.endTime
                                ).toLocaleTimeString()}{" "}
                              </Text>
                            )}
                          </HStack>
                        </Stack>
                      </Box>
                    </HStack>
                  </Box>
                </Flex>
              </Box>

              <Box mt={6} p={5} borderTop="1px" borderColor="gray.200">
                {data && data.linkSession ? (
                  <Box>
                    <Text
                      fontSize="lg"
                      fontWeight="semibold"
                      color="gray.400"
                      mb={1}
                    >
                      This link for this appointment
                    </Text>
                    <Text>{data.linkSession}</Text>
                  </Box>
                ) : (
                  <Box>
                    <Text
                      fontSize="lg"
                      fontWeight="semibold"
                      color="gray.400"
                      mb={1}
                    >
                      Add link for this appointment
                    </Text>
                    <Text> Link </Text>
                    <HStack>
                      <Input
                        w="400px"
                        onChange={(e) => setLinkSession(e.target.value)}
                      />
                    </HStack>
                  </Box>
                )}
              </Box>
              <Flex justifyContent="flex-end">
                <Box mt={6} p={5}>
                  {data && data.linkSession ? (
                    <Link to={`/a`}>
                      <Button colorScheme="orange" variant="solid">
                        Close
                      </Button>
                    </Link>
                  ) : (
                    <HStack spacing={3}>
                      <Link to={`/a`}>
                        <Button colorScheme="red" variant="ghost">
                          Cancel
                        </Button>
                      </Link>
                      <Button
                        colorScheme="orange"
                        type="button"
                        onClick={updateLinkSession}
                      >
                        Save
                      </Button>
                    </HStack>
                  )}
                </Box>
              </Flex>
            </Box>
          </Box>
        </Box>
      </form>
      <ModalComponent />
    </div>
  );
}

export default AppointmentDetail;
