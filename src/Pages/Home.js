import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../Redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.registration.user);

  const formattedDate = (dateString) => {
    if (!dateString || isNaN(new Date(dateString))) {
      return "Registration Date is unavailable";
    }

    const parsedDate = new Date(dateString);
    return parsedDate.toLocaleString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  };

  const handleSignOut = () => {
    localStorage.removeItem("app-user");
    dispatch(logoutUser());
    navigate("/signin");
  };

  return (
    <div className="container bg-lavender flex items-center justify-center cursor-pointer">
      <div className="welcome text-left p-10">
        {user ? (
          <div>
            <h3 className="text_bold"> Welcome, {user.email}!</h3>
          </div>
        ) : (
          <h1>User not logged in</h1>
        )}
      </div>
      <div className="box p-20 w-96 rounded bg-white">
        <h2 className="text_bold">About me</h2>
        <hr />
        {user && (
          <div className="email-date">
            <p>Email: {user.email}</p>
            <p>Registered on: {formattedDate(user.createdAt)}</p>
            <Link to="/notes" className="go-to-notes">
              Go to Notes
            </Link>
          </div>
        )}
      </div>
      <div className="menu ">
        <Link to="/home" className="about">
          Home
        </Link>
        <Link to="/notes" className="notes">
          Notes
        </Link>
        <Link to="/signin" className="notes" onClick={handleSignOut}>
          Sign Out
        </Link>
      </div>
    </div>
  );
};

export default Home;
