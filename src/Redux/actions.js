export const FETCH_USER_NOTES_SUCCESS = "FETCH_USER_NOTES_SUCCESS";
export const DELETE_NOTE_SUCCESS = "DELETE_NOTE_SUCCESS";
export const CREATE_NOTE = "CREATE_NOTE";
export const CREATE_NOTE_SUCCESS = "CREATE_NOTE_SUCCESS";

export const registerUser = (userData) => ({
  type: "REGISTER_USER",
  payload: userData,
});

export const logoutUser = () => ({
  type: "LOGOUT_USER",
});

export const fetchUserNotesSuccess = (notes) => ({
  type: FETCH_USER_NOTES_SUCCESS,
  payload: notes,
});

export const deleteNoteSuccess = (noteId) => ({
  type: DELETE_NOTE_SUCCESS,
  payload: noteId,
});

export const createNoteSuccess = (note) => ({
  type: CREATE_NOTE_SUCCESS,
  payload: note,
});

export const UPDATE_NOTE_SUCCESS = "UPDATE_NOTE_SUCCESS";

export const updateNoteSuccess = (updatedNote) => ({
  type: UPDATE_NOTE_SUCCESS,
  payload: updatedNote,
});

