
import './css/index.css';
import App from './App';
import { OutsiderProvider } from './containers/hooks/useOusider';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import reportWebVitals from './reportWebVitals';


/*if(process.env.NODE_ENV === "developement") {
  // Create an http link:
  const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',
  });

  // Create a WebSocket link:
  const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:4000/graphql',
    options: { reconnect: true },
  }));
}*/

//else {
  const url = new URL("/graphql", window.location.href);
  // Create an http link:
  const httpLink = new HttpLink({
    url: url.href,
  });

  // Create a WebSocket link:
  const wsLink = new GraphQLWsLink(createClient({
    url: url.href.replace("http", "ws"),
    options: { lazy: true },
  }));
//}


// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <OutsiderProvider><App /></OutsiderProvider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
