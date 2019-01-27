//Global "variable" (actually "let").
let market;

//Ensure the DOM is loaded.
document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    //Invoke functions with event listeners.
    market.readyBoxes();
    market.readyKeys();
    market.removeTheRow();

}); //close DOMContentLoaded function.

//The "market" "variable" (actually "let").
market = {

    readyBoxes: function () {
        "use strict";

        const input = document.getElementById("input-grocery");

        //Monitor the table for "focus" event.
        //Clear the "name" and "price" placeholders when event occurs.
        input.addEventListener("focusin", function (element) {
            element.target.textContent = "";
        });
    },

    readyKeys: function () {
        "use strict";

        const input = document.getElementById("input-grocery");

        //Monitor the keyboard for "keydown" event.
        input.addEventListener("keydown", function (event) {

            //If the "keydown" event is on the "return" key...
            //prevent default action, invoke the retrieveTheNumbers function.
            if (event.keyCode === 13) {
                event.preventDefault();
                market.checkInsertContent();
            }
        });
    },

    checkInsertContent: function () {
        "use strict";

        //Retrieve the "grocery name" and grocery price" user entered.
        const name = document.getElementById("input-grocery-name").textContent;
        const cost = document.getElementById("input-grocery-cost").textContent;

        //Run regex on the "grocery price" to check it's all numbers...
        //and has no more than two digits after the decimal point.
        const costReCheck = /^\d*\.?\d{1,2}$/.test(cost);

        //If "grocery name" is blank, return alert.
        //If "grocery price" doesn't match pattern, return alert.
        //If both are fine, return the name and price.
        if (costReCheck === false) {
            window.alert("Hey, that's not a price!");
        } else if (name === "") {
            window.alert("Hey, you need a name for that grocery!");
        } else {

            //Convert "grocery price" to a number.
            //Make format .XX in case use enters "X no decimal" or "X.X".
            //Convert number back to string to insert in cell.
            //Note: There may be a better, more elegant regex way to do this.
            const costNum = Number(cost);
            const costNumFix = costNum.toFixed(2);
            const costNumFixString = costNumFix.toString();

            //Retrieve the table, display it...
            const groceryTable = document.getElementById("grocery-list");
            groceryTable.style.display = "table";

            //Then insert a row and three cells into it.
            //-1 inserts row at end of table.
            const groceryRow = groceryTable.insertRow(-1);
            const groceryCellName = groceryRow.insertCell(0);
            const groceryCellCost = groceryRow.insertCell(1);
            const groceryCellRemove = groceryRow.insertCell(2);

            //Assign the "grocery name" and "grocery price" to their cells.
            groceryCellName.textContent = name;
            groceryCellCost.textContent = costNumFixString;

            //Add an "x" to the third cell. This is the "delete row" "x".
            groceryCellRemove.textContent = "x";

            //Add class names to the three cells.
            groceryCellName.className = "grocery-name";
            groceryCellCost.className = "grocery-cost";
            groceryCellRemove.className = "grocery-remove";

            //Invoke the runTheNumbers function.
            market.runTheNumbers();
        }
    },

    runTheNumbers: function () {
        "use strict";

        //Gather all the elements containing the "grocery-cost" class.
        const groceryCost = document.getElementsByClassName("grocery-cost");

        //If no "grocery-cost" class exists, reload the page.
        //This is in case user deletes all groceries on list.
        //Total is erased. Placeholder values on input fields are returned.
        if (groceryCost.length <= 0) {
            location.reload();
        } else {
            //Convert the resulting "array like" NodeList to a "real" Array.
            //Retrieve its textContent.
            const text = Array.from(groceryCost, (gc) => gc.textContent);

            //Convert string to numbers with "map"
            const numbers = text.map(Number);

            //Add the numbers with "reduce"
            const sumTotal = numbers.reduce((acc, val) => acc + val);

            //Add two spots after decimal so total appearance is : X.XX.
            const sumTotalFixed = sumTotal.toFixed(2);

            //Make the grocery-total table visible.
            document.getElementById("grocery-total").style.display = "table";

            //Insert the total in the cell.
            document.getElementById("total-amount").textContent = sumTotalFixed;

        }

        //Invoke the clearTheBoxes function.
        market.clearTheBoxes();
    },

    clearTheBoxes: function () {
        "use strict";

        //Gather the input fields.
        const name = document.getElementById("input-grocery-name");
        const cost = document.getElementById("input-grocery-cost");

        //Clear their text content.
        name.textContent = "";
        cost.textContent = "";

        //Return cursor to the "grocery name" field.
        name.focus();
    },

    removeTheRow: function () {
        "use strict";

        //Get the table.
        const list = document.getElementById("grocery-list");

        //Monitor the table for a "click" event.
        list.addEventListener("click", function (element) {

            const listRow = element.target.parentNode.rowIndex;
            const listCell = element.target.cellIndex;

            //If the "click" event occurs on the "third" cell, delete the row.
            //Remember, the first cell is 0.
            if (listCell === 2) {
                list.deleteRow(listRow);

                //Invoke the runTheNumbers function.
                market.runTheNumbers();
            }
        });
    }

}; //close market