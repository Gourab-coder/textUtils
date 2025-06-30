import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Body_part = () => {
    const [text, setText] = useState("");
    const [transformed, setTransformed] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setText(e.target.value);
        setTransformed(e.target.value);
    };

    const toUpperCase = () => {
        setTransformed(text.toUpperCase());
    };

    const toLowerCase = () => {
        setTransformed(text.toLowerCase());
    };

    const toCapitalize = () => {
        const capitalized = text
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
        setTransformed(capitalized);
    };

    const goToTypingTest = () => {
        navigate("/typing-test"); // Replace with your actual route
    };

    return (
        <div id="body_input_div">
            <div id="body_view_div">{transformed || "view here"}</div>
            <br />
            <input 
                id="body_input" 
                type="text" 
                placeholder="type here..." 
                value={text} 
                onChange={handleChange} 
            />
            <div id="body_btn_div">
                <button className="body_btn" onClick={toUpperCase}>Upper Case</button>
                <button className="body_btn" onClick={toLowerCase}>Lower Case</button>
                <button className="body_btn" onClick={toCapitalize}>Capitalize</button>
            </div>
            <button id="body_btn_test" onClick={goToTypingTest}>Typing Speed Tester</button>
        </div>
    );
}

export default Body_part;