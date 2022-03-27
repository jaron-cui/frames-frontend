import logo from './logo.svg';
import './App.css';
import Canvas from "./gameframe/Canvas";
import React, {useState, useEffect} from "react";

//const worker = new Worker("worker.js");
//const canvas = <Canvas name="canvas" width={400} height={300} worker={worker}/>;
    //const animator = new Animator("canvas");
function App() {
  //useEffect(() => {
  //  animator.run();
  //}, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" id="1"/>
        <Canvas name="canvas" width={400} height={300} />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
