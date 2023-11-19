import {
  Avatar,
  Box,
  Flex,
  Heading,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Link,
  Button,
  RadioGroup,
  HStack,
  Radio,
  TagCloseButton,
  IconButton,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import { FiClock, FiCheckCircle, FiLock } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiMail, FiCalendar, FiPhone } from "react-icons/fi";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { LiaCertificateSolid } from "react-icons/lia";
import { IoSchoolOutline } from "react-icons/io5";
import axios from "axios";
import { ExternalLinkIcon, DeleteIcon } from "@chakra-ui/icons";

import { useAddDataQNAMutation } from "../../../state/api";

function QnaCreate() {
  const [addNewData, { isSuccess }] = useAddDataQNAMutation();
  const navigate = useNavigate();
  const [Questions, setQuestions] = useState("");
  const [Answers, setAnswers] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setQuestions("");
      setAnswers("");
      navigate("/a/qna");
      window.location.reload();
    }
  }, [isSuccess, navigate]);

  const onQuestionsChanged = (e) => setQuestions(e.target.value);
  const onAnswersChanged = (e) => setAnswers(e.target.value);

  const onSavedQnAClicked = async (e) => {
    e.preventDefault();
    addNewData({ Questions, Answers });
  };
  return (
    <form className="form" onSubmit={onSavedQnAClicked}>
      <Box>
        <Stack spacing={5}>
          <Text fontSize="lg" fontWeight="bold" color="gray.300">
            {" "}
            Add Data QNA{" "}
          </Text>

          <Box className="credentials">
            <Stack spacing={4}>
              <Box>
                <Text color="gray.400" fontWeight="semibold">
                  {" "}
                  Questions{" "}
                </Text>
                <InputGroup>
                  <Input
                    size="md"
                    variant="outline"
                    value={Questions}
                    onChange={onQuestionsChanged}
                  />
                </InputGroup>
              </Box>

              <Box>
                <Text mb={1} color="gray.400" fontWeight="semibold">
                  {" "}
                  Answers{" "}
                </Text>
                <InputGroup>
                  <Input
                    size="md"
                    variant="outline"
                    value={Answers}
                    onChange={onAnswersChanged}
                  />
                </InputGroup>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
      <Box display="flex" justifyContent="end" mt="20px">
        <Button type="submit" color="secondary" variant="contained">
          Create Data Qna
        </Button>
      </Box>
    </form>
  );
}

export default QnaCreate;
