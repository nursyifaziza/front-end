import {
  Avatar,
  Box,
  Flex,
  Heading,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Link,
  Button,
  RadioGroup,
  HStack,
  Radio,
  TagCloseButton,
  IconButton,
  Checkbox,
  CheckboxGroup,
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
import { FiMail, FiCalendar, FiPhone } from "react-icons/fi";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { LiaCertificateSolid } from "react-icons/lia";
import { IoSchoolOutline } from "react-icons/io5";
import axios from "axios";
import { ExternalLinkIcon, DeleteIcon } from "@chakra-ui/icons";

function Edit() {
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
          setData(res.data.data.psychologist);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

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
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          goTo(`/a/psychologist/`);
        })
        .catch((err) => console.log(err));
    }
  }

  // handle submit
  function handleSubmit(event) {
    event.preventDefault();
    axios
      .put(`http://localhost:5000/api/account/psychologist/${id}`, data)
      .then((res) => {
        setModalMessage("User updated successfully!");
        onOpenSuccessModal();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        goTo(`/a/psychologist`);
      })
      .catch((err) => console.log(err));
  }

  // status
  const Status = () => {
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

  //
  const [input, setInput] = useState({
    languagesMastered: "",
    expertiseFields: "",
    cv: "",
    bachelorCertificate: "",
    certificates: "",
  });

  function handleNewItem(event) {
    event.preventDefault();
    console.log(input);

    axios
      .post("http://localhost:8000/counselors/${id}", input)
      .then((res) => {
        setModalMessage("User updated successfully!");
        onOpenSuccessModal();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => console.log(err));
  }

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

            <form onSubmit={handleSubmit}>
              <Box
                className="personal info"
                mt={4}
                border="1px"
                borderColor="gray.200"
                borderRadius="5px"
                bg="white"
                p={5}
              >
                <Box>
                  <Stack spacing={5}>
                    <Text fontSize="lg" fontWeight="bold" color="gray.300">
                      {" "}
                      Personal Information{" "}
                    </Text>

                    <Box className="name">
                      <Text mb={1} color="gray.400" fontWeight="semibold">
                        {" "}
                        Full Name{" "}
                      </Text>
                      <FormControl>
                        <Input
                          size="md"
                          variant="outline"
                          value={data.fullName}
                          onChange={(e) =>
                            setData({ ...data, fullName: e.target.value })
                          }
                        />
                      </FormControl>
                    </Box>

                    <Box className="gender">
                      <FormControl>
                        <FormLabel
                          mb={1}
                          color="gray.400"
                          fontWeight="semibold"
                        >
                          {" "}
                          Gender{" "}
                        </FormLabel>
                        <RadioGroup
                          value={data.gender}
                          onChange={(value) =>
                            setData({ ...data, gender: value })
                          }
                        >
                          <HStack spacing="20px">
                            <Radio value="Male"> Male </Radio>
                            <Radio value="Female"> Female </Radio>
                          </HStack>
                        </RadioGroup>
                      </FormControl>
                    </Box>

                    <Box className="dob">
                      <Text mb={1} color="gray.400" fontWeight="semibold">
                        {" "}
                        Date of Birth{" "}
                      </Text>
                      <InputGroup>
                        <InputLeftElement>
                          <FiCalendar />
                        </InputLeftElement>
                        <Input
                          size="md"
                          type="datetime-local"
                          value={data.dateOfBirth}
                          variant="outline"
                          onChange={(e) =>
                            setData({ ...data, dateOfBirth: e.target.value })
                          }
                        />
                      </InputGroup>
                    </Box>

                    <Box className="address">
                      <Text mb={1} color="gray.400" fontWeight="semibold">
                        {" "}
                        Address{" "}
                      </Text>
                      <Stack spacing={4}>
                        <Box>
                          <Text color="gray.400"> City of District </Text>
                          <FormControl>
                            <Input
                              size="md"
                              variant="outline"
                              value={data.cityOfDistrict}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  cityOfDistrict: e.target.value,
                                })
                              }
                            />
                          </FormControl>
                        </Box>
                        <Box>
                          <Text color="gray.400"> City of Residence</Text>
                          <FormControl>
                            <Input
                              size="md"
                              variant="outline"
                              value={data.cityOfResidence}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  cityOfResidence: e.target.value,
                                })
                              }
                            />
                          </FormControl>
                        </Box>
                      </Stack>
                    </Box>

                    <Box className="number">
                      <Text mb={1} color="gray.400" fontWeight="semibold">
                        {" "}
                        Phone Number{" "}
                      </Text>
                      <InputGroup>
                        <InputLeftElement>
                          <FiPhone />
                        </InputLeftElement>
                        <Input
                          size="md"
                          variant="outline"
                          value={data.whatsappNo}
                          onChange={(e) =>
                            setData({ ...data, whatsappNo: e.target.value })
                          }
                        />
                      </InputGroup>
                    </Box>

                    <Box className="credentials">
                      <Text
                        mb={1}
                        fontSize="lg"
                        fontWeight="bold"
                        color="gray.300"
                        mt={4}
                      >
                        {" "}
                        Credentials{" "}
                      </Text>
                      <Stack spacing={4}>
                        <Box className="email">
                          <Text color="gray.400" fontWeight="semibold">
                            {" "}
                            Email{" "}
                          </Text>
                          <InputGroup>
                            <InputLeftElement>
                              <FiMail />
                            </InputLeftElement>
                            <Input
                              size="md"
                              variant="outline"
                              value={data.email}
                            />
                          </InputGroup>
                        </Box>

                        <Box className="password">
                          <Text mb={1} color="gray.400" fontWeight="semibold">
                            {" "}
                            Password{" "}
                          </Text>
                          <InputGroup>
                            <InputLeftElement>
                              <FiLock />
                            </InputLeftElement>
                            <Input
                              size="md"
                              variant="outline"
                              value={data.password}
                            />
                          </InputGroup>
                        </Box>
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </form>
          </Box>

          <Box>
            <form onSubmit={handleSubmit}>
              <Box
                className="professional"
                border="1px"
                borderColor="gray.200"
                borderRadius="5px"
                bg="white"
                p={5}
              >
                <Box>
                  <Stack spacing={6}>
                    <Box className="services">
                      <Text fontSize="lg" fontWeight="bold" color="gray.300">
                        {" "}
                        Services Offered{" "}
                      </Text>
                      <FormControl>
                        <FormLabel mb={1} fontWeight="semibold">
                          {" "}
                          Certified counselor?{" "}
                        </FormLabel>
                        <RadioGroup
                          value={data.receivedTrainingAsCounselor}
                          onChange={(value) =>
                            setData({
                              ...data,
                              receivedTrainingAsCounselor: value,
                            })
                          }
                        >
                          <HStack spacing="20px">
                            <Radio value={true}> Yes </Radio>
                            <Radio value={false}> No </Radio>
                          </HStack>
                        </RadioGroup>
                      </FormControl>
                    </Box>

                    <Box className="devices">
                      <Text mb={1} color="gray.400" fontWeight="semibold">
                        {" "}
                        Devices{" "}
                      </Text>
                      <CheckboxGroup
                        value={data.deviceUsed}
                        onChange={(value) =>
                          setData({ ...data, deviceUsed: value })
                        }
                      >
                        <Stack spacing={[1, 5]} direction={["column", "row"]}>
                          <Checkbox value="Laptop"> Laptop </Checkbox>
                          <Checkbox value="Smartphone"> Smartphone </Checkbox>
                          <Checkbox value="Desktop"> Desktop </Checkbox>
                          <Checkbox value="Tablet"> Tablet </Checkbox>
                        </Stack>
                      </CheckboxGroup>
                    </Box>

                    <Box className="method">
                      <Text color="gray.400" fontWeight="semibold" mb={1}>
                        {" "}
                        Counseling Method{" "}
                      </Text>
                      <CheckboxGroup
                        value={data.counselingMethod}
                        onChange={(value) =>
                          setData({ ...data, counselingMethod: value })
                        }
                      >
                        <Stack spacing={[1, 5]} direction={["column", "row"]}>
                          <Checkbox value="Video Call"> Video Call </Checkbox>
                          <Checkbox value="Voice Call"> Voice Call </Checkbox>
                          <Checkbox value="Chat"> Chat </Checkbox>
                        </Stack>
                      </CheckboxGroup>
                    </Box>

                    <Box className="professional">
                      <Text
                        mb={1}
                        fontSize="lg"
                        fontWeight="bold"
                        color="gray.300"
                      >
                        {" "}
                        Professional Experience{" "}
                      </Text>
                      <Stack spacing={4}>
                        <Box className="current-job">
                          <Text color="gray.400" fontWeight="semibold">
                            {" "}
                            Current Job{" "}
                          </Text>
                          <FormControl>
                            <Input
                              size="md"
                              variant="outline"
                              value={data.currentJob}
                              onChange={(e) =>
                                setData({ ...data, currentJob: e.target.value })
                              }
                            />
                          </FormControl>
                        </Box>

                        <Box className="years">
                          <Text color="gray.400" mb={1} fontWeight="semibold">
                            {" "}
                            Years in Practice{" "}
                          </Text>
                          <HStack spacing={3}>
                            <FormControl>
                              <NumberInput
                                value={data.yearsOfExperienceAsCounselor}
                                onChange={(value) =>
                                  setData({
                                    ...data,
                                    yearsOfExperienceAsCounselor: value,
                                  })
                                }
                                size="sm"
                                w="200px"
                              >
                                <NumberInputField />
                                <NumberInputStepper>
                                  <NumberIncrementStepper />
                                  <NumberDecrementStepper />
                                </NumberInputStepper>
                              </NumberInput>
                            </FormControl>
                          </HStack>
                        </Box>

                        <Box className="education">
                          <Text mb={1} color="gray.400" fontWeight="semibold">
                            {" "}
                            Education{" "}
                          </Text>
                          <InputGroup>
                            <InputLeftElement>
                              <IoSchoolOutline />
                            </InputLeftElement>
                            <Input
                              size="md"
                              variant="outline"
                              value={data.levelOfEducation}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  levelOfEducation: e.target.value,
                                })
                              }
                            />
                          </InputGroup>
                        </Box>

                        <Box className="areas">
                          <Text color="gray.400" fontWeight="semibold" mb={1}>
                            {" "}
                            Areas of Focus{" "}
                          </Text>
                          <HStack spacing={2}>
                            {data.expertiseFields && (
                              <Tag
                                size="md"
                                colorScheme="orange"
                                variant="outline"
                                borderRadius="full"
                                mb={3}
                              >
                                <TagLabel> {data.expertiseFields} </TagLabel>
                                <TagCloseButton />
                              </Tag>
                            )}
                          </HStack>

                          <HStack spacing={3}>
                            <FormControl>
                              <Input
                                size="sm"
                                variant="outline"
                                placeholder="Add another topics of your expertise"
                              />
                            </FormControl>

                            <Button size="sm" bg="#FFAC31" color="white">
                              {" "}
                              Add{" "}
                            </Button>
                          </HStack>
                        </Box>

                        <Box className="language">
                          <Text color="gray.400" fontWeight="semibold" mb={1}>
                            {" "}
                            Language Mastered{" "}
                          </Text>
                          <HStack spacing={2}>
                            {data.languagesMastered && (
                              <Tag
                                size="md"
                                colorScheme="orange"
                                variant="outline"
                                borderRadius="full"
                                mb={3}
                              >
                                <TagLabel> {data.languagesMastered} </TagLabel>
                                <TagCloseButton />
                              </Tag>
                            )}
                          </HStack>

                          <HStack spacing={3}>
                            <FormControl>
                              <Input
                                size="sm"
                                variant="outline"
                                placeholder="Add another languages"
                              />
                            </FormControl>

                            <Button size="sm" bg="#FFAC31" color="white">
                              {" "}
                              Add{" "}
                            </Button>
                          </HStack>
                        </Box>

                        <Box className="edu-certif">
                          <Text color="gray.400" fontWeight="semibold" mb={1}>
                            {" "}
                            Education Certificate{" "}
                          </Text>
                          <HStack spacing={6}>
                            <Link href={data.bachelorCertificate} isExternal>
                              {data.fullName} <ExternalLinkIcon mx="2px" />
                            </Link>

                            <IconButton
                              aria-label="delete"
                              icon={<DeleteIcon />}
                            />
                          </HStack>
                          <HStack spacing={3}>
                            <FormControl>
                              <Input
                                size="sm"
                                variant="outline"
                                placeholder="Add your certificate"
                              />
                            </FormControl>

                            <Button size="sm" bg="#FFAC31" color="white">
                              {" "}
                              Add{" "}
                            </Button>
                          </HStack>
                        </Box>

                        <Box className="certificate">
                          <Text color="gray.400" fontWeight="semibold" mb={1}>
                            {" "}
                            Certificates{" "}
                          </Text>
                          <HStack spacing={4}>
                            {data.certificates &&
                              data.certificates.map((certificate, index) => (
                                <Link href={certificate} key={index} isExternal>
                                  Certificate {index + 1}{" "}
                                  <ExternalLinkIcon mx="3px" />
                                  <IconButton
                                    aria-label="delete"
                                    icon={<DeleteIcon />}
                                  />
                                </Link>
                              ))}
                          </HStack>
                          <HStack spacing={3}>
                            <FormControl>
                              <Input
                                size="sm"
                                variant="outline"
                                placeholder="Add your certificate"
                              />
                            </FormControl>

                            <Button size="sm" bg="#FFAC31" color="white">
                              {" "}
                              Add{" "}
                            </Button>
                          </HStack>
                        </Box>

                        <Box className="cv">
                          <Text color="gray.400" fontWeight="semibold" mb={1}>
                            {" "}
                            CV{" "}
                          </Text>
                          <HStack spacing={6}>
                            <Link href={data.cv} isExternal>
                              CV <ExternalLinkIcon mx="2px" />
                            </Link>

                            <IconButton
                              aria-label="delete"
                              icon={<DeleteIcon />}
                            />
                          </HStack>
                          <HStack spacing={3}>
                            <FormControl>
                              <Input
                                size="sm"
                                variant="outline"
                                placeholder="Add your CV"
                              />
                            </FormControl>

                            <Button size="sm" bg="#FFAC31" color="white">
                              {" "}
                              Add{" "}
                            </Button>
                          </HStack>
                        </Box>

                        <Box
                          className="button"
                          display="flex"
                          ml="auto"
                          gap={4}
                          mt={10}
                        >
                          <Button
                            colorScheme="red"
                            variant="ghost"
                            onClick={() => handleDelete(data.id)}
                          >
                            {" "}
                            Delete{" "}
                          </Button>
                          <Button bg="#FFAC31" color="white" type="submit">
                            {" "}
                            Save{" "}
                          </Button>
                        </Box>
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </form>
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

export default Edit;
