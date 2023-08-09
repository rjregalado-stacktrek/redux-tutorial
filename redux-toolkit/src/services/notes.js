import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

// CRUD
const getAll = async () => {
  const response = await axios.get(baseUrl) // GET Method
  return response.data
}

const createNew = async (content) => {
  const object = { content, important: false }
  const response = await axios.post(baseUrl, object) // POST METHOD
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew }
