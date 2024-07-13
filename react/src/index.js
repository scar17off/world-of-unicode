import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainMenuScene from "./MainMenuScene";
import EditorScene from "./Editor/EditorScene";

import Game from "./Game";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<MainMenuScene />} />
                <Route path="/game" element={<Game />} />
                <Route path="/editor" element={<EditorScene />} />
            </Routes>
        </Router>
    </StrictMode>
);