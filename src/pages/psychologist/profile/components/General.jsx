// Chakra imports
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

// Assets
export default function GeneralInformation(props) {
  const {
      ...rest
  } = props;

  const [profile, setProfile] = useState({});
  const [isEdited, setIsEdited] = useState(false);
  const { isOpen: isSuccessModalOpen, onOpen: onOpenSuccessModal, onClose: onCloseSuccessModal } = useDisclosure();
  const [modalMessage, setModalMessage] = useState("");

  const id = localStorage.getItem("idAccount")

  const fetchData = async () => {
    axios
      .get(
        `http://localhost:5000/api/account/psychologist/${id}`
      )
      .then((res) => {
        setProfile(res.data.data.psychologist);
      })
      .catch((err) => console.log(err));
  };

  const saveProfile = async () => {
    axios
      .put(
        `http://localhost:5000/api/account/psychologist/${id}`,
        profile
      )
      .then((res) => {
        setModalMessage(res.data.message);
        onOpenSuccessModal();
        setIsEdited(!isEdited);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Chakra Color Mode
  const textColorSecondary = "gray.400";

  return (
    <Card padding="20px" borderRadius="20px">
      <CardBody>
        <Tabs variant="soft-rounded" colorScheme="orange">
          <TabList>
            <Tab>Personal Info</Tab>
            <Tab>Account Setting</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Text
                color={textColorSecondary}
                fontSize="md"
                fontWeight={"bold"}
                me="26px"
                mb="4px"
              >
                Section 1
              </Text>
              <SimpleGrid columns="2" gap="16px">
                <FormControl id="fullName" isRequired>
                  <FormLabel>Full name</FormLabel>
                  <Input
                    isDisabled={!isEdited}
                    placeholder="Full name"
                    value={profile.fullName}
                    borderRadius="16px"
                    onChange={(e) =>
                      setProfile({ ...profile, fullName: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl id="levelOfEducation" isRequired>
                  <FormLabel>Level of education</FormLabel>
                  <Input
                    isDisabled={!isEdited}
                    placeholder="Level of education"
                    value={profile.levelOfEducation}
                    borderRadius="16px"
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        levelOfEducation: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl id="bachelorCertificate" isRequired>
                  <FormLabel>Bachelor certificate</FormLabel>
                  <Input
                    isDisabled={!isEdited}
                    placeholder="https://drive.google.com/drive/barch..."
                    value={profile.bachelorCertificate}
                    borderRadius="16px"
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        bachelorCertificate: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl id="certificates">
                  <FormLabel>Certificates</FormLabel>
                  <Input
                    isDisabled={!isEdited}
                    placeholder="https://drive.google.com/drive/cerf"
                    value={profile.certificates}
                    borderRadius="16px"
                    onChange={(e) =>
                      setProfile({ ...profile, certificates: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl id="cv" isRequired>
                  <FormLabel>CV</FormLabel>
                  <Input
                    isDisabled={!isEdited}
                    placeholder="https://drive.google.com/drive/mycv"
                    value={profile.cv}
                    borderRadius="16px"
                    onChange={(e) =>
                      setProfile({ ...profile, cv: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl id="yearsOfExperienceAsCounselor" isRequired>
                  <FormLabel>Years of experience as counselor</FormLabel>
                  <Input
                    isDisabled={!isEdited}
                    type="number"
                    placeholder="Years of experience as counselor"
                    value={profile.yearsOfExperienceAsCounselor}
                    borderRadius="16px"
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        yearsOfExperienceAsCounselor: e.target.value,
                      })
                    }
                  />
                  <Checkbox defaultChecked>
                    received training as counselor
                  </Checkbox>
                </FormControl>
              </SimpleGrid>

              <Text
                color={textColorSecondary}
                fontSize="md"
                fontWeight={"bold"}
                me="26px"
                mt={"24px"}
                mb="4px"
              >
                Section 2
              </Text>
              <SimpleGrid columns="2" gap="16px">
                <FormControl id="currentJob" isRequired>
                  <FormLabel>Current job</FormLabel>
                  <Input
                    isDisabled={!isEdited}
                    placeholder="Current job"
                    value={profile.currentJob}
                    borderRadius="16px"
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        currentJob: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl id="expertiseField" isRequired>
                  <FormLabel>Expertise field</FormLabel>
                  <Input
                    isDisabled={!isEdited}
                    placeholder="Expertise field"
                    value={profile.expertiseFields}
                    borderRadius="16px"
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        expertiseFields: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl id="languagesMastered" isRequired>
                  <FormLabel>Languages mastered</FormLabel>
                  <Input
                    isDisabled={!isEdited}
                    placeholder="Languages mastered"
                    value={profile.languagesMastered}
                    borderRadius="16px"
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        languagesMastered: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl id="counselingMethod" isRequired>
                  <FormLabel>Counseling method</FormLabel>
                  <Input
                    isDisabled={!isEdited}
                    placeholder="Counseling method"
                    value={profile.counselingMethod}
                    borderRadius="16px"
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        counselingMethod: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl id="cityOfResidence" isRequired>
                  <FormLabel>City of residence</FormLabel>
                  <Input
                    isDisabled={!isEdited}
                    placeholder="City of residence"
                    value={profile.cityOfResidence}
                    borderRadius="16px"
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        cityOfResidence: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl id="cityOrDistrict" isRequired>
                  <FormLabel>City/district</FormLabel>
                  <Input
                    isDisabled={!isEdited}
                    placeholder="City/District Name"
                    value={profile.cityOrDistrict}
                    borderRadius="16px"
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        cityOrDistrict: e.target.value,
                      })
                    }
                  />
                </FormControl>
              </SimpleGrid>

              <Text
                color={textColorSecondary}
                fontSize="md"
                fontWeight={"bold"}
                me="26px"
                mt={"24px"}
                mb="4px"
              >
                Contact
              </Text>
              <SimpleGrid columns="2" gap="16px">
                <FormControl id="whatsappNumber" isRequired>
                  <FormLabel>WhatsApp number</FormLabel>
                  <Input
                    isDisabled={!isEdited}
                    placeholder="WhatsApp number"
                    value={profile.whatsappNo}
                    borderRadius="16px"
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        whatsappNo: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl id="devicesUsed" isRequired>
                  <FormLabel>Devices used</FormLabel>
                  <Input
                    isDisabled={!isEdited}
                    placeholder="Devices used"
                    value={profile.devicesUsed}
                    borderRadius="16px"
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        devicesUsed: e.target.value,
                      })
                    }
                  />
                </FormControl>
              </SimpleGrid>
              {isEdited ? (
                <Button colorScheme="brand" mt={4} onClick={saveProfile}>
                  Save changes
                </Button>
              ) : (
                <Button
                  colorScheme="brand"
                  mt={4}
                  onClick={() => setIsEdited(!isEdited)}
                >
                  Edit
                </Button>
              )}
            </TabPanel>
            <TabPanel>
              <SimpleGrid columns="2" gap="16px">
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder="Email address"
                    value="drjane@example.com"
                    borderRadius="16px"
                  />
                </FormControl>
                <FormControl id="photo" isRequired>
                  <FormLabel>Profile photo</FormLabel>
                  <Input placeholder="Profile photo" borderRadius="16px" />
                </FormControl>
              </SimpleGrid>

              <Text
                color={textColorSecondary}
                fontSize="md"
                fontWeight={"bold"}
                me="26px"
                mt={"36px"}
                mb="4px"
              >
                Change password
              </Text>
              <SimpleGrid gap="16px">
                <FormControl id="currentPassword" isRequired>
                  <FormLabel>Current password</FormLabel>
                  <Input placeholder="Current password" borderRadius="16px" />
                </FormControl>
                <FormControl id="newPassword" isRequired>
                  <FormLabel>New password</FormLabel>
                  <Input placeholder="New password" borderRadius="16px" />
                </FormControl>
              </SimpleGrid>
              <Button colorScheme="brand" mt={4}>
                Save changes
              </Button>
            </TabPanel>
          </TabPanels>
        </Tabs>

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
      </CardBody>
    </Card>
  );
}
