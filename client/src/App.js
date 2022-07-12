import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { Routes, Route } from "react-router-dom";
import BookList from "./components/BookList";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

const App = () => (
  <ApolloProvider client={client}>
    <Routes>
      <Route path="/" element={<BookList />} />
    </Routes>
  </ApolloProvider>
);

export default App;
