import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Favourites from "./Favourites";

// axios is used to make the API call
const axios = require("axios").default;

function App() {
  const [data, setData] = useState([]);

  const [UserInput, setUserInput] = useState("");

  const [fav, setFav] = useState([]);

  const getFav = () => {
    axios.get("/api").then((res) => {
      // setData is used to store the data from the API
      setFav(res.data);
      console.log(fav);
    });
  };

  // ${UserInput} is used to store the UserInput from the user. It is used in the URL of the API call and is passed to the input field.
  const url = ` https://itunes.apple.com/search?term=${UserInput}`;

  /* searchUserInput is the function that is called when the user searchs with the searchbar.  */

  const searchUserInput = (event) => {
    // if the enter key is pressed, the search is executed and the data is stored in the data variable
    if (event.key === "Enter") {
      // axios is used to make the API call
      axios.get(url).then((res) => {
        // setData is used to store the data from the API
        setData(res.data);
        console.log(res.data.results);
      });
      // resets the input to an empty string
      setUserInput("");
    }
  };
  // the update function does a post request to the API and sends the data to the database. The for loop helps identify the correct data to send to the db.json
  const Update = async (id, Artistname, TrackName) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Artistname: Artistname,
        TrackName: TrackName,
      }),
    };

    for (let i = 0; i < data.results.length; i++) {
      if (data.results[i].trackId === id) {
        await fetch("/api/additem", requestOptions).then((response) =>
          response.json()
        );
      }
    }
    getFav();
  };

  return (
    <div className="app">
      <header className="p-3 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            {/* the search bar */}
            <h1 className=" text-center">iTunes Search</h1>
            <input
              className="form-control form-control-dark text-white bg-dark"
              value={UserInput}
              onChange={(event) => setUserInput(event.target.value)}
              onKeyPress={searchUserInput}
              placeholder="Search for an artist..."
              type="text"
            />
          </div>
        </div>
      </header>
      <div className="container">
        <h2>Favourites</h2>
        {/* the Favourites component  */}
        <Favourites fav={fav} />

        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {/* the search results are displayed here and the add to favourites button calls the function that adds the info to the db.json */}
              {data.results?.map((item) => {
                return (
                  <div
                    key={item.trackId}
                    style={{ border: "2px solid black", padding: "50px" }}
                  >
                    <img
                      src={item.artworkUrl100}
                      alt="artwork"
                      className="img-thumbnail"
                    />
                    <h2>{item.artistName}</h2>
                    <p>{item.trackName}</p>

                    <p>
                      Price <b>${item.trackPrice}</b>{" "}
                    </p>

                    <p>
                      <a
                        href={item.trackViewUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View URL
                      </a>
                    </p>
                    <button
                      className="btn btn-dark"
                      onClick={() =>
                        Update(item.trackId, item.artistName, item.trackName)
                      }
                    >
                      Add to Favourites
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
