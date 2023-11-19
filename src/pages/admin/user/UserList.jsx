import DataTable from "react-data-table-component";
import axios from "axios";
import { Text, Heading, Box, Avatar, Flex, Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// cell's components
const UserList = ({ row }) => (
  <Flex alignItems="center">
    <Avatar size="sm" src={row.photo} />
    <Text ml="20px">{row.fullName}</Text>
  </Flex>
);

const ActionButton = ({ row }) => (
  <div className="button" justifycontent="center">
    <Button mr="10px" size="sm" colorScheme="red" onClick={() => handleDelete(row._id)}>
      {" "}
      Delete{" "}
    </Button>
    <Link to={`/a/users/edit/${row._id}`}>
      <Button size="sm" bgColor="orange" color="white">
        {" "}
        Edit{" "}
      </Button>
    </Link>
  </div>
);

// delete function
function handleDelete(id) {
  const confirmation = window.confirm("Do you want to delete this user? You can't undo this action.");
  if (confirmation) {
    axios
      .delete(`http://localhost:5000/api/account/user/${id}`)
      .then((res) => {
        alert("User deleted.");
        window.location.reload();
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

function User() {
  const goTo = useNavigate();

  const column = [
    {
      name: "ID",
      selector: (row) => row._id,
      sortable: true,
      width: "70px",
    },
    {
      name: "User",
      cell: (row) => (
        <Link to={`/a/users/${row._id}`}>
          {" "}
          <UserList row={row} />{" "}
        </Link>
      ),
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Password",
      selector: (row) => row.password,
    },
    {
      name: "Action",
      cell: (row) => <ActionButton row={row} />,
      paddingRight: "20px",
    },
  ];

  // fetching API

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      axios.get(`http://localhost:5000/api/account/user`)
      .then(res => {
        setData(res.data.data.users)
      })
      .catch(err => console.log(err))
    };
    fetchData();
  }, []);

  return (
    <div className="showUser">
      <Box p="24px">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="lg" mb={"5"}>
            User
          </Heading>
        </Flex>
        <Box border="1px" borderColor="gray.200" borderRadius="5px">
          <DataTable columns={column} data={data} pagination customStyles={style} />
        </Box>
      </Box>
    </div>
  );
}

export default User;
