import {ApolloServer, gql } from  'apollo-server-express';
import {Request, Response} from 'express';
import resolvers from '../graphql/resolvers'
import typeDefs from '../graphql/schemas'
import {createTestClient} from 'apollo-server-testing'
import Route from '../models/route.model';

// route with just required elements
const mockRoute = {
_id: '1',
name: 'a route',
grade: 'B1',
author: '001',
lat: '0023.023.23',
lng: '2100.103.90'
}

//mock db content
jest.spyOn(Route, 'find')
      .mockImplementationOnce(() => {
        return {populate: ()=> [mockRoute] }
      }) //mock find method

type express= {res:Response, req: Request}

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }:express) => ({ req, res }),
  uploads: false

  // mocks:true,
  // mockEntireSchema: false,
});

const GET_ROUTES = gql`
query{
  routes(public: true) {
    _id
    grade
    lat
    lng
  }
}`

const {query} = createTestClient(server as any);


describe('route query', ()=>{

  it('is able to get routes', async ()=> {
    const res = await query({query:GET_ROUTES})
    console.log(res.data.routes, 'res')

    //snapshot shows that the data is there, but cant probe anything else
    expect(res).toMatchSnapshot();
     //as the query is just getting 4 of the elements that are part of route it does not pass a test toEqual
     expect(res.data.routes).toEqual([mockRoute])
  })
  //can not make two at the same time, error
  // it('should get routes', async ()=> {
  //   const res = await query({query:GET_ROUTES})
  //   console.log(res, 'res')
  //
  // })


})