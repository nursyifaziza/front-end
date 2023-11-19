import react, { useEffect, useState } from "react";
import { Text, Box, Input, IconButton, InputGroup, InputRightElement,   useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogFooter, 
  Button} from "@chakra-ui/react";
import { IoMdSend } from "react-icons/io";
import { RiRobot2Fill } from "react-icons/ri";
import { HiMiniUser } from "react-icons/hi2";
import "./chatBot.css";

function Chatbots() {

  const [chat, setChat] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [botTyping, setbotTyping] = useState(false);
  const { isOpen: isAlertOpen, onOpen: onOpenAlert, onClose: onCloseAlert } = useDisclosure();
 
  useEffect(() => {
    console.log("called");
    const objDiv = document.getElementById("messageArea");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [chat]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const name = "Radiate";
    const request_temp = { sender: "user", sender_id: name, msg: inputMessage };

    if (inputMessage !== "") {
      setChat((chat) => [...chat, request_temp]);
      setbotTyping(true);
      setInputMessage("");
      rasaAPI(name, inputMessage);
    } else {
      onOpenAlert();
    }
  };

  const rasaAPI = async function handleClick(name, msg) {
    //chatData.push({sender : "user", sender_id : name, msg : msg});

    await fetch("http://localhost:5005/webhooks/rest/webhook", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        charset: "UTF-8",
      },
      credentials: "same-origin",
      body: JSON.stringify({ sender: name, message: msg }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          const temp = response[0];
          const recipient_id = temp["recipient_id"];
          const recipient_msg = temp["text"];

          const response_temp = {
            sender: "bot",
            recipient_id: recipient_id,
            msg: recipient_msg,
          };
          setbotTyping(false);

          setChat((chat) => [...chat, response_temp]);
          // scrollBottom();
        }
      });
  };

  console.log(chat);

    return (
        <Box p='28px' className="chatbot">
            <Box className="card" border='1px' borderColor='gray.300'
                borderRadius='10px' w='65%' margin='auto'>

                <Box className="header" bg='#FFAC31' p={5} height='65px'
                    borderBottom='1px' borderBottomColor='gray.400'
                    borderTopLeftRadius='10px' borderTopRightRadius='10px'>
                        <Text fontSize='2xl' fontWeight='semibold' mb={'5'} textAlign='center' color='white'>
                        Talk with our chatbot </Text>
                </Box>

                <Box className="body" id="messageArea" bg='white' p={5}
                    overflowX='hidden' overflowY='a' height='20rem'>
                    {chat.map((user, key) => (
                        <Box key={key}>
                            {user.sender === "bot" ? (
                                <Box display='flex' gap={2} alignItems='flex-start' justifyContent='flex-start' minH='5px' mb={1}>
                                    <Box borderRadius='50px' p={1} className="bot-icon" bg='#FFAC31'>
                                        <RiRobot2Fill fontSize={24} color='white' />
                                    </Box>
                                    <Box borderRadius='10px' p={3} border='1px' borderColor='gray.400' className="bot-msg">
                                        <Text height='auto' maxW='20rem'> {user.msg} </Text>
                                    </Box>
                                </Box>
                            ) : (
                                <Box display='flex' gap={2} alignItems='flex-start' justifyContent='flex-end' minH='5px' mb={1}>
                                    <Box borderRadius='10px' p={3} border='1px' borderColor='gray.400' className="user-msg">
                                        <Text height='auto' maxW='20rem'> {user.msg} </Text>
                                    </Box>
                                    <Box borderRadius='50px' p={1} className="user-icon" bg='#FFAC31'
                                        boxSize='30px' display='flex'>
                                        <HiMiniUser fontSize={28} color='white' />
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    ))}
                </Box>

                <Box pl={6} pr={6} pb={2}>
                {botTyping ? <Text> Bot is typing...</Text> : null }
                </Box>

                <Box className="footer" bg='#FFAC31' p={5} borderBottomLeftRadius='10px'
                    borderBottomRightRadius='10px' borderTop='1px' borderTopColor='gray.400'>
                    <form onSubmit={handleSubmit}>
                        <Box className="input-area">
                            <InputGroup size='sm' border='1px' borderColor='gray.300'>
                                <Input
                                    variant='filled'
                                    type='text'
                                    _focus={{ bg: "white" }}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    value={inputMessage}
                                    size='sm'
                                    placeholder="Enter your message here..."
                                />
                                <InputRightElement>
                                    <IconButton 
                                     aria-label="send"
                                     icon={<IoMdSend />}
                                     color='#FFAC31'
                                     type='submit'
                                     fontSize={22}
                                     size='sm'
                                    />
                                </InputRightElement>
                            </InputGroup>
                        </Box>
                    </form>
                </Box>
            </Box>

        <AlertDialog isOpen={isAlertOpen} onClose={onCloseAlert}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Message not valid
              </AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                Please enter a valid message
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button colorScheme="brand" onClick={onCloseAlert}>
                  OK
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        </Box>
    )
}

export default Chatbots;