import services from './src/services'
const { health, user, game } = services

export default ({basePath}, router) => {
  router.get(`${basePath}/health`, health.get)

  // users
  router.post(`${basePath}/login`, user.login)
  router.get(`${basePath}/user`, user.show)
  router.post(`${basePath}/register`, user.create)

  // games
  router.post(`${basePath}/game`, game.create)
  router.get(`${basePath}/games`, game.list)
  router.delete(`${basePath}/game/:id`, game.destroy)
  router.post(`${basePath}/game/:id/mark`, game.mark)
}
