import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import { MdVerified } from "react-icons/md";

type Props = {
  name: string;
  screenName: string;
  image: string;
  verified: boolean;
};

export const AccountSelectOption: FC<Props> = ({
  name,
  screenName,
  image,
  verified,
}) => {
  return (
    <Flex>
      <Avatar src={image} size="md" />
      <Flex flexDirection="column" justifyContent="center" marginLeft="2">
        <Flex alignItems="center" marginBottom="-1">
          <Text
            fontWeight="bold"
            fontSize="sm"
            marginRight={verified ? "0.5" : ""}
            noOfLines={1}
          >
            {name}
          </Text>
          {verified && (
            <Box>
              <MdVerified color="00acee" />
            </Box>
          )}
        </Flex>
        <Text fontSize="sm" color="GrayText">
          @{screenName}
        </Text>
      </Flex>
    </Flex>
  );
};
