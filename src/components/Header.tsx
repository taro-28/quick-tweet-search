import { Box, Center, Heading } from "@chakra-ui/react";
import { FC, memo } from "react";
import { FaSearch } from "react-icons/fa";

export const Header: FC = memo(() => {
  return (
    <Center>
      <Heading
        size="md"
        as="h1"
        display="flex"
        mb="2"
        alignItems="center"
        color="#00acee"
      >
        <Box>
          <FaSearch color="#00acee" />
        </Box>
        uick Tweet Search
      </Heading>
    </Center>
  );
});
