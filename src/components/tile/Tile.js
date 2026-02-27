import React from "react";

export const Tile = ( { name, description } ) => {
  return (
    <>
      {Object.values(description).map((value) => (
        <p key={value} className="tile">{value}</p>
      ))}
      <div className="tile-container">
        <p className="tile-title">{name}</p>
      </div>
    </>
  );
};
