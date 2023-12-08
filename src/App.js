import Registration from "./Components/Registration.js";
import SignIn from "./Components/SignIn.js";
import Footer from "./Components/Footer.js";
import Home from "./Pages/Home.js";
import Notes from "./Pages/Notes.js";
import CreateNote from "./Pages/CreateNote.js";
import EditNote from "./Pages/EditNote.js";
import NoteView from "./Pages/NoteView.js";
import NotFound from "./Pages/NotFound.js";
import { UserProvider } from "./Utils/UserContext.js";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "./Redux/actions.js";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const userString = localStorage.getItem("app-user");

    const user = JSON.parse(userString);

    if (!user) {
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/users/${user.id}`);
        if (response.ok) {
          const userData = await response.json();
          if (userData) {
            dispatch(registerUser(userData));
          }
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [dispatch]);

  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/create-note" element={<CreateNote />} />
          <Route path="/note/:noteId" element={<NoteView />} />
          <Route path="/edit/:noteId" element={<EditNote />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </UserProvider>
    </Router>
  );
};

export default App;
