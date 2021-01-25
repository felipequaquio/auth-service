const UserRepository = require('../../infrastructure/repositories/user-repository')
const TokenHandler = require('../../application/security/token-handler')
const PasswordEncrypter = require('../../application/security/password-encrypter')
const CreateUserUseCase = require('../../application/use-cases/create-user-use-case')
const MissingParamError = require('../../utils/errors/missing-param-error')
const InternalServerError = require('../../utils/errors/internal-server-error')
const mongoose = require('mongoose')
const env = require('../../infrastructure/config/environment')

beforeAll(done => {
  const uri = `${env.DB_URI}/${env.DB_NAME}`

  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })

  done()
})

afterAll(done => {
  mongoose.connection.close()

  done()
})

const makeUserRepository = () => {
  return new UserRepository()
}

const makeTokenHandler = () => {
  return new TokenHandler()
}

const makePasswordEncrypter = () => {
  return new PasswordEncrypter()
}

const makeSystemUnderTest = () => {
  const userRepository = makeUserRepository()
  const tokenHandler = makeTokenHandler()
  const passwordEncrypter = makePasswordEncrypter()

  const systemUnderTest = new CreateUserUseCase(
    userRepository, tokenHandler, passwordEncrypter
  )

  return systemUnderTest
}

describe('Create user use case test', () => {
  test('Should throw missing param error if no name is provided', async () => {
    try {
      const httpRequestUserData = {
        email: 'mail@mail.com',
        senha: '123abc',
        telefones: [
          {
            numero: 99999999,
            ddd: 32
          }
        ]
      }

      const systemUnderTest = makeSystemUnderTest()

      await systemUnderTest.create(httpRequestUserData)
    } catch (error) {
      expect(error).toBeInstanceOf(MissingParamError)
    }
  })

  test('Should throw missing param error if no email is provided', async () => {
    try {
      const httpRequestUserData = {
        nome: 'Teste',
        senha: '123abc',
        telefones: [
          {
            numero: 99999999,
            ddd: 32
          }
        ]
      }

      const systemUnderTest = makeSystemUnderTest()

      await systemUnderTest.create(httpRequestUserData)
    } catch (error) {
      expect(error).toBeInstanceOf(MissingParamError)
    }
  })

  test('Should throw missing param error if no password is provided', async () => {
    try {
      const httpRequestUserData = {
        nome: 'Teste',
        email: 'mail@mail.com',
        telefones: [
          {
            numero: 99999999,
            ddd: 32
          }
        ]
      }

      const systemUnderTest = makeSystemUnderTest()

      await systemUnderTest.create(httpRequestUserData)
    } catch (error) {
      expect(error).toBeInstanceOf(MissingParamError)
    }
  })

  test('Should throw missing param error if no telefones are provided', async () => {
    try {
      const httpRequestUserData = {
        nome: 'Teste',
        email: 'mail@mail.com',
        senha: '123abc'
      }

      const systemUnderTest = makeSystemUnderTest()

      await systemUnderTest.create(httpRequestUserData)
    } catch (error) {
      expect(error).toBeInstanceOf(MissingParamError)
    }
  })

  test('Should return null if user exists', async () => {
    const httpRequestUserData = {
      nome: 'Teste',
      email: 'teste@mail.com',
      senha: '123abc',
      telefones: [
        {
          numero: 99999999,
          ddd: 32
        }
      ]
    }

    const systemUnderTest = makeSystemUnderTest()

    const user = await systemUnderTest.create(httpRequestUserData)

    expect(user).toBeNull()
  })

  test('Should throw internal server error if no token is generated ', async () => {
    try {
      const httpRequestUserData = {
        nome: 'Teste',
        email: 'teste@mail.com',
        senha: '123abc',
        telefones: [
          {
            numero: 99999999,
            ddd: 32
          }
        ]
      }

      const systemUnderTest = makeSystemUnderTest()

      await systemUnderTest.create(httpRequestUserData)
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerError)
    }
  })

  test('Should throw internal server error if no password hash is generated ', async () => {
    try {
      const httpRequestUserData = {
        nome: 'Teste',
        email: 'teste@mail.com',
        senha: '123abc',
        telefones: [
          {
            numero: 99999999,
            ddd: 32
          }
        ]
      }

      const systemUnderTest = makeSystemUnderTest()

      await systemUnderTest.create(httpRequestUserData)
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerError)
    }
  })
})
