import React from "react";
// fav state passed from App.js
function Favourites({ fav }) {
  return (
    <>
      {fav?.map((favs) => {
        // the favourites information is mapped here
        return (
          <div className="row mt-1" key={favs.trackId}>
            <div className=" order-md-2">
              <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0"> {favs.Artistname}</h6>
                    <small className="text-muted"> {favs.TrackName}</small>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Favourites;
