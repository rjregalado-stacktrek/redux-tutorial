// npm install axios

import axios from "axios";

const baseUrl = 'http://localhost:3001/notes'

export const getNotes = () => {
    return axios.get(baseUrl).then(res=>res.data)
}

export const createNote = newNote => axios.post(baseUrl, newNote).then(res=>res.data)

export const updateNote = updatedNote => axios.put(`${baseUrl}/${updatedNote.id}`,  updatedNote).then(res => res.data)

export const deleteNote = (noteId) => {
  return axios.delete(`${baseUrl}/${noteId}`).then(res => res.data);
};
