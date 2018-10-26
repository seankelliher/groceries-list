//Global "variable" (actually "let")
let market;

//Ensure the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    //Invoke functions with event listeners
    market.readyBoxes();
    market.readyKeys();
    market.removeTheRow();

}); //close DOMContentLoaded function

//The "market" "variable" (actually "let")
market = {

    readyBoxes: function () {
        "use strict";

        //Monitor the table for "focus" event. Clear the "add grocery name" and "add grocery price" placeholder values from boxes when event occurs.
        document.getElementById("input-grocery").addEventListener("focusin", function (element) {
            element.target.textContent = "";
        });
    },

    readyKeys: function () {
        "use strict";

        //Monitor the keyboard for "keydown" event
        document.getElementById("input-grocery").addEventListener("keydown", function (event) {

            //If the "keydown" event is on the "return" key, prevent its default action, invoke the retrieveTheNumbers function
            if (event.keyCode === 13) {
                event.preventDefault();
                //market.retrieveTheNumbers();
                market.checkInsertContent();
            }
        });
    },

    checkInsertContent: function () {
        "use strict";

        //Retrieve the "grocery name" and grocery price" the user entered into the field
        const name = document.getElementById("input-grocery-name").textContent;
        const cost = document.getElementById("input-grocery-cost").textContent;

        //Run regex on the "grocery price" to check it's all numbers and has no more than two digits after the decimal point
        const costReCheck = /^\d*\.?\d{1,2}$/.test(cost);

        //If "grocery name" is blank and/or "grocery price" does not match pattern, return alert. If both are fine, return the name and price.
        if (costReCheck === false) {
            window.alert("Hey, that's not a price!");
        } else if (name === "") {
            window.alert("Hey, you need a name for that grocery!");
        } else {

            //Convert "grocery price" to a number. Make format .XX in case use enters "X no decimal" or "X.X" (one number). Convert number back to string to insert in cell.
            //Note: There's probably a better, more elegant regex way to do this.
            const costNum = Number(cost);
            const costNumFix = costNum.toFixed(2);
            const costNumFixString = costNumFix.toString();

            //Retrieve the table, insert a row and three cells into it
            const groceryTable = document.getElementById("grocery-list");
            const groceryRow = groceryTable.insertRow(-1); //-1 inserts row at end of table
            const groceryCellName = groceryRow.insertCell(0);
            const groceryCellCost = groceryRow.insertCell(1);
            const groceryCellRemove = groceryRow.insertCell(2);

            //Assign the "grocery name" and "grocery price" to their cells
            groceryCellName.textContent = name;
            groceryCellCost.textContent = costNumFixString;

            //Add an "x" to the third cell. This is the "delete row" "x."
            groceryCellRemove.textContent = "x";

            //Add class names to the three cells
            groceryCellName.className = "grocery-name";
            groceryCellCost.className = "grocery-cost";
            groceryCellRemove.className = "grocery-remove";

            //Invoke the runTheNumbers function
            market.runTheNumbers();
        }
    },

    runTheNumbers: function () {
        "use strict";

        //Gather all the elements containing the "grocery-cost" class
        const groceryCost = document.getElementsByClassName("grocery-cost");

        //If no "grocery-cost" class exists, reload the page. This is in case user deletes all groceries on list. Total is erased. Placeholder values on input fields are returned.
        if (groceryCost.length <= 0) {
            location.reload();
        } else {
            //Convert the resulting "array like" NodeList to a "real" Array and retrieve its textContent
            const text = Array.from(groceryCost, (groceryCost2) => groceryCost2.textContent);

            //Convert string to numbers with "map"
            const numbers = text.map(Number);

            //Add the numbers with "reduce"
            const sumTotal = numbers.reduce((acc, val) => acc + val);

            //Add two spots after decimal so total appearance is consistent: X.XX
            const sumTotalFixed = sumTotal.toFixed(2);

            //Insert the total in the cell
            document.getElementById("total-amount").textContent = sumTotalFixed;
        }

        //Invoke the clearTheBoxes function
        market.clearTheBoxes();
    },

    clearTheBoxes: function () {
        "use strict";

        //Gather and then clear text from input fields
        const clear = document.querySelectorAll("#input-grocery-name, #input-grocery-cost");
        const clearArray = Array.from(clear);

        //For Each loop
        clearArray.forEach(function (clr) {
            clr.textContent = "";
        });

        //Return cursor to the "grocery name" field
        document.getElementById("input-grocery-name").focus();
    },

    removeTheRow: function () {
        "use strict";

        //Get the table
        const list = document.getElementById("grocery-list");

        //Monitor the table for a "click" event
        list.addEventListener("click", function (element) {

            const listRow = element.target.parentNode.rowIndex;
            const listCell = element.target.cellIndex;

            //If the "click" event occurs on the "third" cell (remember, the first cell is 0), delete the row
            if (listCell === 2) {
                list.deleteRow(listRow);

                //Invoke the runTheNumbers function
                market.runTheNumbers();
            }
        });
    }

}; //close market