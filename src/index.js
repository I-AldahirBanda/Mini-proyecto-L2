import http from 'http'
import { PORT } from './config.js'
import {
  showWelcomePage,
  getAllEmployees,
  exportEmployees,
  importEmployees
} from './controller.js'

const requestHandler = (request, response) => {
  console.log(`Solicitud recibida: ${request.method} ${request.url}`)

  if (request.method === 'GET' && request.url === '/') {
    showWelcomePage(request, response)
  } else if (request.method === 'GET' && request.url === '/empleados') {
    getAllEmployees(request, response)
  } else if (request.method === 'POST' && request.url === '/export') {
    exportEmployees(request, response)
  } else if (request.method === 'POST' && request.url === '/import') {
    importEmployees(request, response)
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Ruta no encontrada')
  }
}

const server = http.createServer(requestHandler)

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})
