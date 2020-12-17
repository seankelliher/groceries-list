//Module calculates total price of groceries and places result.

import {returnNote} from "./note.js";
import {resetInputs} from "./inputs.js";

function getTotal() {
    "use strict";

    //Gather all the elements containing the "grocery-price" class.
    const prices = document.getElementsByClassName("grocery-price");

    //Get the element where total amount will be placed.
    const sumText = document.getElementById("sum-text");

    //If no "grocery-price" class exists, make the sumText $0.00.
    //This is in case user deletes all groceries on list.
    //Total is erased. Placeholder values on input fields are returned.
    //"Note" is displayed again.
    if (prices.length <= 0) {
        sumText.textContent = "$0.00";
        returnNote();
    } else {
        //Convert the resulting node list into a "real" array.
        //Retrieve its textContent.
        const text = Array.from(prices, (gc) => gc.textContent);

        //Convert string to numbers with "map".
        const numbers = text.map(Number);

        //Add the numbers with "reduce".
        const sumTotal = numbers.reduce((acc, val) => acc + val);

        //Add two spots after decimal so total appearance is : X.XX.
        const sumTotalFixed = sumTotal.toFixed(2);

        //Insert the total in the sumText button (in header).
        //Make visibile.
        sumText.textContent = "$" + sumTotalFixed;
        sumText.style.visibility = "visible";
    }

    //Invoke function to clear entered name and price from input fields.
    resetInputs();
}

export {getTotal};