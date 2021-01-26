const GetUserByIdUseCase = require('../src/application/use-cases/get-user-by-id-use-case')
const UserRepository = require('../src/infrastructure/repositories/user-repository')

describe('Get user by id use case tests', () => {
  let getUserByIdUseCase

  beforeEach(() => {
    getUserByIdUseCase = new GetUserByIdUseCase(
      new UserRepository()
    )
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('Success', () => {
    test('Should return user if user exists and token param is the same of user token', async () => {
      const userData = {
        id: 'userid',
        token: 'token'
      }

      jest.spyOn(UserRepository.prototype, 'getUserById').mockReturnValue({ token: 'token' })

      const result = await getUserByIdUseCase.getUserById(userData.id, userData.token)

      expect(result.token).toBe(userData.token)
    })
  })

  describe('Error', () => {
    test('Should return null if user token and param token are different ', async () => {
      const userData = {
        id: 'userid',
        token: 'token'
      }

      jest.spyOn(UserRepository.prototype, 'getUserById').mockReturnValue(null)

      const result = await getUserByIdUseCase.getUserById(userData.id, userData.token)

      expect(result).toEqual(null)
    })
  })
})
