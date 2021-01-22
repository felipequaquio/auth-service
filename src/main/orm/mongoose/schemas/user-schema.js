const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
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
