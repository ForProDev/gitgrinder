import React, { Fragment, useState } from "react";
import moment from "moment";
import "./App.css";

const App = () => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [alert, setAlert] = useState("");

  const loadUser = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://api.github.com/users/${user}`);
    const result = await res.json();
    if (result.message === "Not Found") {
      setAlert("Invalid UserId");
      return;
    }
    setUserData(result);
    setAlert("");
    setLoading(true);
    setUser("");
  };

  return (
    <Fragment>
      <header className="header">
        <div className="header_box">
          <h4 className="heading-secondary">
            Access the performance of any <span>Github user</span> with it’s
            stats
          </h4>
          <p className="peragraph-dark">
            A React app used to access the data of a github user by typing the
            github userId in the search bar.
          </p>
          <form className="search-form" onSubmit={loadUser}>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
          {alert !== "" && (
            <div className="alert">
              <p>{alert}</p>
            </div>
          )}
          <h4 className="heading-secondary">Top Searches</h4>
          <div className="top-search">
            <button
              onClick={() => {
                setUser("Rish7223");
              }}
            >
              Rish7223
            </button>
            <button
              onClick={() => {
                setUser("ForProDev");
              }}
            >
              ForProDev
            </button>
            <button
              onClick={() => {
                setUser("ReactJs");
              }}
            >
              ReactJS
            </button>
          </div>
        </div>
      </header>
      {alert === "" && loading && (
        <div className="main">
          <div className="user-info">
            <div className="user-card">
              <img src={userData.avatar_url} alt="user-img" />
              <div className="text">
                <h2 className="heading-primary">
                  {userData.name} - <span>({userData.login})</span>
                </h2>
                <p className="peragraph-dark">{userData.bio}</p>
                <h4 className="heading-tertiary">
                  Location: <span>{userData.location}</span>
                </h4>
                <h4 className="heading-tertiary">
                  Blog:{" "}
                  <span>
                    <a href={userData.blog}>{userData.blog}</a>
                  </span>
                </h4>
                <h4 className="heading-tertiary">
                  Created-at:{" "}
                  <span>
                    {moment(userData.created_at).format("DD-MMM-YYYY")}
                  </span>
                </h4>
              </div>
            </div>
            <div className="user-stat">
              <div className="repo">
                <h1>{userData.public_repos}</h1>
                <h2>Repositories</h2>
              </div>
              <div className="followers">
                <h1>{userData.followers}</h1>
                <h2>Followers</h2>
              </div>
              <div className="following">
                <h1>{userData.following}</h1>
                <h2>Following</h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default App;
