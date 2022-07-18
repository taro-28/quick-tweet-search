import { Box, Container } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AccountSelect } from "./components/AccountSelect";
import { Header } from "./components/Header";
import { SearchWordsInput } from "./components/SearchWordsInput";

export type Inputs = {
  user: {
    value: string;
    label: string;
    name: string;
    image: string;
    verified: boolean;
  };
  searchWords: string;
};

const LOCAL_STORAGE = {
  LAST_SEARCHED_USERS: "lastSearchedUsers",
} as const;

const App = () => {
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
    <div className="App">
      <Container width={"350px"} my="2">
        <Header />
        <Box as="form" onSubmit={handleSubmit(handleSearch)}>
          <Box mb="2">
            <AccountSelect
              control={control}
              defaultOptions={lastSearchedUsers}
            />
          </Box>
          <SearchWordsInput registerReturn={register("searchWords")} />
        </Box>
      </Container>
    </div>
  );
};

export default App;
