import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const {
  Schema
} = mongoose

const gamesSchema = new Schema({
  cols: {
    type: Number,
    required: true
  },
  rows: {
    type: Number,
    required: true
  },
  number_mines: {
    type: Number,
    required: true
  },
  init_time: {
    type: Number,
    required: true
  },
  end_time: {
    type: Number
  },
  real_board: {
    type: Object
  },
  view_board: {
    type: Object
  },
  status: {
    type: String,
    required: true,
    enum: ['playing', 'win', 'lose']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: {
    created_at: 'created',
    updated_at: 'updated'
  }
})
gamesSchema.plugin(mongoosePaginate)

export default mongoose.model('Game', gamesSchema)
