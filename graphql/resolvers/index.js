const gamesResolvers = require('./games')
const usersResolvers = require('./users')

module.exports = {
  Query: {
    ...gamesResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...gamesResolvers.Mutation,
  }
};
