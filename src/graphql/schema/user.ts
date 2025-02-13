import gql from "graphql-tag";
const userSchema = gql`
  type User {
    id: Int!
    username: String!
    role: String!
    createdAt: String!
  }

  type AuthResponse {
    token: String!
    user: User!
  }

  input RegisterInput {
    username: String!
    password: String!
    role: Role
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type Mutation {
    register(input: RegisterInput!): AuthResponse!
    login(input: LoginInput!): AuthResponse!
  }

  enum Role {
    USER
    ADMIN
  }
`;

export default userSchema;
