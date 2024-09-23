import React, { Component } from "react";
import "./App.css";
import StudentList from "./components/StudentList";

class App extends Component {
  
  render() {
    return (
      <div>
        <div className="container">
          <StudentList />
        </div>
      </div>
    );
  }
}
export default App;