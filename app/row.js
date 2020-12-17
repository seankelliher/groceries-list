//Module monitors row, removes it if user deletes grocery on list.

import {getTotal} from "./total.js";

function monitorRow() {
    "use strict";

    //Get the table.
    const table = document.querySelector("table");

    //Monitor the table for a "click" event.
    table.addEventListener("click", function (event) {

        //Get the target's row and cell index.
        const listRow = event.target.parentNode.rowIndex;
        const listCell = event.target.cellIndex;

        //If user clicks on "remove" cell, delete the row.
        //Remember numbers begin at 0. Two is really the third cell.
        if (listCell === 2) {
            table.deleteRow(listRow);

            //Invoke the function to add prices.
            //You're re-calculating total after items was removed.
            getTotal();
        }
    });
}

export {monitorRow};