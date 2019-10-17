import React from "react";

const Notification = ({ message, isError = false }) => {
  const classes = isError ? "error" : "notification";
  return <p className={classes}>{message}</p>;
};

export default Notification;
