import gql from "graphql-tag";
const collectionSchema = gql`
  type Collection {
    id: ID!
    name: String!
    courses: [Course!]
  }

  type Query {
    collections: [Collection!]!
    collection(id: ID!): Collection
  }
`;

export default collectionSchema;
