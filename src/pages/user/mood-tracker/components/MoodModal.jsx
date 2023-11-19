import {
  Container,
  Heading,
  HStack,
  VStack,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Wrap,
  WrapItem,
  Tag,
  Text,
  Textarea,
  useDisclosure
} from "@chakra-ui/react";

import listmood from "./listmood";

import { useState } from "react";
import TagSelect from "./TagSelect";
import IconMood from "./IconMood";

const listSocial = ["Family", "Friends", "Relationship", "Colleagues"];
const listActivities = [
  "Studying",
  "Working",
  "Exercise",
  "Trip",
  "Watching",
  "Date",
  "Shopping",
  "Game",
  "Movies",
];

export const MoodModal = ({
  isOpen,
  onClose,
  moodChoose,
  setMoodChoose,
  modalAction,
  idMood,
}) => {
  const [selectedSocials, setSelectedSocials] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [textareaValue, setTextareaValue] = useState("");
  const { isOpen: isSuccessModalOpen, onOpen: onOpenSuccessModal, onClose: onCloseSuccessModal } = useDisclosure();
  const { isOpen: isErrorModalOpen, onOpen: onOpenErrorModal, onClose: onCloseErrorModal } = useDisclosure();
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async () => {
    const dataMood = {
      moodValue: moodChoose,
      social: selectedSocials,
      activities: selectedActivities,
      moodNote: textareaValue,
    };

    let methodAction;
    let url;
    if (modalAction == "edit") {
      methodAction = "PUT";
      url = "http://localhost:5000/api/user/moodentries/" + idMood;
    } else {
      methodAction = "POST";
      url = "http://localhost:5000/api/user/moodentries";
    }

    try {
      const response = await fetch(url, {
        method: methodAction,
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataMood),
      });

      const data = await response.json();
      if (data.success) {
          setModalMessage("Your mood entry saved successfully.");
          if (methodAction == "PUT") {
            setModalMessage("Your mood entry updated.");
          }
          onOpenSuccessModal();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
      }
    } catch (error) {
      setModalMessage(error.message);
      onOpenErrorModal();
    }
  };


  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        size={"xl"}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>How are your feeling</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack>
              <Container p={0}>
                <Heading size={"md"} fontWeight={"medium"} mb={5}>
                  Rate your mood
                </Heading>
                <HStack spacing={"32px"} justify={"center"} mb={5}>
                  {listmood.map((item, index) => (
                    <IconMood
                      key={index}
                      item={item}
                      size={"60px"}
                      moodChoose={moodChoose}
                      onClickMood={setMoodChoose}
                    />
                  ))}
                </HStack>
              </Container>
              <Container p={0}>
                <Heading size={"md"} fontWeight={"medium"} mb={3}>
                  What makes you this feeling
                </Heading>
                <Container p={0}>
                  <Text color={"black.500"} mb={3}>
                    Social
                  </Text>
                  <Wrap spacing={"8px"} mb={3}>
                    {listSocial.map((item, index) => (
                      <TagSelect
                        key={index}
                        item={item}
                        selectedTags={selectedSocials}
                        setSelectedTags={setSelectedSocials}
                      />
                    ))}
                  </Wrap>
                  <Text color={"black.500"} mb={3}>
                    Activities
                  </Text>
                  <Wrap spacing={"8px"} mb={5}>
                    {listActivities.map((item, index) => (
                      <TagSelect
                        key={index}
                        item={item}
                        selectedTags={selectedActivities}
                        setSelectedTags={setSelectedActivities}
                      />
                    ))}
                  </Wrap>
                </Container>
              </Container>
              <Container p={0}>
                <Heading size={"md"} fontWeight={"medium"} mb={3}>
                  Tell us about your emotion...
                </Heading>
                <Textarea
                  resize={"none"}
                  w={"100%"}
                  h={"100px"}
                  bg={"black.50"}
                  color={"black.500"}
                  focusBorderColor={"black.100"}
                  onChange={(e) => setTextareaValue(e.target.value)}
                />
              </Container>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="brand" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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

      <Modal
        isOpen={isErrorModalOpen}
        onClose={onCloseErrorModal}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Error</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{modalMessage}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="brand" onClick={onCloseErrorModal}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
