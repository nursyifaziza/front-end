import DataTable from "react-data-table-component";
import axios from "axios";
import {
  Heading,
  Box,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useGetQnaQuery } from "../../../state/api";

function QnaList() {
  const goTo = useNavigate();
  const [sort, setSort] = useState({});
  const { isOpen: isSuccessModalOpen, onOpen: onOpenSuccessModal, onClose: onCloseSuccessModal } = useDisclosure();
  const [modalMessage, setModalMessage] = useState("");

  const { data, isLoading } = useGetQnaQuery({
    sort: JSON.stringify(sort),
  });
  console.log("data", data);
  const ActionButton = ({ row }) => {
    if (row.isVerified === false) {
      return <VerifButton row={row} />;
    }

    return (
      <div className="button" justifycontent="center">
        <Button
          mr="10px"
          height={7}
          width="60px"
          fontSize="sm"
          colorScheme="red"
          onClick={() => handleDelete(row._id)}>
          {" "}
          Delete{" "}
        </Button>
        <Link to={`/a/qna/QnaEdit/${row._id}`}>
          <Button
            height={7}
            width="50px"
            fontSize="sm"
            color="white"
            bg="#FFAC31">
            {" "}
            Edit{" "}
          </Button>
        </Link>
      </div>
    );
  };
  // delete function
  function handleDelete(id) {
    const confirmation = window.confirm(
      "Do you want to delete this user? You can't undo this action."
    );
    if (confirmation) {
      axios
        .delete(`http://localhost:5000/api/qna/deleteQna/${id}`)
        .then((res) => {
          setModalMessage("User deleted.");
          onOpenSuccessModal();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => console.log(err));
    }
  }
  // table custom style
  const style = {
    headCells: {
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        borderTop: "solid 1px #EBEBEB",
      },
    },
  };

  const column = [
    {
      name: "ID",
      selector: (row) => row._id,
      sortable: true,
      width: "70px",
    },

    {
      name: "Questions",
      selector: (row) => row.Questions,
    },
    {
      name: "Answers",
      selector: (row) => row.Answers,
    },
    {
      name: "Action",
      cell: (row) => <ActionButton row={row} />,
      paddingRight: "20px",
    },
  ];
  return (
    <div className="showUser">
      <Box p="32px">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="lg" mb={"5"}>
            QNA
          </Heading>
          <Box className="add-button">
            <Button
              variant="ghost"
              bgColor="#FD9F00"
              color="white"
              leftIcon={<AddIcon />}
              size="sm"
              onClick={() => goTo(`/a/qna/QnaCreate`)}>
              Add
            </Button>
          </Box>
        </Flex>
        <Box border="1px" borderColor="gray.200" borderRadius="5px">
          <DataTable
            columns={column}
            data={data}
            pagination
            customStyles={style}
          />
        </Box>
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

export default QnaList;
