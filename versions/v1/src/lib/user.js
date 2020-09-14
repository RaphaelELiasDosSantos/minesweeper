import {
  User
} from '../../../../server/models'
import jwt from '../../../../server/utils/create-jwt'
import config from '../../../../configs'
import axios from 'axios'
const create = async (data) => {
  let userFind = await User.findOne({email: {$regex: new RegExp(data.email, 'i')}})
  if (userFind) {
    return {'response': false, 'message': 'Error email already exists'}
  }
  let newUser = new User()
  newUser.name = data.name
  newUser.email = data.email
  newUser.setPassword(data.password)

  const userGenerated = await newUser.save()
  // generate token
  const token = await jwt.sign({email: userGenerated.email, _id: userGenerated._id}, config.jwt.secret, true)
  return {'response': true, 'token': token, 'user': userGenerated}
}
const login = async (data, type) => {
  let user = await User.findOne({email: {$regex: new RegExp(data.email, 'i')}})
  if (!user) {
    user = await User.findOne({email: data.email})
  }
  if (user) {
    if (user.validPassword(data.password)) {
      // generate token
      const token = await jwt.sign({email: user.email, _id: user._id}, config.jwt.secret, true)
      await user.save()
      return {'response': true, 'token': token, 'user': user}
    } else {
      return {'response': false, 'message': 'Wrong password'}
    }
  }
  return {'response': false, 'message': 'Wrong email'}
}
const show = async (id) => {
  const user = await User.findOne({ _id: id })
  return {'response': true, 'user': user}
}
module.exports = {
  create,
  login,
  show
}
