import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotesByUserId, deleteNoteById } from "../Requests/API";
import { fetchUserNotesSuccess, deleteNoteSuccess } from "../Redux/actions";

const Notes = () => {
  const dispatch = useDispatch();
  const userNotes = useSelector((state) => state.notes.userNotes);
  const user = useSelector((state) => state.registration.user);
  const navigate = useNavigate();

  console.log(user);

  useEffect(() => {
    const fetchUserNotes = async () => {
      try {
        if (!user) {
          return;
        }

        const data = await fetchNotesByUserId(user.id);
        dispatch(fetchUserNotesSuccess(data || []));
      } catch (error) {
        console.error("Error fetching user notes:", error);
      }
    };

    fetchUserNotes();
  }, [dispatch, user]);

  const handleDeleteNote = async (noteId) => {
    try {
      const deleted = await deleteNoteById(noteId);
      if (deleted) {
        dispatch(deleteNoteSuccess(noteId));
      } else {
        throw new Error("Error deleting note");
      }
    } catch (error) {
      console.error(`Error deleting note with ID ${noteId}:`, error);
    }
  };

  const handleSignOutAndRedirect = () => {
    navigate("/signin");
  };

  return (
    <div className="container">
      <div className="menu">
        <Link to="/home" className="about">
          Home
        </Link>
        <Link to="/notes" className="notes">
          Notes
        </Link>
        <Link to="/signin" className="notes" onClick={handleSignOutAndRedirect}>
          Sign Out
        </Link>
      </div>
      <div className="box p-6">
        <h2 className="text_bold">Notes</h2>
        {userNotes && userNotes.length > 0 ? (
          <ul className="notes-list">
            {userNotes.map((note) => (
              <li key={note.id} className="border p-4 mb-4 rounded">
                <h3 className="text">{note.title}</h3>
                <p>{note.createdAt}</p>
                <div className="note-icons mt-2">
                  <Link to={`/edit/${note.id}`}>
                    <span
                      role="img"
                      aria-label="Edit a note"
                      className="mr-2 cursor-pointer"
                    >
                      ✏️
                    </span>
                  </Link>
                  <span
                    role="img"
                    aria-label="Delete a note"
                    className="cursor-pointer"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    🗑
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center mb-4">
            You don't have any notes right now.
          </p>
        )}
        <hr className="my-4" />
        <Link to="/create-note" className="create">
          Create a note
        </Link>
      </div>
    </div>
  );
};

export default Notes;
