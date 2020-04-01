const Game = require('../../models/Game')
const checkAuth = require('../../utils/check-auth')

module.exports = {
  Query: {
    async getGames() {
      try {
        const games = await Game.find().sort({ createdAt: -1 })
        return games
      } catch (error) {
        throw new Error(error)
      }
    },

    async getGame(_, { postId }) {
      try {
        const game = await Game.findById(postId)
        if (game) {
          return game
        } else {
          throw new Error('Game not found')
        }
      } catch (error) {
        throw new Error(error)
      }
    }
  },

  Mutation: {
    async createGame(_, { place }, context) {
      const user = checkAuth(context)
      const newGame = new Game({
        place,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      })

      const game = await newGame.save()
      return game
    },

    async deleteGame(_, { gameId }, context) {
      const user = checkAuth(context);

      try {
        const game = await Game.findById(gameId);
        if (user.username === game.username) {
          await game.delete();
          return 'Game deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  }
}
