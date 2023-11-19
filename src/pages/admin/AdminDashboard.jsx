import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { FiMail, FiCalendar, FiPhone, FiUsers, FiClock } from "react-icons/fi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  

  // cell component
  const Status = ({ row }) => {
    if (row.paymentTime !== null) {
      return (
        <Tag variant="subtle" size="sm" colorScheme="green">
          <TagLeftIcon as={FiCalendar} />
          <TagLabel> Scheduled </TagLabel>
        </Tag>
      );
    } else
      return (
        <Tag variant="subtle" size="sm" colorScheme="orange">
          <TagLeftIcon as={FiClock} />
          <TagLabel> Pending </TagLabel>
        </Tag>
      );
  };

  // handle delete
  function handleDelete(id) {
    const confirmation = window.confirm(
      "Do you want to delete this order? You can't undo this action."
    );
    if (confirmation) {
      axios
        .delete(`http://localhost:5000/api/appointment/${id}`)
        .then((res) => {
          setModalMessage("Order deleted.");
          setModalOpen(true);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => console.log(err));
    }
  }

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
  

  // action button
  const ActionButton = ({ row }) => {
    return (
      <div className="button">
        <Button
          mr="10px"
          height={7}
          width="60px"
          fontSize="sm"
          colorScheme="red"
          onClick={() => handleDelete(row._id)}
        >
          Delete
        </Button>
        <Link to={`/a/psychologist/book/${row._id}`}>
          <Button height={7} fontSize="sm" color="white" bg="#FFAC31">
            View
          </Button>
        </Link>
      </div>
    );
  };

  // table custom style
  const style = {
    headCells: {
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        borderTop: "solid 1px #EBEBEB",
      },
    },
  };

  const column = [
    {
      name: "ID",
      selector: (row) => row._id,
      sortable: true,
      width: "70px",
    },
    {
      name: "Order Time",
      selector: (row) => row.orderTime,
      width: "150px",
    },
    {
      name: "User",
      selector: (row) => row.userId,
      sortable: true,
    },
    {
      name: "Psychologyst",
      selector: (row) => row.psychologistId,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => <Status row={row} />,
      width: "200px",
    },
    {
      name: "Action",
      cell: (row) => <ActionButton row={row} />,
    },
  ];

  // fetching API
  const [appointmentData, setAppointmentData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [counselorData, setCounselorData] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [counselorCount, setCounselorCount] = useState(0);

  const fetchUser = async () => {
    try {
      const userResponse = await axios.get(
        `http://localhost:5000/api/account/user`
      );
      setUserData(userResponse.data.data.users);
      setUserCount(userResponse.data.data.users.length);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPsychologist = async () => {
    try {
      const counselorResponse = await axios.get(
        `http://localhost:5000/api/account/psychologist`
      );
      setCounselorData(counselorResponse.data.data.psychologists);
      setCounselorCount(counselorResponse.data.data.psychologists.length);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAppointment = async () => {
    try {
      const appointmentResponse = await axios.get(
        `http://localhost:5000/api/appointment`,
        {
          headers: { "x-access-token": localStorage.getItem("accessToken") },
        }
      );
      setAppointmentData(appointmentResponse.data.data.appointments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchPsychologist();
    fetchAppointment();
  }, []);

  return (
    <div className="dashboard">
      <Box p="24px">
        <Heading size="lg" mb={"5"}>
          Dashboard
        </Heading>
        <Box
          p={5}
          className="users-amount"
          border="1px"
          borderColor="gray.200"
          borderRadius="5px"
        >
          <Flex gap={3}>
            <Box
              bg="#FFAC31"
              w="50%"
              p={5}
              boxShadow="base"
              rounded="md"
              className="user"
            >
              <Box display="flex" justifyContent="center">
                <Text fontSize="60px" color="white" fontWeight="semibold">
                  {userCount}
                </Text>
              </Box>
              <Box className="body" display="flex" justifyContent="center">
                <Text color="white" fontSize="lg">
                  Registered Users
                </Text>
              </Box>
            </Box>

            <Box
              bg="blue.300"
              w="50%"
              p={5}
              boxShadow="base"
              rounded="md"
              className="konselor"
            >
              <Box display="flex" justifyContent="center">
                <Text fontSize="60px" color="white" fontWeight="semibold">
                  {counselorCount}
                </Text>
              </Box>
              <Box className="body" display="flex" justifyContent="center">
                <Text color="white" fontSize="lg">
                  Registered Psychologists
                </Text>
              </Box>
            </Box>
          </Flex>

          <Box
            className="table"
            boxShadow="base"
            rounded="md"
            bg="white"
            mt={8}
          >
            <DataTable
              columns={column}
              data={appointmentData}
              pagination
              customStyles={style}
            />
          </Box>
        </Box>

        <ModalComponent />
      </Box>
    </div>
  );
}

export default AdminDashboard;
