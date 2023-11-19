import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Divider,
  Heading,
  SimpleGrid,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalBody,
  useDisclosure
} from "@chakra-ui/react";

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function CounselingPayment() {
  const goTo = useNavigate();
  const location = useLocation();
  const bookingState = location.state;

  const { isOpen: isSuccessModalOpen, onOpen: onOpenSuccessModal, onClose: onCloseSuccessModal } = useDisclosure();

  const createBooking = async () => {
    axios
      .post(`http://localhost:5000/api/appointment`, bookingState.dataBooking, {
        headers: { "x-access-token": localStorage.getItem("accessToken") },
      })
      .then(() => {
        onOpenSuccessModal();
        setTimeout(() => {
          goTo("done", { state: bookingState.dataBooking.amount });
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box p={"32px"} alignSelf={"center"} mt={8}>
      <Card padding="8px" borderRadius="20px" w="60vh" px="0px">
        <CardHeader>
          <Heading size={"md"} textAlign={"center"}>
            Payment Detail
          </Heading>
        </CardHeader>
        <CardBody>
          <Heading size={"sm"}>Counseling detail</Heading>

          <SimpleGrid columns={2} columnGap={1}>
            <Text>Package</Text>
            <Text>{bookingState.dataBooking.package}</Text>
          </SimpleGrid>

          <SimpleGrid columns={2} columnGap={1}>
            <Text>Date</Text>
            <Text>{new Date(bookingState.dataDate.date).toDateString()}</Text>
          </SimpleGrid>

          <SimpleGrid columns={2} columnGap={1}>
            <Text>Time</Text>
            <Text>
              {new Date(
                bookingState.dataDate.timeSlots.startTime
              ).toLocaleTimeString()}{" "}
              -{" "}
              {new Date(
                bookingState.dataDate.timeSlots.endTime
              ).toLocaleTimeString()}
            </Text>
          </SimpleGrid>

          <SimpleGrid columns={2} columnGap={1}>
            <Text>Problems</Text>
            <Text>{bookingState.dataBooking.userProblem}</Text>
          </SimpleGrid>

          <SimpleGrid columns={2} columnGap={1}>
            <Text>Psycholog</Text>
            <Text>{bookingState.doctorName}</Text>
          </SimpleGrid>

          <Divider
            borderStyle={"dashed"}
            borderColor={"grey"}
            mt={8}
            mb={2}
          ></Divider>
          <SimpleGrid columns={2} columnGap={1}>
            <Heading size={"md"} fontWeight={"bold"}>
              Total
            </Heading>
            <Heading size={"md"} fontWeight={"bold"}>
              IDR {bookingState.dataBooking.amount}
            </Heading>
          </SimpleGrid>

          <Center>
            <Button
              mt={8}
              float={"right"}
              colorScheme="brand"
              onClick={createBooking}
            >
              Confirm and Pay
            </Button>
          </Center>
        </CardBody>
      </Card>

      <Modal
        isOpen={isSuccessModalOpen}
        onClose={onCloseSuccessModal}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Success</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Payment success</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="brand" onClick={onCloseSuccessModal}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default CounselingPayment;
