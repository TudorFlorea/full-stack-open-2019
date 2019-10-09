import React from "react";

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter show with:
      <input value={value} onChange={onChange} />
    </div>
  );
};

export default Filter;
