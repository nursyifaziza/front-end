// Chakra imports
import {
  Avatar,
  Box,
  Card,
  Text,
  useColorModeValue,
  Tag,
  TagLabel,
  TagLeftIcon,
} from "@chakra-ui/react";
import { FiClock, FiCheckCircle } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Banner(props) {
  // eslint-disable-next-line react/prop-types
  const { banner, avatar, name, job } = props;

  const [profile, setProfile] = useState({});

  const fetchData = async () => {
    const id = localStorage.getItem("idAccount")
    axios
      .get(
        `http://localhost:5000/api/account/psychologist/${id}`
      )
      .then((res) => {
        setProfile(res.data.data.psychologist);
      })
      .catch((err) => console.log(err));
  };

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card
      padding="20px"
      borderRadius="20px"
      align="center"
      height="max-content"
    >
      <Box
        bg={`url(${banner})`}
        bgSize="cover"
        borderRadius="16px"
        h="131px"
        w="100%"
      />
      <Avatar
        mx="auto"
        src={avatar}
        h="87px"
        w="87px"
        mt="-43px"
        border="4px solid"
        borderColor={borderColor}
      />
      <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mt="10px">
        {profile.fullName}
      </Text>
      <Text color={textColorSecondary} fontSize="sm">
        {profile.currentJob}
      </Text>
      <Box mt={2}>
        {profile.isVerified ? (
          <Tag variant="subtle" size="md" colorScheme="green">
            <TagLabel>Account Status : </TagLabel>
            <TagLeftIcon as={FiCheckCircle} ml={1} />
            <TagLabel> Verified </TagLabel>
          </Tag>
        ) : (
          <Tag variant="subtle" size="md" colorScheme="orange">
            <TagLabel>Account Status : </TagLabel>
            <TagLeftIcon as={FiClock} ml={1} />
            <TagLabel> Pending</TagLabel>
          </Tag>
        )}
      </Box>
    </Card>
  );
}
