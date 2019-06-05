const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

const schema = {
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }) 
}

module.exports = schema