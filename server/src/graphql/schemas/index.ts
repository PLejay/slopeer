// import {makeExecutableSchema} from 'apollo-server-express';
// import { gql } from 'apollo-server-express';
import mutationSchema from './mutation';
import querySchema from './query';
import typesSchema from './types';

 
export default  [mutationSchema, querySchema, typesSchema]
