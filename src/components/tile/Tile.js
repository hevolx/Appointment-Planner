import React from "react";

export const Tile = ( { name, description } ) => {
  return (
    <>
      {Object.values(description).map((value) => (
        <p key={value} className="tile">{value}</p>
      ))}
    </>
  );
};
