
[![NPM Download](https://img.shields.io/npm/dt/remove-child-node-error-debugger.svg)](https://www.npmjs.com/package/remove-child-node-error-debugger)
[![npm version](https://badge.fury.io/js/remove-child-node-error-debugger.svg)](https://badge.fury.io/js/remove-child-node-error-debugger)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight, framework-agnostic debugging tool designed to identify DOM-related issues, specifically the "Failed to execute 'removeChild' on Node" error. This error is often caused by third-party libraries such as Google Translate in various JavaScript environments.

## Features

- Finding which dom node cause the transalation error is very time consuming process, this debugger does this job easy for you.
- Identifies and logs DOM manipulation errors
- Highlights problematic DOM elements visually
- Works with any JavaScript framework or vanilla JS
- Customizable debugging options

## Installation

```bash
npm install remove-child-node-error-debugger
```

Once the package is installed, import startDebugger function from package. 

```bash 
import  { startDebugger }  from "remove-child-node-error-debugger";
```

## Example

- To start debugging, place the startDebugger function at the top level of your application, such as in "index.js" or "app.js".

```bash
import {useState} from "react";
import "./App.css";

import  { startDebugger }  from "remove-child-node-error-debugger";

function App() {

  const [show, setShow] = useState(false);

  // Only use for debugging purpose
  startDebugger();

  return (
    <div className="App">
      <div style={{ "margin-top": "10px"}}>
        <button onClick={() => setShow((prev) => !prev)} style={{ "margin-bottom": "15px"}}>Toggle Me</button>
        <br />
        {show && 'TESTING'}
        <span>Lorem Ipsum</span>
    </div>
    </div>
  );
}

export default App;
```
- In the above example, I have attempted to reproduce the React "DOMException: Failed to execute 'removeChild' on 'Node'" error by translating the page using Google Translate. When this error occurs, the startDebugger function will highlight the DOM node causing the error. You can also see which node caused the error in the console.

## Output

[Screencast from 03-08-24 12:21:40 AM IST.webm](https://github.com/user-attachments/assets/5d183b95-4c47-40aa-ab49-98e6542da485)

Link : https://youtu.be/vt5fpE0bzSY



