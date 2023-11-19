import {FiUser, FiMail, FiCalendar, FiPhone} from "react-icons/fi";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalFooter,
    ModalHeader,
    ModalBody,
    useDisclosure,
    Input,
    Text,
    Flex,
    Box,
    Heading,
    Avatar,
    Stack,
    Icon,
    FormControl,
    FormLabel,
    RadioGroup,
    HStack,
    Radio,
    Button
} from '@chakra-ui/react';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import axios from "axios";

function UserEdit() {

    // fetching data
    const {id} = useParams();

    const [data,
        setData] = useState([]);

    const {isOpen: isSuccessModalOpen, onOpen: onOpenSuccessModal, onClose: onCloseSuccessModal} = useDisclosure();
    const [modalMessage,
        setModalMessage] = useState("");

    useEffect(() => {
        const fetchData = async() => {
            axios
                .get(`http://localhost:5000/api/account/user/${id}`)
                .then(res => {
                    setData(res.data.data.user)
                })
                .catch(err => console.log(err))
        }
        fetchData();
    }, [id]);

    // page navigation
    const goTo = useNavigate();

    // handleSubmit
    function handleSubmit(event) {
        event.preventDefault()
        axios
            .put(`http://localhost:5000/api/account/user/${id}`, data)
            .then(res => {
                setModalMessage('User updated successfully!');
                onOpenSuccessModal();
                goTo(`/a/users/`)
            })
            .catch(err => console.log(err))
    };

    // handleDelete
    function handleDelete(id) {
        const confirmation = window.confirm("Do you want to delete this user? You can't undo this action.");
        if (confirmation) {
            axios
                .delete(`http://localhost:5000/api/account/user/${id}`)
                .then(res => {
                    setModalMessage('User deleted.');
                    onOpenSuccessModal();
                    goTo(`/a/users/`);
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="Edit">
            <div className="EditContainer">
                <Box p="24px">
                    <Heading size='lg' mb={"5"}>User Details</Heading>
                    <Flex gap={4} justifyContent='space-between'>
                        <Box
                            className='profile'
                            bg='white'
                            borderWidth='1px'
                            borderRadius='lg'
                            p='6'
                            w='40%'>
                            <Flex spacing='4'>
                                <Flex gap='4' alignItems='center' flexWrap='wrap'>
                                    <Avatar size='lg' src={data.photo}/>
                                    <Box>
                                        <Heading size='md'>{data.fullName}</Heading>
                                        <Text mt='3px' color='gray.500' fontSize='sm'>
                                            {data.cityOfDistrict}, {data.cityOfResidence}
                                        </Text>
                                    </Box>
                                </Flex>
                            </Flex>

                            <Stack mt='4'>
                                <Text fontSize='md' fontWeight='semibold' color='gray.400'>
                                    Personal Information
                                </Text>
                                <Flex alignItems='center' gap='3'>
                                    <Icon as={FiUser}/>
                                    <Text>
                                        {data.gender}
                                    </Text>
                                </Flex>
                                <Flex alignItems='center' gap='3'>
                                    <Icon as={FiCalendar}/>
                                    <Text>
                                        {new Date(data.dateOfBirth).toDateString()}
                                    </Text>
                                </Flex>

                                <Text mt='10px' fontSize='md' fontWeight='semibold' color='gray.400'>
                                    Contact Details
                                </Text>
                                <Flex alignItems='center' gap='3'>
                                    <Icon as={FiMail}/>
                                    <Text>
                                        {data.email}
                                    </Text>
                                </Flex>
                                <Flex alignItems='center' gap='3'>
                                    <Icon as={FiPhone}/>
                                    <Text>
                                        {data.whatsappNo}
                                    </Text>
                                </Flex>
                            </Stack>
                        </Box>

                        <form onSubmit={handleSubmit}>
                            <Box className='update' bg='white' borderWidth='1px' borderRadius='lg' p='7'>
                                <Box display='flex' gap={20}>
                                    <Box className='info'>
                                        <Text fontSize='lg' fontWeight='semibold' color='gray.400'>
                                            Personal Information
                                        </Text>
                                        <Stack spacing='6' mt='2'>
                                            <FormControl >
                                                <FormLabel color='gray.500' fontSize='md'>Full Name</FormLabel>
                                                <Input
                                                    variant='outline'
                                                    value={data.fullName}
                                                    onChange={e => setData({
                                                    ...data,
                                                    fullName: e.target.value
                                                })}/>
                                            </FormControl>

                                            <FormControl as='fieldset'>
                                                <FormLabel as='legend' color='gray.500' fontSize='md'>Gender</FormLabel>
                                                <RadioGroup
                                                    value={data.gender}
                                                    onChange={value => setData({
                                                    ...data,
                                                    gender: value
                                                })}>
                                                    <HStack spacing='24px'>
                                                        <Radio value='Male'>
                                                            Male
                                                        </Radio>
                                                        <Radio value='Female'>
                                                            Female
                                                        </Radio>
                                                    </HStack>
                                                </RadioGroup>
                                            </FormControl>

                                            <FormControl>
                                                <FormLabel color='gray.500' fontSize='md'>Date of Birth</FormLabel>
                                                <Input
                                                    placeholder="Select Date and Time"
                                                    size="md"
                                                    type="date"
                                                    value={data.dateOfBirth}
                                                    onChange={e => setData({
                                                    ...data,
                                                    dateOfBirth: e.target.value
                                                })}/>
                                            </FormControl>

                                            <FormControl >
                                                <FormLabel color='gray.500' fontSize='md'>City of Residence</FormLabel>
                                                <Input
                                                    variant='outline'
                                                    value={data.cityOfResidence}
                                                    onChange={e => setData({
                                                    ...data,
                                                    cityOfResidence: e.target.value
                                                })}/>
                                            </FormControl>

                                            <FormControl>
                                                <FormLabel color='gray.500' fontSize='md'>City of District</FormLabel>
                                                <Input
                                                    variant='outline'
                                                    value={data.cityOfDistrict}
                                                    onChange={e => setData({
                                                    ...data,
                                                    cityOfDistrict: e.target.value
                                                })}/>
                                            </FormControl>
                                        </Stack>
                                    </Box>

                                    <Box className='contact and credentials'>
                                        <Text fontSize='lg' fontWeight='semibold' color='gray.400'>
                                            Contact Details
                                        </Text>
                                        <Stack spacing='4' mt='2'>
                                            <FormControl>
                                                <FormLabel color='gray.500' fontSize='md'>WhatsApp Number</FormLabel>
                                                <Input
                                                    variant='outline'
                                                    value={data.whatsappNo}
                                                    onChange={e => setData({
                                                    ...data,
                                                    whatsappNo: e.target.value
                                                })}/>
                                            </FormControl>

                                            <Text fontSize='lg' fontWeight='semibold' color='gray.400'>
                                                Credentials
                                            </Text>
                                            <FormControl >
                                                <FormLabel color='gray.500' fontSize='md'>Email</FormLabel>
                                                <Input variant='outline' type='email' value={data.email}/>
                                            </FormControl>
                                            <FormControl >
                                                <FormLabel color='gray.500' fontSize='md'>Password</FormLabel>
                                                <Input
                                                    variant='outline'
                                                    value={data.password}
                                                    onChange={e => setData({
                                                    ...data,
                                                    password: e.target.value
                                                })}/>
                                            </FormControl>

                                            <Box display='flex' ml='auto' mt='90px'>
                                                <Button
                                                    color='red'
                                                    variant='ghost'
                                                    mr='30px'
                                                    onClick={() => handleDelete(data._id)}>Delete</Button>
                                                <Button bg='#FFAC31' color='white' type='submit'>Save</Button>
                                            </Box>
                                        </Stack>
                                    </Box>
                                </Box>
                            </Box>
                        </form>
                    </Flex>
                </Box>
            </div>
            <Modal isOpen={isSuccessModalOpen} onClose={onCloseSuccessModal} isCentered>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Success</ModalHeader>
                    <ModalCloseButton/>
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

export default UserEdit;