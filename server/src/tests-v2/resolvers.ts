const users = [...Array(5).keys()].map(key => ({
  _id: key + '',
  username: `Name${key}`,
  email: `Name${key}@mail.com`,
  password: '123'
}));

type Input = {
  _id: string;
}

export default {
  Query: {
    findUser: (_: any, { _id }: Input) => {
      const user = users.find(user => user._id === _id);
      if (user) {
        return user;
      } else {
        throw new Error('User not found!')
      }
    }
  },

  Mutation: {
    deleteUser: (_: any, { _id }: Input) => {
      const index = users.findIndex(user => user._id === _id);
      if (index < 0) return false;
      users.splice(index, 1);
      return true;
    }
  }
}