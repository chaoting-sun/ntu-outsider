// Import CSS, App component, and OutsiderProvider
import './css/index.css';
import App from './App';
import { OutsiderProvider } from './containers/hooks/useOusider';

// Import React, ReactDOM, and Apollo Client libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

// Import reportWebVitals function
import reportWebVitals from './reportWebVitals';

// Create an http link to the GraphQL API
const httpLink = new HttpLink({
  uri: 'http://localhost:5000/graphql',
});

// Create a WebSocket link with GraphQLWsLink for subscription support
const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:5000/graphql',
  options: { reconnect: true },
}));

// Use the split function to route operations to different links based on their type
const link = split(
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

// Create an instance of the ApolloClient class used to interact with the GraphQL API
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

// Render the App component with the ApolloProvider and OutsiderProvider using the client
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <OutsiderProvider><App /></OutsiderProvider>
    </ApolloProvider>
  </React.StrictMode>
);

// Call the reportWebVitals function to measure app performance
reportWebVitals();