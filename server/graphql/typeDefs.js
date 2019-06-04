
const { gql } = require('apollo-server-express');

module.exports = gql`
    type List {
        id: ID!
        title: String!
        owner: String
    }
    type Query {
        allList: [List]!
        listById(id: ID!): List!
    }
    type Mutation {
        createList(title: String!, owner: String!): List
    }

`