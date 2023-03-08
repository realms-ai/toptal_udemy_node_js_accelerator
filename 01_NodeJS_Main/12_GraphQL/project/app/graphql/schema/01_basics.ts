import { buildSchema } from 'graphql';

const schema_1 = buildSchema(`
  type RootQuery {
    hello_1: String!
  }

  schema {
    query: RootQuery
  }
`);

const schema = buildSchema(`
  type TestData {
    text: String!
    views: Int!
  }

  input LoginData {
    email: String!
    password: String!
  }

  type LoginResponse {
    token: String!
    userId: String!
  }

  type RootQuery {
    hello_1: String!
    hello_2: TestData!
    login(userInput: LoginData): LoginResponse!
    
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    imageUrl: String!
    userId: User!
    createdAt: String!
    updatedAt: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String
    status: String!
    posts: [Post!]!
  }

  input UserInputData {
    email: String!
    username: String!
    password: String!
  }

  input PostInputData {
    title: String!
    content: String!
    imageUrl: String!
  }

  type RootMutation {
    createUser(userInput: UserInputData): User!
    createPost(userInput: PostInputData): Post!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

export { schema };
