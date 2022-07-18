import { SearchIcon } from "@chakra-ui/icons";
import { Button, Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
import { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  registerReturn: UseFormRegisterReturn;
};

export const SearchWordsInput: FC<Props> = ({ registerReturn }) => {
  return (
    <InputGroup>
      <Input placeholder="Search Words" {...registerReturn} autoFocus />
      <InputRightAddon paddingStart="0" paddingEnd="0">
        <Button type="submit">
          <SearchIcon />
        </Button>
      </InputRightAddon>
    </InputGroup>
  );
};
