
const { gql } = require('apollo-server-express');

module.exports = gql`
    type Query {
        allPosts: [Post]!
        Post(id: String!): Post
    }
    type User {
        id: String!
        name: String!
        firstName: String!
    }

    type Post {
        id: String!
        title: String
        owner: String
        user: User
    }
    type Mutation {
        createPost(title: String!, userId: String): Post!
        removeElementFromList(id: String!): Post!
    }

`