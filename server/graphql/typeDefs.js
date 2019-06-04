
const { gql } = require('apollo-server-express');

module.exports = gql`
    type List {
        id: String!
        title: String!
        owner: String
    }
    type Query {
        allList: [List]!
        listById(id: String!): List!
    }
    type Mutation {
        createList(title: String!, owner: String!): List!
        removeElementFromList(id: String!): List!
    }

`