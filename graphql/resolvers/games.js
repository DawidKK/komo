const Game = require('../../models/Game')

module.exports = {
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
