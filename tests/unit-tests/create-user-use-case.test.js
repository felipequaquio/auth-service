const CreateUserUseCase = require('../../src/application/use-cases/create-user-use-case')
const MissingParamError = require('../../src/utils/errors/missing-param-error')
const TokenHandler = require('../../src/application/security/token-handler')
const PasswordEncrypter = require('../../src/application/security/password-encrypter')
const UserRepository = require('../../src/infrastructure/repositories/user-repository')

describe('Create user use case tests', () => {
  let createUserUseCase

  beforeEach(() => {
    createUserUseCase = new CreateUserUseCase(
      new UserRepository(),
      new TokenHandler(),
      new PasswordEncrypter()
    )
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('Success', () => {
    test('Should create user and return user created with token', async () => {
      const userData = {
        nome: 'Teste',
        email: 'mail@mail.com',
        senha: '123abc',
        telefones: []
      }
      jest.spyOn(UserRepository.prototype, 'findUserByEmail').mockReturnValue(null)
      jest.spyOn(TokenHandler.prototype, 'generate').mockReturnValue('token')
      jest.spyOn(UserRepository.prototype, 'create').mockReturnValue({
        id: 'id',
        data_criacao: 'data criacao',
        data_atualizacao: 'data atualizacao',
        token: 'token-generated'
      })

      const result = await createUserUseCase.create(userData)

      expect(result).toHaveProperty('token')
      expect(result.token).toBe('token-generated')
    })

    test('Should return null when create user if user exists', async () => {
      const userData = {
        nome: 'Teste',
        email: 'mail@mail.com',
        senha: '123abc',
        telefones: []
      }

      jest.spyOn(UserRepository.prototype, 'findUserByEmail').mockReturnValue({ email: 'mail@mail.com' })

      const result = await createUserUseCase.create(userData)

      expect(result).toBe(null)
    })
  })

  describe('Error', () => {
    test('Should return missing param error when name is not provided', async () => {
      jest.spyOn(CreateUserUseCase.prototype, 'create').mockReturnValue(() => {
        throw new MissingParamError('nome')
      })
      const userData = {
        email: 'mail@mail.com',
        senha: '123abc',
        telefones: [{
          numero: 99999999,
          ddd: 32
        }]
      }

      const user = await createUserUseCase.create(userData)
      expect(user).toThrowError(new MissingParamError('nome'))
    })

    test('Should return missing param error when email is not provided', async () => {
      jest.spyOn(CreateUserUseCase.prototype, 'create').mockReturnValue(() => {
        throw new MissingParamError('email')
      })
      const userData = {
        nome: 'Teste',
        senha: '123abc',
        telefones: [{
          numero: 99999999,
          ddd: 32
        }]
      }

      const user = await createUserUseCase.create(userData)
      expect(user).toThrowError(new MissingParamError('email'))
    })

    test('Should return missing param error when password is not provided', async () => {
      jest.spyOn(CreateUserUseCase.prototype, 'create').mockReturnValue(() => {
        throw new MissingParamError('senha')
      })
      const userData = {
        nome: 'Teste',
        email: 'mail@mail.com',
        telefones: [{
          numero: 99999999,
          ddd: 32
        }]
      }

      const user = await createUserUseCase.create(userData)
      expect(user).toThrowError(new MissingParamError('senha'))
    })

    test('Should return missing param error when phones are not provided', async () => {
      jest.spyOn(CreateUserUseCase.prototype, 'create').mockReturnValue(() => {
        throw new MissingParamError('senha')
      })
      const userData = {
        nome: 'Teste',
        email: 'mail@mail.com',
        senha: '123abc'
      }

      const user = await createUserUseCase.create(userData)
      expect(user).toThrowError(new MissingParamError('senha'))
    })
  })
})
