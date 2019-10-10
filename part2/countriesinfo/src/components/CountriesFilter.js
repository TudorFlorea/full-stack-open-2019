import React from "react";

const ContriesFilter = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="countries-search">find countries</label>
      <input
        type="text"
        id="countries-search"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default ContriesFilter;
