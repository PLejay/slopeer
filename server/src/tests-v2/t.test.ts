import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import resolvers from './resolvers';
import typeDefs from './typedefs';

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const {query, mutate} = createTestClient(server as any);

test('find user', async () => {
  const FIND_USER = gql`
    query {
      findUser(id: '1') {
        id
        name
      }
    }
  `;

  const {
    data: { findUser }
  } = await query({ query: FIND_USER });

  expect(findUser).toEqual({ id: '1', name: 'Name1' });
});

test('throw error if user is not found', async () => {
  const FIND_USER = gql`
    query {
      findUser(id: '10') {
        id
        name
      }
    }
  `;

  const {
    errors: [error]
  } = await await query({ query: FIND_USER });

  expect(error.message).toEqual('Not Found!');
});

test('delete user', async () => {
  const DELETE_USER = gql`
    mutation($id: ID!) {
      deleteUser(id: $id)
    }
  `;

  const {
    data: { deleteUser }
  } = await mutate({ mutation: DELETE_USER, variables: { id: '1' } });

  expect(deleteUser).toBeTruthy();
});

test('can not delete user twice', async () => {
  const DELETE_USER = gql`
    mutation($id: ID!) {
      deleteUser(id: $id)
    }
  `;

  const {
    data: { deleteUser }
  } = await mutate({ mutation: DELETE_USER, variables: { id: '1' } });

  expect(deleteUser).toBeFalsy();
});