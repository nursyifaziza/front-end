import { NavLink } from "react-router-dom";
import { Icon } from "@chakra-ui/react";
import RadiateLogo from "../../assets/radiate-logo-white.png";

import { Flex, Box, List, ListItem, Center, HStack } from "@chakra-ui/react";

function Sidebar({ menu }) {
  return (
    <>
      <Flex color="white" className="sidebar">
        <Box bg="#FFAC31" w="280px" minH="100vh" p="20px" pt="12px">
          <Center p="5" mb="5">
            <img src={RadiateLogo} alt="Radiate Logo" />
          </Center>
          <List spacing={2}>
            {menu.map((Menu, index) => {
              return (
                <ListItem
                  key={index}
                  borderRadius="10"
                  p="3"
                  _hover={{ bg: "#ffb850", cursor: "pointer" }}
                >
                  <HStack>
                    <Icon as={Menu.icon} boxSize="6" mr="2" color="white" />
                    <NavLink
                      to={`${Menu.link}`}
                      className={({ isActive }) => (isActive ? "active" : "")}
                      state={{ title: Menu.title }}
                    >
                      {Menu.title}
                    </NavLink>
                  </HStack>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Flex>
    </>

    // <div className={show ? 'sidebar active' : 'sidebar'}>
    //   <img src={reactLogo} alt="Logo" className='logo' />
    //   <ul>
    //     <li>
    //       <Link to='/' className='active'>Home</Link>
    //     </li>
    //     <li>
    //       <Link to='/about'>Home</Link>
    //     </li>
    //   </ul>
    // </div>
  );
}

export default Sidebar;
