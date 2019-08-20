import React, { useState } from "react";
import ReactDOM from "react-dom";

import Button from "./components/Button";
import Heading from "./components/Heading";
import StatisticsTable from "./components/StatisticsTable";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const statistics = [];

  const all = good + neutral + bad;
  if (all !== 0) {
    statistics.push({ text: "good", value: good });
    statistics.push({ text: "neutral", value: neutral });
    statistics.push({ text: "bad", value: good });
    statistics.push({ text: "all", value: all });
    let average = (good - bad) / all;
    let positive = (good * 100) / all + " %";
    statistics.push({ text: "average", value: average });
    statistics.push({ text: "positive", value: positive });
  }

  return (
    <div>
      <Heading text="give feedback" />
      <Button
        onClick={() => {
          console.log("ggod", good, setGood);
          setGood(good + 1);
        }}
        text="good"
      />
      <Button
        onClick={() => {
          setNeutral(neutral + 1);
        }}
        text="neutral"
      />
      <Button
        onClick={() => {
          setBad(bad + 1);
        }}
        text="bad"
      />
      <Heading text="statistics" />

      <StatisticsTable statistics={statistics} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
