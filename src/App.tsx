import { Container } from "@chakra-ui/react";
import { Body } from "./components/Body";
import { Header } from "./components/Header";

const App = () => {
  return (
    <div className="App">
      <Container width={"350px"} my="2">
        <Header />
        <Body />
      </Container>
    </div>
  );
};

export default App;
