/* eslint-disable react/prop-types */
"use client";
import React from "react";
import { Route, Link } from "react-router-dom";
import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  GridItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Tag,
  TagLeftIcon,
  TagLabel,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Icon } from "@chakra-ui/react";
import { FaBriefcase } from "react-icons/fa";

const PsychologistCard = ({ psychologist }) => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src="https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
        alt="Caffe Latte"
      />

      <Stack>
        <CardBody>
          <Heading size="md" fontFamily="body">
            {psychologist.fullName}
          </Heading>
          <Stack direction={"row"} mt={2}>
            <Tag variant="solid" mt="6px" colorScheme="orange" size="md">
              <TagLeftIcon as={FaBriefcase} fontSize="12px" />
              <TagLabel>
                {psychologist.yearsOfExperienceAsCounselor} years
              </TagLabel>
            </Tag>
          </Stack>
          <Text pt={4}>{psychologist.expertiseFields}</Text>
        </CardBody>

        <CardFooter>
          <Link to={psychologist._id}>
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              bg={"#FFAC31"}
              color={"white"}
            >
              Profile Details
            </Button>
          </Link>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default PsychologistCard;