import React from "react";

import NoStatistics from "./NoStatistics";
import Statistic from "./Statistic";

const StatisticsTable = ({ statistics }) => {
  if (!statistics.length) {
    return <NoStatistics />;
  }

  return (
    <table>
      <tbody>
        {statistics.map((statistic, index) => {
          return (
            <Statistic
              key={index}
              text={statistic.text}
              value={statistic.value}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default StatisticsTable;
