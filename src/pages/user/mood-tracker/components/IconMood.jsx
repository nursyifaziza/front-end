import { Image } from "@chakra-ui/react";

import TerribleIcon from "@/assets/mood-icons/1_terrible.png";
import BadIcon from "@/assets/mood-icons/2_bad.png";
import OkayIcon from "@/assets/mood-icons/3_okay.png";
import GoodIcon from "@/assets/mood-icons/4_good.png";
import WonderfulIcon from "@/assets/mood-icons/5_wonderful.png";
const IconMood = ({ item, size, moodChoose, onClickMood }) => {
  return (
    <Image
      src={item.icon}
      alt="mood_icon"
      boxSize={size}
      cursor={"pointer"}
      _hover={{
        transform: "translateY(-20px)",
        transition: "transform 0.5s",
      }}
      onClick={() => onClickMood(item.moodName)}
      transform={item.moodName == moodChoose ? "translateY(-20px)" : ""}
    />
  );
};

export default IconMood;
