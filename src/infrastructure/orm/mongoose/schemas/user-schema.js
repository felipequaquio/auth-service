const mongoose = require('mongoose')
const { randomUUID } = require('crypto')

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => randomUUID()
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
