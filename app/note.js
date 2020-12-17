//Module handles showing/hiding "note".
//Note: "Enter name and price below. Press enter on your keyboard."

import {getTotal} from "./total.js";

function handleNote() {
    "use strict";

    //Get note. Check if it has "show" class.
    const note = document.getElementById("note");
    const show = note.classList.contains("show");

    //If note is shown, hide it. Invoke function to add prices.
    if (show === true) {
        note.classList.remove("show");
        note.classList.add("hide");
        getTotal();
    } else {
        getTotal();
    }
}

function returnNote() {
    "use strict";

    //Get note. Check if it has "hide" class.
    const note = document.getElementById("note");
    const hide = note.classList.contains("hide");

    //If note is hid, show it.
    if (hide === true) {
        note.classList.remove("hide");
        note.classList.add("show");
    }
}

export {handleNote, returnNote};