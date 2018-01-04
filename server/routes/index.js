const ROUTES = [
  '/login',
  '/product',
  '/users',
  '/user'
]

module.exports = function routes(server) {
  const app = server.get('app')
  const _error = app.getRequestHandler()
  ROUTES.map(route => {
    const router = require(`.${route}`)(server)
    return server.use(route, router)
  })
  server.get('*', _error)
}
