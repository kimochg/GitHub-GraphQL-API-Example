/*
 * @Author: LIU CHENG 
 * @Date: 2017-03-01 12:01:38 
 * @Last Modified by: LIU CHENG
 * @Last Modified time: 2017-03-01 12:13:51
 */

import ApolloClient, { createNetworkInterface } from 'apollo-client';

export default configClient = (token) => {
  const networkInterface = createNetworkInterface('https://api.github.com/graphql');

  networkInterface.use([{
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};  // Create the header object if needed.
      }

      // Send the login token in the Authorization header
      req.options.headers.authorization = `Bearer ${token}`;
      next();
    }
  }]);

  const client = new ApolloClient({
    networkInterface,
  });

  return client;
}