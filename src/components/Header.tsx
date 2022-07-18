import { Box, Center, Heading } from "@chakra-ui/react";
import { FC, memo } from "react";
import { FaSearchengin } from "react-icons/fa";

export const Header: FC = memo(() => {
  return (
    <Center>
      <Heading size="md" as="h1" display="flex" mb="2" alignItems="center">
        <Box mr="1">
          <FaSearchengin />
        </Box>
        Quick Tweet Search
        <Box ml="1">
          <FaSearchengin />
        </Box>
      </Heading>
    </Center>
  );
});
