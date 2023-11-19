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
    Card,
    CardHeader,
    CardBody,
    Heading,
    SimpleGrid,
    FormControl,
    FormLabel,
    Button,
    Textarea,
    Box
} from "@chakra-ui/react";

export default function FormCounselingResult() {
    return (
        <Box p={"32px"}>
            <Card justifyContent="center" align="left" p={"32px"}>
                <CardHeader>
                    <Heading>Edit counseling result</Heading>
                </CardHeader>
                <CardBody>
                    <SimpleGrid gap='16px'>
                        <FormControl id="evaluationType">
                            <FormLabel>Evaluation type</FormLabel>
                            <Textarea placeholder="Evaluation type" borderRadius="16px"/>
                        </FormControl>
                        <FormControl id="evaluationType">
                            <FormLabel>Observation result</FormLabel>
                            <Textarea placeholder="Evaluation type" borderRadius="16px"/>
                        </FormControl>
                        <FormControl id="interviewResult">
                            <FormLabel>Interview result</FormLabel>
                            <Textarea placeholder="Evaluation type" borderRadius="16px"/>
                        </FormControl>
                        <FormControl id="evaluationType">
                            <FormLabel>Personality dinamics</FormLabel>
                            <Textarea placeholder="Personality dynamics" borderRadius="16px"/>
                        </FormControl>
                        <FormControl id="solutionAndAssignments">
                            <FormLabel>Solution and assignments</FormLabel>
                            <Textarea placeholder="Solution and assignments" borderRadius="16px"/>
                        </FormControl>
                        <FormControl id="conclusion" isRequired>
                            <FormLabel>Conclusion</FormLabel>
                            <Textarea placeholder="Evaluation type" borderRadius="16px"/>
                        </FormControl>
                    </SimpleGrid>
                    <Button float='right' colorScheme='brand' mt={4}>Save changes</Button>
                </CardBody>
            </Card>
        </Box>
    );
}
