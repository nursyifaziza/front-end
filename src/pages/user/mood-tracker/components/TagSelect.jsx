/* eslint-disable react/prop-types */
import { WrapItem, Tag } from "@chakra-ui/react";
import { useEffect, useState } from "react";
const TagSelect = ({ item, selectedTags, setSelectedTags }) => {
  const handleClick = () => {
    if (selectedTags.includes(item)) {
      // Jika tag sudah dipilih, maka hapus tag dari selectedTags
      setSelectedTags(selectedTags.filter((tag) => tag !== item));
    } else {
      // Jika tag belum dipilih, tambahkan tag ke selectedTags
      setSelectedTags([...selectedTags, item]);
    }
  };
  return (
    <WrapItem>
      <Tag
        size="lg"
        variant={selectedTags.includes(item) ? "solid" : "outline"}
        borderRadius={"full"}
        colorScheme={"brand"}
        fontSize={"14px"}
        fontWeight={"regular"}
        cursor={"pointer"}
        onClick={handleClick}
      >
        {item}
      </Tag>
    </WrapItem>
  );
};

export default TagSelect;
