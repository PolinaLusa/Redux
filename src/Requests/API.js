export const API_BASE_URL = "http://localhost:5001";

export const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (response.ok) {
      const data = await response.json();
      return data.users || [];
    } else {
      throw new Error("Failed to fetch users");
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchNotesByUserId = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes?userId=${userId}`);
    if (response.ok) {
      const data = await response.json();
      return data || [];
    } else {
      throw new Error("Failed to fetch user notes");
    }
  } catch (error) {
    console.error("Error fetching user notes:", error);
    throw error;
  }
};

export const createNote = async (noteData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to create note");
    }
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};

export const fetchNoteById = async (noteId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes/${noteId}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else if (response.status === 404) {
      throw new Error("Note not found");
    } else {
      throw new Error("Failed to fetch note");
    }
  } catch (error) {
    console.error(`Error fetching note with ID ${noteId}:`, error);
    throw error;
  }
};

export const updateNoteById = async (noteId, updatedNote) => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedNote),
    });

    if (response.ok) {
      const updated = await response.json(); 
      return updated; 
    } else if (response.status === 404) {
      throw new Error("Note not found");
    } else {
      const errorResponse = await response.json(); 
      throw new Error(`Failed to update note: ${errorResponse.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error("Error updating note:", error);
    return null; 
  }
};

export const deleteNoteById = async (noteId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return true;
    } else {
      throw new Error("Failed to delete note");
    }
  } catch (error) {
    console.error(`Error deleting note with ID ${noteId}:`, error);
    return false;
  }
};
