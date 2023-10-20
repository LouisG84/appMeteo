import React, { useState, useEffect, useRef } from "react";
import logo from '/src/logo.svg'
import '/src/App.css';

export default function Home() {

    return (
        <div className="App">
          <header className="App-header">
            
            <p>
              Editd <code>src/App.js</code> and save to reload.
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