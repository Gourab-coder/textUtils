import React from "react";

const Body_part = () => {

    return (
        <div id="body_input_div">
            <div id="body_view_div">view here</div>
            <br />
            <input id="body_input" type="text" placeholder="type here..." />
            <div id="body_btn_div">
                <button class="body_btn">Upper Case</button>
                <button class="body_btn">Lower Case</button>
                <button class="body_btn">Upper Case</button>
            </div>
            <button id="body_btn_test">typing speed tester</button>
        </div>
    )
}

export default Body_part;