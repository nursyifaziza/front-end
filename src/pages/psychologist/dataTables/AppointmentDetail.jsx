/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _|
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|

=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
    Box,
    Card,
    CardBody,
    CardHeader,
    Heading,
    Grid,
    Button,
    HStack
} from "@chakra-ui/react";

import Banner from "./components/BannerPatient";

import banner from "@/assets/img/auth/banner.jpg";
import avatar from "@/assets/img/auth/avatars/avatar10.png";
import CounselingResult from "./components/CounselingResult";
import {Link} from "react-router-dom";

export default function AppointmentDetail() {
    return (
        <Box p={"32px"}>
            <Grid
                templateColumns={{
                base: "1fr",
                lg: "1.34fr 2.62fr"
            }}
                templateRows={{
                base: "repeat(2, 1fr)",
                lg: "1fr"
            }}
                gap={{
                base: "20px",
                xl: "20px"
            }}>
                <Banner
                    gridArea='1 / 1 / 2 / 2'
                    banner={banner}
                    avatar={avatar}
                    name='Patient full name'/>
                <Card
                    justifyContent="center"
                    align="left"
                    w="100%"
                    mb="0px"
                    borderRadius='20px'>
                    <CardHeader>
                        <HStack justifyContent={"space-between"}>
                            <Heading size='md'>Counseling Result</Heading>
                            <Link to="/p/appointments/detail/edit">
                                <Button colorScheme="brand" variant={"outline"}>
                                    Edit counseling result
                                </Button>
                            </Link>
                        </HStack>
                    </CardHeader>

                    <CardBody>
                        <CounselingResult/>
                    </CardBody>
                </Card>
            </Grid>
        </Box>

    );
}
