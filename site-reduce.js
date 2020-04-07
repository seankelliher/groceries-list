//Global variable.
let market;

//Ensure the DOM is loaded. Then, invoke the functions.
document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    market.readyBoxes();
    market.readyKeys();
    market.removeRow();
});

market = {

    readyBoxes: function () {
        "use strict";

        const input = document.getElementById("input-grocery");

        //Monitor the table for "focus" event.
        //Clear the "name" and "price" placeholders when event occurs.
        input.addEventListener("focusin", function (event) {
            event.target.textContent = "";
        });
    },

    readyKeys: function () {
        "use strict";

        //Get the dialogue element (where users input name and price).
        const dialogue = document.querySelector("dialogue");

        //Monitor dialogue element for "keydown" event.
        dialogue.addEventListener("keydown", function (event) {

            //If the "keydown" event is on the "return" key, prevent default.
            //Invoke function to check format of entered name and price.
            if (event.keyCode === 13) {
                event.preventDefault();
                market.checkEntered();
            }
        });
    },

    checkEntered: function () {
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

            //Check if "instructions" note should be shown or hide.
            //It's hid after first grocery is entered.
            //It's returned again if user deletes all items on list.
            market.decideNote();
        }
    },

    hideStart: function () {
        "use strict";

        const start = document.getElementById("lets-start");
        start.style.display = "none";
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

            //Insert the word "total" into the cell.
            document.getElementById("total-name").textContent = "total";
        }

        //Invoke the resetTheBoxes function.
        market.resetTheBoxes();
    },

    resetTheBoxes: function () {
        "use strict";

        //Gather the input fields.
        const name = document.getElementById("input-grocery-name");
        const cost = document.getElementById("input-grocery-cost");

        //Clear "grocery name" field. Add placeholder to "grocery price" field.
        name.textContent = "";
        cost.textContent = "price";

        //Return cursor to the "grocery name" field.
        name.focus();
    },

    removeTheRow: function () {
        "use strict";

        //Get the table.
        const list = document.getElementById("grocery-list");

        //Monitor the table for a "click" event.
        list.addEventListener("click", function (event) {

            const listRow = event.target.parentNode.rowIndex;
            const listCell = event.target.cellIndex;

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