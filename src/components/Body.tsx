import { Box } from "@chakra-ui/react";
import { FC, memo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AccountSelect } from "./AccountSelect";
import { SearchWordsInput } from "./SearchWordsInput";

export type Inputs = {
  user: {
    value: string;
    name: string;
    image: string;
    verified: boolean;
  };
  searchWords: string;
};

const LOCAL_STORAGE = {
  LAST_SEARCHED_USERS: "lastSearchedUsers",
} as const;

export const Body: FC = memo(() => {
  const rawLastSearchedUsers =
    localStorage.getItem(LOCAL_STORAGE.LAST_SEARCHED_USERS) || "";
  const lastSearchedUsers: Inputs["user"][] = rawLastSearchedUsers
    ? JSON.parse(rawLastSearchedUsers)
    : [];

  const { register, handleSubmit, control } = useForm<Inputs>({
    defaultValues: {
      user: lastSearchedUsers[0],
    },
  });

  const handleSearch: SubmitHandler<Inputs> = (data) => {
    const query = `${data.user.value ? `(from%3A${data.user.value})` : ""}%20${
      data.searchWords
    }`;
    window.open(
      `https://twitter.com/search?q=${query}&src=typed_query`,
      "_blank"
    );

    const nextLastSearchedUsers = Array.from(
      // 重複を削除
      new Map(
        [data.user, ...lastSearchedUsers].map((user) => [user.value, user])
      ).values()
      // 検索履歴は5件まで
    ).slice(0, 5);

    localStorage.setItem(
      LOCAL_STORAGE.LAST_SEARCHED_USERS,
      JSON.stringify(nextLastSearchedUsers)
    );
  };
  return (
    <Box as="form" onSubmit={handleSubmit(handleSearch)}>
      <Box mb="2">
        <AccountSelect control={control} defaultOptions={lastSearchedUsers} />
      </Box>
      <SearchWordsInput registerReturn={register("searchWords")} />
    </Box>
  );
});
