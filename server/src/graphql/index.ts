import express from 'express';
import cors from 'cors';
import { graphqlUploadExpress } from 'graphql-upload';
import { ApolloServer } from 'apollo-server-express';
import jwtCheck from '../middleware/jwtCheck';
import typeDefs from './schemas';
import resolvers from './resolvers';

export const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  // typeDefs: require('./schemas'),
  // resolvers: require('./resolvers'),
  context: ({ req, res }) => ({ req, res }),
  uploads: false
});

const app = express();
//individual app.use for testing separately 
app
.use(cors())
.use(express.static('public'))
.use(jwtCheck)
.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 11 }))

server.applyMiddleware({ app });


export default app;
