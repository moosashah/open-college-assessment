import gql from "graphql-tag";
const courseSchema = gql`
  type Course {
    id: ID!
    title: String!
    description: String!
    duration: Int!
    outcome: String!
    collection: Collection!
    ownerId: ID!
  }

  type Query {
    courses(limit: Int, sortOrder: SortOrder): [Course!]
    course(id: ID!): Course
  }

  type Mutation {
    addCourse(input: CourseInput!): Course!
    updateCourse(id: ID!, input: CourseInput!): Course!
    deleteCourse(id: ID!): Boolean!
  }

  enum SortOrder {
    ASC
    DESC
  }

  input CourseInput {
    title: String!
    description: String!
    duration: Int!
    outcome: String!
    collectionId: ID!
    ownerId: ID!
  }
`;

export default courseSchema;
