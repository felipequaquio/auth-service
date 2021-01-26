const SignInUseCase = require('../src/application/use-cases/sign-in-use-case')
const TokenHandler = require('../src/application/security/token-handler')
const PasswordEncrypter = require('../src/application/security/password-encrypter')
const UserRepository = require('../src/infrastructure/repositories/user-repository')

describe('Sign in user use case tests', () => {
  let signInUseCase

  beforeEach(() => {
    signInUseCase = new SignInUseCase(
      new UserRepository(),
      new TokenHandler(),
      new PasswordEncrypter()
    )
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('Success', () => {
    test('Should sign in user and return user with token', async () => {
      const userData = {
        email: 'mail@mail.com',
        senha: '123abc'
      }

      jest.spyOn(UserRepository.prototype, 'findUserByEmail').mockReturnValue({
        id: 'id',
        data_criacao: 'data criacao',
        data_atualizacao: 'data atualizacao',
        token: 'token-generated'
      })
      jest.spyOn(PasswordEncrypter.prototype, 'passwordEquals').mockReturnValue(true)
      jest.spyOn(TokenHandler.prototype, 'generate').mockReturnValue('token')
      jest.spyOn(UserRepository.prototype, 'update').mockReturnValue({
        id: 'id',
        data_criacao: 'data criacao',
        data_atualizacao: 'data atualizacao',
        token: 'token-generated'
      })

      const result = await signInUseCase.signIn(userData)

      expect(result).toHaveProperty('token')
      expect(result.token).toBe('token-generated')
    })
  })

  test('Should return null if user not exist', async () => {
    const userData = {
      email: 'mail@mail.com',
      senha: '123abc'
    }

    jest.spyOn(UserRepository.prototype, 'findUserByEmail').mockReturnValue(null)

    const result = await signInUseCase.signIn(userData)

    expect(result).toBe(null)
  })

  describe('Error', () => {
    test('Should return null if password is not valid', async () => {
      const userData = {
        email: 'mail@mail.com',
        senha: '123abc'
      }

      jest.spyOn(PasswordEncrypter.prototype, 'passwordEquals').mockReturnValue(false)

      const result = await signInUseCase.signIn(userData)

      expect(result).toBe(null)
    })
  })
})
