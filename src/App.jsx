import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Body_part from "./components/Body_part";
import Tester from "./components/Tester";


const App = () => {

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Body_part />} />
                <Route path="/typing-test" element={<Tester />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;