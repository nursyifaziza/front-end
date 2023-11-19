import {
  Avatar,
  Box,
  Flex,
  Heading,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  Icon,
  Stack,
  FormControl,
  Input,
  Link,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { FiClock, FiCheckCircle, FiLock } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosFemale, IoIosMale } from "react-icons/io";
import { FiMail, FiCalendar, FiPhone } from "react-icons/fi";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { LiaCertificateSolid } from "react-icons/lia";
import { IoSchoolOutline } from "react-icons/io5";
import axios from "axios";
import { ExternalLinkIcon } from "@chakra-ui/icons";

function Detail() {
  // fetching data
  const { id } = useParams();
  const [data, setData] = useState([]);
  const { isOpen: isSuccessModalOpen, onOpen: onOpenSuccessModal, onClose: onCloseSuccessModal } = useDisclosure();
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`http://localhost:5000/api/account/psychologist/${id}`)
        .then((res) => {
          console.log(res.data);
          setData(res.data.data.psychologist);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, [id]);

  // page navigation
  const goTo = useNavigate();

  // handle delete
  function handleDelete(id) {
    const confirmation = window.confirm(
      "Do you want to delete this user? You can't undo this action."
    );
    if (confirmation) {
      axios
        .delete(`http://localhost:5000/api/account/psychologist/${id}`)
        .then((res) => {
          setModalMessage("User deleted.");
          onOpenSuccessModal();
          goTo(`/a/psychologist/`);
        })
        .catch((err) => console.log(err));
    }
  }

  // status
  const Status = () => {
    console.log(data.isVerified)
    if (data.isVerified === true) {
      return (
        <Tag variant="subtle" size="md" colorScheme="green">
          <TagLeftIcon as={FiCheckCircle} />
          <TagLabel> Verified </TagLabel>
        </Tag>
      );
    } else
      return (
        <Tag variant="subtle" size="md" colorScheme="orange">
          <TagLeftIcon as={FiClock} />
          <TagLabel> Pending </TagLabel>
        </Tag>
      );
  };

  // certified
  const Certified = () => {
    if (data.receivedTrainingAsCounselor === true) {
      return (
        <Tag variant="subtle" size="md" colorScheme="orange">
          <TagLeftIcon as={LiaCertificateSolid} />
          <TagLabel> Certified Counselor </TagLabel>
        </Tag>
      );
    } else
      return (
        <Tag variant="subtle" size="md" colorScheme="orange">
          <TagLeftIcon as={FiClock} />
          <TagLabel> Not Certified </TagLabel>
        </Tag>
      );
  };

  // certified 2
  const Checklist = () => {
    if (data.receivedTrainingAsCounselor === true) {
      return <BsCheckCircleFill color="green" />;
    } else return <BsXCircleFill color="red" />;
  };

  // button
  const Approve = () => {
    console.log(id);
    const handleEdit = () => {
      const confirmation = window.confirm(
        "Approve this user? You can't undo this action."
      );
      if (confirmation) {
        axios
          .patch(
            `http://localhost:5000/api/account/psychologist/${id}/activated`,
            { status: true },
            {
              headers: {
                "x-access-token": localStorage.getItem("accessToken"),
              },
            }
          )
          .then((res) => {
            setData(res.data);
            setModalMessage("User approved");
          onOpenSuccessModal();
          })
          .catch((err) => console.log(err));
      }
    };

    if (data.isVerified === true) {
      return (
        <div className="true">
          <Button
            colorScheme="red"
            variant="ghost"
            mr="20px"
            onClick={() => handleDelete(data.id)}
          >
            {" "}
            Delete{" "}
          </Button>
          <Button
            bg="#FFAC31"
            color="white"
            onClick={() => goTo(`/a/psychologist/edit/${id}`)}
          >
            {" "}
            Edit{" "}
          </Button>
        </div>
      );
    } else
      return (
        <div className="false">
          <Button
            colorScheme="red"
            mr="20px"
            variant="ghost"
            onClick={() => handleDelete(data.id)}
          >
            {" "}
            Delete{" "}
          </Button>
          <Button
            bg="#FFAC31"
            color="white"
            onClick={() => handleEdit(data.id)}
          >
            {" "}
            Approve{" "}
          </Button>
        </div>
      );
  };

  return (
    <div className="detail">
      <Box p="24px">
        <Heading size="lg" mb={5}>
          {" "}
          User Detail{" "}
        </Heading>
        <Flex gap={4}>
          <Box>
            <Box
              className="profile"
              border="1px"
              borderColor="gray.200"
              borderRadius="5px"
              bg="white"
              p={5}
            >
              <Flex gap="3" alignItems="center" flexWrap="wrap">
                <Avatar size="lg" src={data.photo} />
                <Stack>
                  <Box>
                    <Text fontSize="lg" fontWeight="semibold">
                      {data.fullName}
                    </Text>
                    <Text mb="4px" color="gray.500" fontSize="md">
                      {" "}
                      {data.currentJob}{" "}
                    </Text>
                    <Flex gap="6px">
                      <Status />
                      <Certified />
                    </Flex>
                  </Box>
                </Stack>
              </Flex>
            </Box>

            <Box
              className="personal info"
              mt="16px"
              border="1px"
              borderColor="gray.200"
              borderRadius="5px"
              bg="white"
              p={5}
            >
              <Text fontSize="lg" fontWeight="bold" color="gray.300" mb="6px">
                {" "}
                Personal Information{" "}
              </Text>

              <Text color="gray.400" fontWeight="semibold">
                {" "}
                Full Name{" "}
              </Text>
              <FormControl mb={5}>
                <Input
                  size="md"
                  variant="unstyled"
                  readOnly
                  value={data.fullName}
                />
              </FormControl>

              <Text color="gray.400" fontWeight="semibold">
                {" "}
                Gender{" "}
              </Text>
              <Flex alignItems="center" mb={5}>
                <Icon
                  mr="6px"
                  as={data.gender === "Female" ? IoIosFemale : IoIosMale}
                />
                <Text> {data.gender} </Text>
              </Flex>

              <Text color="gray.400" fontWeight="semibold">
                {" "}
                Date of Birth{" "}
              </Text>
              <Flex alignItems="center" mb={5}>
                <Icon mr="8px" as={FiCalendar} />
                <Input
                  size="md"
                  type="datetime-local"
                  value={data.dateOfBirth}
                  readOnly
                  variant="unstyled"
                />
              </Flex>

              <Text color="gray.400" fontWeight="semibold">
                {" "}
                Address{" "}
              </Text>
              <Box mb={5}>
                <Text mb="3px" color="gray.400">
                  {" "}
                  City of District
                </Text>
                <FormControl>
                  <Input
                    size="md"
                    maxW="180px"
                    variant="unstyled"
                    readOnly
                    value={data.cityOfDistrict}
                  />
                </FormControl>

                <Text mt="3px" mb="3px" color="gray.400">
                  {" "}
                  City of Residence
                </Text>
                <FormControl>
                  <Input
                    size="md"
                    maxW="180px"
                    variant="unstyled"
                    readOnly
                    value={data.cityOfResidence}
                  />
                </FormControl>
              </Box>

              <Text color="gray.400" fontWeight="semibold">
                {" "}
                Phone Number{" "}
              </Text>
              <Flex alignItems="center">
                <Icon as={FiPhone} mr="8px" />
                <FormControl>
                  <Input
                    size="md"
                    variant="unstyled"
                    readOnly
                    value={data.whatsappNo}
                  />
                </FormControl>
              </Flex>

              <Text
                fontSize="lg"
                fontWeight="bold"
                color="gray.300"
                mb="6px"
                mt={5}
              >
                {" "}
                Credentials{" "}
              </Text>
              <Text color="gray.400" fontWeight="semibold">
                {" "}
                Email{" "}
              </Text>
              <Flex alignItems="center" mb={5}>
                <Icon as={FiMail} mr="8px" />
                <FormControl>
                  <Input
                    size="md"
                    variant="unstyled"
                    readOnly
                    value={data.email}
                  />
                </FormControl>
              </Flex>

              <Text color="gray.400" fontWeight="semibold">
                {" "}
                Password{" "}
              </Text>
              <Flex alignItems="center">
                <Icon as={FiLock} mr="8px" />
                <FormControl>
                  <Input
                    size="md"
                    variant="unstyled"
                    readOnly
                    value={data.password}
                  />
                </FormControl>
              </Flex>

              <Box display="flex" ml="auto" mt={9}>
                <Approve />
              </Box>
            </Box>
          </Box>

          <Box
            className="professional"
            border="1px"
            borderColor="gray.200"
            borderRadius="5px"
            bg="white"
            p={5}
          >
            <Text fontSize="lg" fontWeight="bold" color="gray.300" mb="6px">
              {" "}
              Services Offered{" "}
            </Text>

            <Flex alignItems="center" gap={4} mb={3}>
              <Text fontWeight="semibold"> Certified Counselor</Text>
              <Checklist />
            </Flex>

            <Text color="gray.400" fontWeight="semibold" mb="3px">
              {" "}
              Devices{" "}
            </Text>
            <Flex flexWrap="wrap" gap={2} mb={4}>
              {data.deviceUsed &&
                data.deviceUsed.map((device, index) => (
                  <Tag
                    key={index}
                    size="md"
                    colorScheme="orange"
                    variant="outline"
                    borderRadius="full"
                  >
                    <TagLabel>{device}</TagLabel>
                  </Tag>
                ))}
            </Flex>

            <Text color="gray.400" fontWeight="semibold" mb="3px">
              {" "}
              Counseling Method{" "}
            </Text>
            <Flex alignItems="center" gap={2}>
              {data.counselingMethod && (
                <Tag
                  size="md"
                  colorScheme="orange"
                  variant="outline"
                  borderRadius="full"
                >
                  <TagLabel>{data.counselingMethod}</TagLabel>
                </Tag>
              )}
            </Flex>

            <Text
              fontSize="lg"
              fontWeight="bold"
              color="gray.300"
              mb="6px"
              mt="30px"
            >
              {" "}
              Professional Experience{" "}
            </Text>
            <Text color="gray.400" fontWeight="semibold">
              {" "}
              Current Job{" "}
            </Text>
            <FormControl mb={4}>
              <Input
                size="md"
                variant="unstyled"
                readOnly
                value={data.currentJob}
              />
            </FormControl>

            <Text color="gray.400" fontWeight="semibold">
              {" "}
              Years in Practice{" "}
            </Text>
            <Text mb={4}> {data.yearsOfExperienceAsCounselor} years </Text>
            {/* <FormControl>
              <NumberInput readOnly value={data.yearsOfExperienceAsCounselor}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl> */}

            {/*pake icon ceklis di ujung */}
            {/* <Text color='gray.400' fontWeight='semibold'> Certified Counselor </Text>
              <Text mb={4}> {data.receivedTrainingAsCounselor} </Text>
              <Checklist />
              <Select>
                <option> Yes </option>
                <option> No </option>
              </Select> */}

            <Text color="gray.400" fontWeight="semibold">
              {" "}
              Education{" "}
            </Text>
            <Flex alignItems="center" gap={2} mb={4}>
              <IoSchoolOutline />
              <Text> {data.levelOfEducation} </Text>
            </Flex>

            <Text color="gray.400" fontWeight="semibold" mb="3px">
              {" "}
              Areas of Focus{" "}
            </Text>
            <Flex flexWrap="wrap" gap={2} mb={4}>
              {data.expertiseFields && (
                <Tag
                  size="md"
                  colorScheme="orange"
                  variant="outline"
                  borderRadius="full"
                >
                  <TagLabel>{data.expertiseFields}</TagLabel>
                </Tag>
              )}
            </Flex>

            <Text color="gray.400" fontWeight="semibold" mb="3px">
              {" "}
              Language Mastered{" "}
            </Text>
            <Flex flexWrap="wrap" gap={2} mb={5}>
              {data.languagesMastered && (
                <Tag
                  size="md"
                  colorScheme="orange"
                  variant="outline"
                  borderRadius="full"
                >
                  <TagLabel>{data.languagesMastered}</TagLabel>
                </Tag>
              )}
            </Flex>

            <Text color="gray.400" fontWeight="semibold" mb="3px">
              {" "}
              Education Certificate{" "}
            </Text>
            <Box mb={4}>
              <Link href={data.bachelorCertificate} isExternal>
                {" "}
                {data.fullName} <ExternalLinkIcon mx="2px" />
              </Link>
            </Box>

            <Text color="gray.400" fontWeight="semibold" mb="3px">
              {" "}
              Certificates{" "}
            </Text>
            <Box mb={4}>
              <Flex flexWrap="wrap" gap={2}>
                {data.certificates &&
                  data.certificates.map((certificate, index) => (
                    <Link href={certificate} key={index} isExternal>
                      Certificate {index + 1} <ExternalLinkIcon mx="3px" />
                    </Link>
                  ))}
              </Flex>
            </Box>

            <Text color="gray.400" fontWeight="semibold" mb="3px">
              {" "}
              CV{" "}
            </Text>
            <Box>
              <Link href={data.cv} isExternal>
                {" "}
                CV <ExternalLinkIcon mx="2px" />
              </Link>
            </Box>
          </Box>
        </Flex>
      </Box>

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
            <Text>{modalMessage}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="brand" onClick={onCloseSuccessModal}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Detail;
