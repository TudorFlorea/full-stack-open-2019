import React from "react";

const UserDetails = ({ user, onLogOut }) => {
  return (
    <p>
      {user.name} logged in{" "}
      <button
        onClick={() => {
          onLogOut();
        }}
      >
        logout
      </button>
    </p>
  );
};

export default UserDetails;
