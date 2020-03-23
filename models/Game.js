const { model , Schema} = require('mongoose')

const gameSchema = new Schema({
  place: String,
  username: String,
  createdAt: String,
  players: [
    {
      username: String,
      createdAt: String,
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  }
})

module.exports = model('Game', gameSchema)
