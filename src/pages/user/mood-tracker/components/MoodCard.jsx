import {
  Container,
  Heading,
  Text,
  HStack,
  VStack,
  Image,
  Card,
  CardBody,
  Wrap,
  WrapItem,
  Tag,
  Textarea,
  Flex,
  Button,
  Menu, 
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalBody,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogFooter
} from "@chakra-ui/react";

import { Icon } from "@chakra-ui/react";
import { HiCalendar } from "react-icons/hi2";

import TerribleIcon from "@/assets/mood-icons/1_terrible.png";
import BadIcon from "@/assets/mood-icons/2_bad.png";
import OkayIcon from "@/assets/mood-icons/3_okay.png";
import GoodIcon from "@/assets/mood-icons/4_good.png";
import WonderfulIcon from "@/assets/mood-icons/5_wonderful.png";
import { useState } from "react";

const moodIcon = {
  Terrible: {
    icon: TerribleIcon,
  },
  Sad: {
    icon: BadIcon,
  },
  Okay: {
    icon: OkayIcon,
  },
  Good: {
    icon: GoodIcon,
  },
  Wonderful: {
    icon: WonderfulIcon,
  },
};

export const MoodCard = ({ item, isOpen, onOpen, onClose, setModalAction, setIdMood }) => {
  const { isOpen: isSuccessModalOpen, onOpen: onOpenSuccessModal, onClose: onCloseSuccessModal } = useDisclosure();
  const { isOpen: isErrorModalOpen, onOpen: onOpenErrorModal, onClose: onCloseErrorModal } = useDisclosure();
  const { isOpen: isAlertOpen, onOpen: onOpenAlert, onClose: onCloseAlert } = useDisclosure();
  const [modalMessage, setModalMessage] = useState("");

  const onClickDelete = async () => {
    onOpenAlert();
  };
  
  const onClickEdit = () => {
    setModalAction("edit");
    setIdMood(item.id);
    onOpen();
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/user/moodentries/" + item.id,
        {
          method: "DELETE",
          headers: {
            "x-access-token": localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        onCloseAlert();
        setModalMessage(data.message);
        onOpenSuccessModal();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      setModalMessage(error.message);
      onOpenErrorModal();
    }
  }
  ;


  return (
    <Card w={"350px"} h={"auto"} rounded={"xl"}>
      <CardBody>
        <Flex justifyContent="space-between" mb={5}>
          <HStack>
            <Image src={moodIcon[item.moodValue]?.icon} boxSize={"60px"} />
            <VStack align={"left"} ml={4}>
              <Heading size={"md"}>{item.moodValue}</Heading>
              <HStack>
                <Icon as={HiCalendar} boxSize={5}></Icon>
                <Text fontSize={"sm"}>
                  {new Date(item.date).toDateString()}
                </Text>
              </HStack>
            </VStack>
          </HStack>
          <Menu>
            <MenuButton as={Button} colorScheme="gray" fontSize="2xl">
              ...
            </MenuButton>
            <MenuList minWidth="100%">
              <MenuItem onClick={onClickEdit}>Edit</MenuItem>
              <MenuItem onClick={onClickDelete}>Delete</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Container mb={5} p={0}>
          <Wrap spacing={"8px"}>
            {item.activities.map((activity, index) => (
              <WrapItem key={index}>
                <Tag
                  size={"md"}
                  variant={"outline"}
                  borderRadius={"full"}
                  colorScheme="brand"
                >
                  {activity}
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        </Container>
        <Container mb={5} p={0}>
          <Textarea
            isDisabled
            value={item.moodNote}
            resize={"none"}
            w={"100%"}
            bg={"black.50"}
            color={"black.500"}
            focusBorderColor={"black.100"}
          />
        </Container>

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

        <AlertDialog isOpen={isAlertOpen} onClose={onCloseAlert}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Confirm
              </AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                Are you sure you want to delete this item?
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button onClick={onCloseAlert} mr={2}>Cancel</Button>
                <Button colorScheme="red" onClick={handleDelete}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

      </CardBody>
    </Card>
  );
};
