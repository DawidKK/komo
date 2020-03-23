const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const mongoose = require('mongoose')

const { MONGODB } = require('./config.js')
const Game = require('./models/Game')

const typeDefs = gql`
  type Game {
    id: ID!
    place: String!
    createdAt: String!
    username: String!
  }

  type Query {
    getGames: [Game]
  }
`
const resolvers = {
  Query: {
    async getGames() {
      try {
        const games = await Game.find()
        return games
      } catch (error) {
        throw new Error(error)
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: { version: '1.7.25' }
})

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB connected')
    return server.listen({ port: 5000 })
  })
  .then(res => {
    console.log(`Server running at ${res.url}`)
  })
