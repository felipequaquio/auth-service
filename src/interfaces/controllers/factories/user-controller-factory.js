const CreateUserUseCase = require('../../../application/use-cases/create-user-use-case')
const SignInUseCase = require('../../../application/use-cases/sign-in-use-case')
const GetUserByIdUseCase = require('../../../application/use-cases/get-user-by-id-use-case')
const UserRepository = require('../../../infrastructure/repositories/user-repository')
const TokenHandler = require('../../../application/security/token-handler')
const PasswordEncrypter = require('../../../application/security/password-encrypter')
const UserController = require('../../../interfaces/controllers/user-controller')

module.exports = class UserControllerFactory {
  static getInstance () {
    const userRepository = new UserRepository()
    const tokenHandler = new TokenHandler()
    const passwordEncrypter = new PasswordEncrypter()
    const createUserUseCase = new CreateUserUseCase(
      userRepository,
      tokenHandler,
      passwordEncrypter
    )
    const signInUseCase = new SignInUseCase(
      userRepository,
      tokenHandler,
      passwordEncrypter
    )
    const getUserByIdUseCase = new GetUserByIdUseCase(
      userRepository
    )

    return new UserController(createUserUseCase, signInUseCase, getUserByIdUseCase)
  }
}
