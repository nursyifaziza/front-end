import { Flex, Box, List, ListItem, Center, HStack, Button, ButtonGroup, Spacer, Heading, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

import { Icon } from "@chakra-ui/react";
import { HiUserCircle, HiUser, HiBell, HiLogout } from "react-icons/hi";

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <Flex alignItems="center" gap="2" color="gray.800" bg="white" boxShadow="sm" h="16" w="100%" p="0 24px">
        <Box p="2">{/* <Heading size='md'>Home</Heading> */}</Box>
        <Spacer />
        {/* <Menu>
          <MenuButton as={Button} colorScheme='gray' variant='ghost'>
            <Icon as={HiBell} boxSize={6} color='gray.800'/>
          </MenuButton>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu> */}
        <Menu>
          <MenuButton as={Button} colorScheme="gray" variant="ghost">
            <Center>
              <Icon as={HiUserCircle} boxSize={8} color="orange" mr="2" />
              User Name
            </Center>
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} to="/u/profile">
              <Icon as={HiUser} boxSize={5} color="gray.800" mr="3" />
              Profile
            </MenuItem>
            <MenuItem>
              <Icon as={HiLogout} boxSize={5} color="gray.800" mr="3" />
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </>
  );
}

export default Navbar;
