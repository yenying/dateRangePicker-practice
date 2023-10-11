import React from 'react';
import './style/Common.css';
import { Task1DateRangePicker } from "./component/Task1DateRangePicker";
import { Task2DateRangePicker } from "./component/Task2DateRangePicker";

function App() {
  return (
      <>
      <h1>My Range Calendar-Task1</h1>
      <Task1DateRangePicker/>
      <h1>My Range Calendar-Task2</h1>
      <Task2DateRangePicker/>
      </>
  );
}

export default App;
