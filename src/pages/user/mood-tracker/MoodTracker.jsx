import { Center, Flex, Heading, Box, HStack, Grid } from "@chakra-ui/react";

import { MoodCard } from "./components/MoodCard";
import { MoodModal } from "./components//MoodModal";
import listmood from "./components/listmood";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import IconMood from "./components/IconMood";

function MoodTracker() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [listUserMood, setListUserMood] = useState([]);
  const [lastDate, setLastDate] = useState("");

  const [moodChoose, setMoodChoose] = useState("");
  const [modalAction, setModalAction] = useState("");
  const [idMood, setIdMood] = useState("");

  const onClickMood = (mood) => {
    onOpen();
    setMoodChoose(mood);
  };

  const getListMood = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/user/moodentries",
        {
          headers: {
            "x-access-token": localStorage.getItem("accessToken"),
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        setListUserMood(data.moodEntries);
        setLastDate(
          new Date(
            data.moodEntries[data.moodEntries.length - 1].date
          ).toDateString()
        );
      } else throw data;
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getListMood();
  }, []);

  return (
    <Flex p="32px" direction={"column"}>
      {lastDate == new Date().toDateString() ? (
        ""
      ) : (
        <>
          <Heading size="lg" mb={"5"}>
            Mood Tracker
          </Heading>
          <Center py={6}>
            <Box
              w={"100%"}
              h={"auto"}
              bg={"white"}
              boxShadow={"md"}
              rounded={"xl"}
              p={6}
              textAlign={"center"}
            >
              <Heading size={"md"} mb={"32px"}>
                How are you feeling today?
              </Heading>
              <Center>
                <HStack spacing={"48px"}>
                  {listmood.map((item, index) => (
                    <IconMood
                      key={index}
                      item={item}
                      size={"100px"}
                      moodChoose={moodChoose}
                      onClickMood={onClickMood}
                    />
                  ))}
                </HStack>
              </Center>
            </Box>
          </Center>
        </>
      )}
      <Heading size={"lg"} fontSize={"24px"} fontWeight={"medium"} mb={"24px"}>
        Mood Log
      </Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {listUserMood.length > 0
          ? listUserMood.map((item) => (
              <MoodCard
                key={item.id}
                item={item}
                onOpen={onOpen}
                setModalAction={setModalAction}
                setIdMood={setIdMood}
              />
            ))
          : "no mood"}
      </Grid>
      <MoodModal
        isOpen={isOpen}
        onClose={onClose}
        moodChoose={moodChoose}
        setMoodChoose={setMoodChoose}
        modalAction={modalAction}
        idMood={idMood}
      />
    </Flex>
  );
}

export default MoodTracker;
