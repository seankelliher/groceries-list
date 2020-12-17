//Modules handles grocery name and price after user submits them.
//Checks the input's integrity.
//Creates row in table.
//Places grocery name and price in row.

import {handleNote} from "./note.js";

function handleGrocery() {
    "use strict";

    //Retrieve the name and price user entered.
    const name = document.getElementById("input-name").textContent;
    const price = document.getElementById("input-price").textContent;

    //Check price - all numbers + no more than 2 digits after decimal.
    const priceCheck = /^\d*\.?\d{1,2}$/.test(price);

    //If name is blank, return alert.
    //If price doesn't match pattern, return alert.
    //If both are fine, return the name and price.
    if (priceCheck === false) {
        window.alert("Hey, that's not a price!");
    } else if (name === "") {
        window.alert("Hey, you need a name for that grocery!");
    } else {

        //Convert price to a number.
        //Make format .XX in case use enters "X no decimal" or "X.X".
        //Convert number back to string to insert in cell.
        //Note: There may be a better, more elegant regex way to do this.
        const priceNum = Number(price);
        const priceNumFix = priceNum.toFixed(2);
        const priceNumFixString = priceNumFix.toString();

        //Retrieve the table.
        const table = document.querySelector("table");

        //Then insert a row and three cells into it.
        //-1 inserts row at end of table.
        const row = table.insertRow(-1);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);

        //Assign the name and price to their cells.
        cell1.textContent = name;
        cell2.textContent = priceNumFixString;

        //Add class names to the three cells.
        cell1.className = "grocery-name";
        cell2.className = "grocery-price";
        cell3.className = "grocery-remove";

        //Create img element. Set its source. Add it to table row.
        const image = document.createElement("img");
        image.src = "svg/baseline-close-24px.svg";
        cell3.appendChild(image);

        //Check if "note" should be shown or hide.
        //It's hid after first grocery is entered.
        //It's returned again if user deletes all items on list.
        handleNote();
    }
}

export {handleGrocery};