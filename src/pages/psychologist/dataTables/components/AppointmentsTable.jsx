import {
  Card,
  CardBody,
  Flex,
  Table,
  Icon,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  CardHeader,
  Heading,
  IconButton,
  HStack,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useMemo } from "react";

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Assets
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import { EditIcon, InfoIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export default function ColumnsTable(props) {
  // eslint-disable-next-line react/prop-types
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 5;

  const textColor = useColorModeValue("black.500", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const { isOpen: isAlertOpen, onOpen: onOpenAlert, onClose: onCloseAlert } = useDisclosure();

  return (
    <Card
      padding="8px"
      borderRadius='20px'
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <CardHeader>
      <Heading size='md'>Appointments</Heading>
      </CardHeader>
      
      <CardBody>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe="10px"
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "NAME") {
                    data = (
                      <Text color={textColor} fontSize="sm">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "AGE") {
                    data = (
                      <Text color={textColor} fontSize="sm">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "DATE") {
                    data = (
                      <Text color={textColor} fontSize="sm">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "TIME") {
                    data = (
                      <Text color={textColor} fontSize="sm">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "PROBLEMS") {
                    data = cell.value.map((problem, problemIndex) => (
                      <Badge key={problemIndex} colorScheme="green" mr="2" mt="2">
                        {problem}
                      </Badge>
                    ));
                  } else if (cell.column.Header === "PACKAGE") {
                    data = (
                      <Text color={textColor} fontSize="sm">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "STATUS") {
                    data = (
                      <Flex align="center">
                        <Icon
                          w="24px"
                          h="24px"
                          me="5px"
                          color={
                            cell.value === "Confirmed"
                              ? "green.500"
                              : cell.value === "Declined"
                              ? "red.500"
                              : cell.value === "Waiting confirmation"
                              ? "orange.500"
                              : null
                          }
                          as={
                            cell.value === "Confirmed"
                              ? MdCheckCircle
                              : cell.value === "Declined"
                              ? MdCancel
                              : cell.value === "Waiting confirmation"
                              ? MdOutlineError
                              : null
                          }
                        />
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  }
                  else if (cell.column.Header === "ACTION") {
                    data = (
                      <HStack>
                        <Link to="/p/appointments/detail">
                          <IconButton
                            colorScheme="green"
                            aria-label="Search database"
                            borderRadius="10px"
                            icon={<InfoIcon />}
                          />
                        </Link>
                        <IconButton
                          onClick={onOpenAlert}
                          colorScheme="orange"
                          aria-label="Search database"
                          borderRadius="10px"
                          icon={<EditIcon />}
                        />
                      </HStack>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      maxH="30px !important"
                      py="8px"
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <AlertDialog isOpen={isAlertOpen} onClose={onCloseAlert}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Cancel Appointment
              </AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                Are you sure you want to cancel the appointment?
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button onClick={onCloseAlert} mr={2}>No</Button>
                <Button colorScheme="red" onClick={onCloseAlert}>
                  Yes
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </CardBody>
    </Card>
  );
}
