import logger from '../logger.js'
export function failRoute(req, res) {
  const title = 'ROUTING ERROR';
  const { url, method } = req
  logger.warn(`Route ${method} ${url} no existe`)
  res.status(404).json({ titulo: title });
}