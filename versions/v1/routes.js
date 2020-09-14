import services from './src/services'
const { health, user } = services

export default ({basePath}, router) => {
  router.get(`${basePath}/health`, health.get)

  // users
  router.post(`${basePath}/login`, user.login)
  router.get(`${basePath}/user`, user.show)
  router.post(`${basePath}/register`, user.create)
}
