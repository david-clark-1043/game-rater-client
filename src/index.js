import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { GameRater } from "./components/GameRater.js"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <GameRater />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)
