/**
 *
 * React Query is a server-state library, responsible for managing 
   asynchronous operations between your server and client
  
   Redux, etc. are client-state libraries that can be used to store asynchronous 
   data, albeit inefficiently when compared to a tool like React Query
   
   So React Query is a library that maintains the server state in the frontend, 
   i.e. acts as a cache for what is stored on the server. 

   React Query simplifies the processing of data on the server, 
   and can in some cases eliminate the need for data on the server 
   to be saved in the frontend state.

   Most React applications need not only a way to temporarily store the served data, 
   but also some solution for how the rest of the frontend state 
   (e.g. the state of forms or notifications) is handled.

   npm install react-query

   npm install json-server --save-dev

   add the following code in `package.json`
      
   "scripts": {
   "server": "json-server -p3001 --watch db.json",
    // ...
}
 
 * 
 */

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getNotes, createNote, updateNote, deleteNote } from './requests';

const App = () => {
  const queryClient = useQueryClient();
  const [showImportant, setShowImportant] = useState(false);

  const newNoteMutation = useMutation(createNote, {
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData('notes') || [];
      queryClient.setQueryData('notes', notes.concat(newNote));
    },
  });

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    const important = event.target.important.checked;
    event.target.note.value = '';
    newNoteMutation.mutate({ content, important });
  };

  const updateNoteMutation = useMutation(updateNote, {
    onSuccess: () => {
      queryClient.invalidateQueries('notes');
    },
  });

  const deleteNoteMutation = useMutation(deleteNote, {
    onSuccess: () => {
      queryClient.invalidateQueries('notes');
    },
  });

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({ ...note, important: !note.important });
  };

  const result = useQuery('notes', getNotes, {
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) {
    return <div className="text-center mt-4">loading data...</div>;
  }

  const notes = result.data || [];

  const toggleShowImportant = () => {
    setShowImportant(!showImportant);
  };

  const listItemClasses = 'cursor-pointer p-2 border rounded-lg mb-2 flex items-center justify-between';

  // Filter the notes based on importance
  const filteredNotes = showImportant ? notes.filter((note) => note.important) : notes;

  return (
    <div className="container mx-auto max-w-lg mt-4">
      <h2 className="text-2xl font-bold mb-2">Notes app - React Query</h2>
      <form onSubmit={addNote} className="flex mb-4">
        <input name="note" className="p-2 border rounded mr-2 flex-grow" />
        <label className="flex items-center">
          Important:
          <input type="checkbox" name="important" className="ml-1" />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded ml-2 hover:bg-blue-600"
        >
          Add
        </button>
      </form>
      <button
        onClick={toggleShowImportant}
        className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
      >
        Show {showImportant ? 'All notes' : 'Important Notes'}
      </button>

      <ul className="list-none mt-4">
        {filteredNotes.map((note) => (
          <li
            key={note.id}
            onClick={() => toggleImportance(note)}
            className={listItemClasses}
          >
            <span>{note.content}</span>
            <span className={`text-sm font-semibold ${note.important ? 'text-red-500' : ''}`}>
              {note.important ? 'important' : ''}
            </span>
            <button
              onClick={(event) => {
                event.stopPropagation(); // Prevent the onClick on li from firing
                deleteNoteMutation.mutate(note.id);
              }}
              className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

/**

1. **Imports:**
   - The necessary modules are imported, including `useState`, `useQuery`, `useMutation`, and `useQueryClient` from `react-query`.
   - The `getNotes`, `createNote`, `updateNote`, and `deleteNote` functions are imported from a `requests.js` module.

2. **App Component:**
   - The `App` component is defined as the main functional component.
   - The `useQueryClient` hook initializes a `queryClient` instance, which is used to interact with the React Query cache.
   - The `showImportant` state variable is used to toggle between showing all notes and only showing important notes.

3. **Mutations:**
   - The `useMutation` hook is used to create mutations for adding, updating, and deleting notes.
   - The `newNoteMutation` mutation is triggered when adding a new note. It updates the cache using the `setQueryData` method to append the new note 
     to the existing notes.
   - The `addNote` function is used to handle the form submission when adding a new
     note. It extracts the note content and importance from the form and uses the `newNoteMutation` mutation to add the note to the cache.

4. **Data Fetching:**
   - The `useQuery` hook is used to fetch notes data. The `getNotes` function is called to retrieve notes from the server.
   - The result of the query is stored in the `result` variable, and the notes are extracted from `result.data`.

5. **Rendering:**
   - If data is loading, a loading message is displayed.
   - The list of notes is displayed in an unordered list (`ul`).
   - Each note item is rendered as an `li` element.
   - The note's content is displayed along with an indicator of its importance (`important` or not).
   - A "Delete" button is provided to delete the note. The button uses the `deleteNoteMutation` mutation when clicked.

6. **Filtering:**
   - A "Show Important Notes" button toggles the `showImportant` state, changing whether only important notes are displayed or all notes are shown.
   - The `filteredNotes` variable is used to display either all notes or only important notes based on the `showImportant` state.

7. **Styling:**
   - Tailwind CSS classes are used to style various elements, including the form, buttons, and list items.

 */


