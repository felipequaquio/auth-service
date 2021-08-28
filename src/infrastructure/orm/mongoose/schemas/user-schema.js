const mongoose = require('mongoose')
const { uuid } = require('uuidv4')

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    index: { unique: true },
    default: uuid('v4')
  },
  nome: String,
  email: String,
  senha: String,
  telefones: [{
    telefone: String,
    ddd: String
  }],
  token: String,
  ultimo_login: Date
}, {
  timestamps: {
    createdAt: 'data_criacao',
    updatedAt: 'data_atualizacao'
  }
})

module.exports = mongoose.model('user', userSchema)
