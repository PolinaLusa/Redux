export const registrationReducer = (
  state = {
    user: null,
    registrationErrors: {},
  },
  action
) => {
  switch (action.type) {
    case "REGISTER_USER":
      return {
        ...state,
        user: action.payload,
        registrationErrors: {},
      };
    case "REGISTRATION_FAILED":
      return {
        ...state,
        registrationErrors: action.payload,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export const notesReducer = (
  state = {
    userNotes: [],
    notes: [],
  },
  action
) => {
  switch (action.type) {
    case "FETCH_USER_NOTES_SUCCESS":
      return {
        ...state,
        userNotes: action.payload,
      };
    case "DELETE_NOTE_SUCCESS":
      return {
        ...state,
        userNotes: state.userNotes.filter((note) => note.id !== action.payload),
      };
    case "CREATE_NOTE":
      return {
        ...state,
        notes: [...state.notes, action.payload], 
      };
    default:
      return state;
  }
};
