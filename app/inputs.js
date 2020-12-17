//Module handles inputs fields.
//Function 1 and 2, monitor inputs, do something when user does something.
//Function 3, resets input fields

import {handleGrocery} from "./grocery.js";

//Clears placeholder values when user clicks on input.
function monitorInputsFocus() {
    "use strict";

    //Get the dialogue element (where users input name and price).
    const input = document.getElementById("input-grocery");

    //Monitor dialogue element for "keydown" event.
    //Clear the "name" and "price" placeholders when event occurs.
    input.addEventListener("focusin", function (event) {
        event.target.textContent = "";
    });
}

//Invokes function when user hits "enter/return" on keyboard.
function monitorInputsKeys() {
    "use strict";

    //Get the dialogue element (where users input name and price).
    const input = document.getElementById("input-grocery");

    //Monitor dialogue element for "keydown" event.
    input.addEventListener("keydown", function (event) {

        //If the "keydown" event is on the "return" key, prevent default.
        //Invoke function to check format of entered name and price.
        if (event.keyCode === 13) {
            event.preventDefault();
            handleGrocery();
        }
    });
}

//Resets focus, placeholder text after user adds grocery to list.
function resetInputs() {
    "use strict";

    //Gather the input fields.
    const name = document.getElementById("input-name");
    const cost = document.getElementById("input-price");

    //Return cursor to "name" field. This clears its content.
    name.focus();

    //Return placeholder text to "price" field.
    cost.textContent = "price";
}

export {monitorInputsFocus, monitorInputsKeys, resetInputs};