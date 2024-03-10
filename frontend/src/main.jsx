import React from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { StyledEngineProvider } from "@mui/material";

import App from "./App.jsx";
import "./index.css";

console.log(
  "Connect to",
  `http://localhost:${import.meta.env.VITE_SERVER_PORT}/graphql`
);

// past

// const httpLink = new HttpLink({
//   uri: "http://localhost:5001/graphql",
// });

// const wsLink = new GraphQLWsLink(
//   createClient({
//     url: "ws://localhost:5001/graphql",
//     options: { reconnect: true },
//   })
// );

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   wsLink,
//   httpLink
// );

// const client = new ApolloClient({
//   splitLink,
//   cache: new InMemoryCache(),
// });

import { YogaLink } from "@graphql-yoga/apollo-link";
import { onError } from "@apollo/client/link/error";

const client = new ApolloClient({
  link: new YogaLink({
    endpoint: 'http://localhost:5001/graphql'
  }),
  cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </ApolloProvider>
  </React.StrictMode>
);
