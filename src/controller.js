import fs from 'fs'
import { pool } from './db.js'
import { format } from 'date-fns'

export const showWelcomePage = (request, response) => {
  fs.readFile('./index.html', (err, data) => {
    if (err) {
      response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
      response.end('Error al cargar la página de bienvenida')
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      response.end(data)
    }
  })
}

export const getAllEmployees = async (request, response) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM empleados')
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    response.end(JSON.stringify(rows))
  } catch (error) {
    response.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' })
    response.end(JSON.stringify({ error: 'Error al obtener los empleados' }))
  }
}

export const exportEmployees = async (request, response) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM empleados')

    let csvData = 'id,nombres,apellidos,direccion,correo,dni,edad,fecha_creacion,telefono\n'

    rows.forEach(row => {
      const fechaCreacionFormateada = format(new Date(row.fecha_creacion), 'yyyy-MM-dd')
      csvData += `${row.id},${row.nombres},${row.apellidos},${row.direccion},${row.correo_electronico},${row.dni},${row.edad},${fechaCreacionFormateada},${row.telefono}\n`
    })

    fs.writeFile('usuarios.csv', csvData, 'utf8', (err) => {
      if (err) {
        console.error('Error al escribir en el archivo usuarios.csv:', err)
        response.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' })
        response.end(JSON.stringify({ error: 'Error al guardar los datos en el archivo' }))
        return
      }
      console.log('Datos guardados correctamente en usuarios.csv')
      response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
      response.end(JSON.stringify({ message: 'Datos exportados exitosamente' }))
    })
  } catch (error) {
    response.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' })
    response.end(JSON.stringify({ error: 'Error al exportar los datos' }))
  }
}

export const importEmployees = (request, response) => {
  fs.readFile('usuarios.csv', 'utf-8', async (err, data) => {
    if (err) {
      console.error('Error al leer el archivo usuarios.csv:', err)
      response.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' })
      response.end(JSON.stringify({ error: 'Error al leer el archivo de importación' }))
      return
    }

    try {
      const lines = data.split('\n')
      const headers = lines[0].split(',')

      if (headers.length !== 9) {
        throw new Error('Formato de archivo CSV incorrecto')
      }

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim()
        if (!line) continue

        const fields = line.split(',')
        if (fields.length !== 9) {
          console.error(`Número incorrecto de campos en la línea ${i + 1}`)
          continue
        }

        const [id, nombres, apellidos, direccion, correo, dni, edad, fechaCreacion, telefono] = fields

        if (!id || !nombres || !apellidos || !direccion || !correo || !dni || !edad || !fechaCreacion || !telefono) {
          console.error(`Datos de empleado incompletos en la línea ${i + 1}`)
          continue
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(correo)) {
          console.error(`Formato de correo electrónico inválido en la línea ${i + 1}`)
          continue
        }

        const [existingUser] = await pool.execute('SELECT * FROM empleados WHERE id = ? OR correo_electronico = ?', [id, correo])
        if (existingUser.length > 0) {
          console.log(`Usuario con ID ${id} o correo ${correo} ya existe. Saltando...`)
          continue
        }

        await pool.execute(
          'INSERT INTO usuarios (id, nombres, apellidos, direccion, correo_electronico, dni, edad, fecha_creacion, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [id, nombres, apellidos, direccion, correo, dni, edad, fechaCreacion, telefono]
        )
      }

      response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
      response.end(JSON.stringify({ message: 'Datos importados exitosamente' }))
    } catch (error) {
      console.error('Error al importar los datos:', error)
      response.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' })
      response.end(JSON.stringify({ error: 'Error al importar los datos' }))
    }
  })
}
