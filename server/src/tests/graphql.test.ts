
import { createTestClient } from 'apollo-server-testing';
import {ApolloServer } from  'apollo-server-express';
import {Request, Response} from 'express';
import mongoose from 'mongoose';
// import {Route, User} from '../models/index';
import resolvers from '../graphql/resolvers'
import typeDefs from '../graphql/schemas'
import { mutations} from './__mocks__/queryAndMutations'
import {TestDB, DB_HOST } from './jest.setup-file';


//mocking connection to DB and GraphQL
type express= {res:Response, req: Request}
export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }:express) => ({ req, res }),
  uploads: false

  // mocks:true,
  // mockEntireSchema: false,
});

// const { DB_HOST,TestDB } = process.env;
const mongoDB:string =  `${DB_HOST}/${TestDB}`
async function connectToDB () {
  return await mongoose.connect(`${mongoDB}`,
    { useUnifiedTopology: true, useNewUrlParser: true },
    (err) => console.log(`Connected database ${DB_HOST}/${TestDB}, error: ${err} 🗄`)); //eslint-disable-line no-console
}

//functions to clean the database and close its connection
const dropTestDb = async () => {
  await mongoose.connection.db.dropDatabase().catch(error => console.error(error));
}

const closeDbConnection = async () => {
 await mongoose.connection.close().catch(error => console.error(error));
}
//copy of models

// const userModel = User;
// const routeModel = Route


beforeAll(async ()=> {
  await connectToDB()
  await dropTestDb()
});

afterAll(async ()=>{
  await dropTestDb();
  await closeDbConnection();
})

const REGISTER = `
mutation {
createUser(input: {email: "test", username: "mail_2@mail.com", password: "password"})
}`

describe('Add new user', ()=> {

  const { mutate} = createTestClient(server as any);



  const mockUser = {
    username: 'test',
    email: 'mail_1@dots.com',
    password: 'test1'
  }



  // it('should get routes', async ()=> {
  // const res = await query({query:queries.GET_ROUTES})
  // console.log(res, 'res')
  // expect(res).toMatchSnapshot();
  // })

  test('should add a new user', async ()=>{
    let res = await mutate ({
      mutation: REGISTER,
      variables: {
        ...mockUser
      }});
    console.log(res, 'res')
    expect(res).toBeTruthy();


    res =  await mutate ({mutation: mutations.LOGIN,variables: {email: mockUser.email, password: mockUser.password}});
    //what to expect?

    expect (res.data.user).toBeTruthy()
    //how can we access the recently created user make a query with its id if the id is created by mongo
    // res = await query ({query:queries.GET_USER_DATA, variables:{_id:}})


  });

});