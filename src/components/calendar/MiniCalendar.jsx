import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "@/assets/css/MiniCalendar.css";
import { Card, Text, Icon } from "@chakra-ui/react";

// Chakra imports
import { MdChevronLeft, MdChevronRight } from "react-icons/md";


export default function MiniCalendar(props) {
  // eslint-disable-next-line react/prop-types
  const { selectRange, ...rest } = props;
  const [value, onChange] = useState(new Date());
  return (
    <Card
      borderRadius='20px'
      align="center"
      direction="column"
      w="100%"
      p="20px 16px"
      h="max-content"
      {...rest}
    >
      <Calendar
        w="100%"
        onChange={onChange}
        value={value}
        selectRange={selectRange}
        view={"month"}
        tileContent={<Text color="brand.500"></Text>}
        prevLabel={<Icon as={MdChevronLeft} w="24px" h="24px" mt="4px" />}
        nextLabel={<Icon as={MdChevronRight} w="24px" h="24px" mt="4px" />}
      />
    </Card>
  );
}
