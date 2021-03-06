const { gql } = require('apollo-server')

module.exports = gql`
  type Game {
    id: ID!
    place: String!
    createdAt: String!
    username: String!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    getGames: [Game]
    getGame(gameId: ID!): Game
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createGame(place: String!): Game!
    deleteGame(gameId: ID!): String!
  }
`
