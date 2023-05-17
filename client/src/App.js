import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login'

const httpLink = createHttpLink({
  uri: '/graphql',
});


const authLink = setContext((_, { headers }) => {
  
  const token = localStorage.getItem('id_token');
 
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({

  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  return (

    <div className="App">

      <ApolloProvider client={client}>
        <Router>
              <Routes>

                <Route 
                  path="/"
                  element={<Login />}
                />

                <Route
                  path="/home"
                  element={<Home />}
                />

              </Routes>
        </Router>
      </ApolloProvider>

  
    </div>
  );
}

export default App;
