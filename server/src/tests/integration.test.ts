import mongoose from 'mongoose';
import app from '../graphql';
import request from 'supertest';
import  User  from '../models/user.model';
import {TestDB, DB_HOST } from './jest.setup-file';
import { mutations } from './__mocks__/queryAndMutations';



// const { DB_HOST,TestDB } = process.env;
const mongoDB:string =  `${DB_HOST}/${TestDB}`
async function connectToDB () {
  return await mongoose.connect(`${mongoDB}`,
    { useUnifiedTopology: true, useNewUrlParser: true },
    (err) => console.log(`Connected database ${DB_HOST}/${TestDB}, error: ${err} 🗄`)); //eslint-disable-line no-console
}
//functions to clean the database and close its connection
const closeDbConnection = async () => {
  await  User.deleteMany();
  await mongoose.connection.close().catch(error => console.error(error));
}

beforeAll(async () => {
  connectToDB()
})

afterAll(async () => {
  closeDbConnection()
})

// let token;

describe ('Registration process', ()=>{
  const user = {
    email: 'test10@mail.com',
    username: 'IntegrationTest',
    password: 'integrationTest1'
  };

  const payLoad = {
    'query': `${mutations.REGISTER}`,
    'variables': {
      'email': `${user.email}`,
      'username': `${user.username}`,
      'password': `${user.password}`
    }}
  const logInPayload = {
    'query': `${mutations.LOGIN}`,
    'variables': {
      'email': `${user.email}`,
      'password': `${user.password}`
    }
  }
 

  //test create a new user
  it('should create a new user and encrypt its password', async () =>{
    const res = await request(app)
      .post('/graphql')
      .send(payLoad)
      .set('Accept', 'application/json');
    console.log(res.body, 'create user')
    expect(res.status).toBe(200);
    
    //check if user was created 
    const checkUser = await User.findOne({email:user.email});
    expect(checkUser.username).toBe(user.username);
    // test password encryption
    expect(checkUser.password).not.toBe(user.password);
  })

  it('should error if email already registered', async () => {
    const res = await request(app)
      .post('/graphql')
      .send(payLoad)
      .set('Accept', 'application/json');
      expect(res.status).toBe(409);
  } )

  it('should allow login', async () => {
    const res = await request(app)
      .post('/graphql')
      .send(logInPayload)
      .set('Accept', 'application/json')
      console.log(res.body, 'here')
      expect(res.body).toBeTruthy()
    
    
  })

})

