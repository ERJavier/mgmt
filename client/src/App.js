import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Clients from "./components/Clients";
import AddClientModel from "./AddClientModel";


const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incomong) {
            return incomong;
          },
        },
        projects: {
          merge(existing, incomong) {
            return incomong;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:5001/graphql',
  cache,
})

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <AddClientModel />
          <Clients />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
