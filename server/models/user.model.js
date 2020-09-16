import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import crypto from 'crypto'

const {
  Schema
} = mongoose

var validateEmail = function (email) {
  var re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/
  return re.test(email)
}

const usersSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    created_at: 'created',
    updated_at: 'updated'
  }
})
usersSchema.methods.setPassword = function (password) {
  // creating a unique salt for a particular user
  this.salt = crypto.randomBytes(16).toString('hex')
  // hashing user's salt and password with 1000 iterations,
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`)
}
usersSchema.methods.validPassword = function (password) {
  const hashNew = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`)
  return this.hash === hashNew
}
usersSchema.plugin(mongoosePaginate)

export default mongoose.model('User', usersSchema)
