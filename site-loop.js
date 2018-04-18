//ensure DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  "use strict";

    //clear text from input boxes when selected
    document.getElementById("input-grocery").addEventListener("focusin", function(element) {
        element.target.textContent = "";
    });

    //trigger function when return/enter key is pressed
    document.getElementById("input-grocery").addEventListener("keydown", function(event) {

        if (event.keyCode === 13) {
            event.preventDefault();
            checkTheNumbers();
        }
    });


    //check if grocery has name and price
    function checkTheNumbers() {

        //retrieve entry for name and cost
        var name = document.getElementById("input-grocery-name").textContent;
        var cost = document.getElementById("input-grocery-cost").textContent;

        //run the regex text() function on cost
        var costReCheck = /^\d*\.?\d{1,2}$/.test(cost);

        //run if statement
        if (costReCheck === false) {
            alert("Hey, that's not a price!");
        } else if (name === "") {
            alert("Hey, you need a name for that grocery!");
        } else {
            retrieveTheNumbers(name, cost); //pass name and cost to next function
        }
    } //close checkTheNumbers function


    //create row and cells, insert grocery name and price
    function retrieveTheNumbers(n, c) {

        //receive name and cost from previous function
        var name2 = (n);
        var cost2 = (c);

        //retrieve the table, insert a row and three cells into it
        var groceryTable = document.getElementById("output-grocery-list");
        var groceryRow = groceryTable.insertRow(-1); //-1 inserts row at end of table
        var groceryCellName = groceryRow.insertCell(0);
        var groceryCellCost = groceryRow.insertCell(1);
        var groceryCellRemove = groceryRow.insertCell(2);

        //retrive the text for name and cost, insert into their cells
        groceryCellName.textContent = name2;
        groceryCellCost.textContent = cost2;
        groceryCellRemove.textContent = "x";

        //add a class name to the grocery name, cost, and remove cells
        groceryCellName.className = "grocery-name";
        groceryCellCost.className = "grocery-cost";
        groceryCellRemove.className = "grocery-remove";

        runTheNumbers();

    } //close retrieveTheNumbers function


    //add the numbers, retrieve, and insert total cost
    function runTheNumbers() {
        //Gather all the elements containing the grocery-cost class
        var groceryCost = document.getElementsByClassName("grocery-cost");

        //Convert the resulting "array like" NodeList to a "real" Array and retrieve its textContent
        var text = Array.from(groceryCost, (groceryCost2) => groceryCost2.textContent);

        //run the loop, add the numbers
        var index = 0;
        var sum = 0;
        var sumTotal;
        var sumTotalFixed;

        for(index; index < text.length; index+=1){
            sumTotal = sum += parseFloat(text[index]);
            sumTotalFixed = sumTotal.toFixed(2);
        }

        //retrieve and insert the total
        document.getElementById("output-total").textContent = sumTotalFixed;

        clearTheBoxes();

    } //close runTheNumbers function


    //gather and clear text from input fields
    function clearTheBoxes() {
        var index = 0;
        var clear = document.querySelectorAll("#input-grocery-name, #input-grocery-cost");

        for (index; index < clear.length; index++) {
            clear[index].textContent = "";
        }

        //return cursor to the grocery name field
        document.getElementById("input-grocery-name").focus();

    } //close clearTheBoxes function
 

    //remove the row, if desired
    var list = document.getElementById("output-grocery-list");

    list.addEventListener("click", function(element) {

        var listRow = element.target.parentNode.rowIndex;
        var listCell = element.target.cellIndex;

        //only remove the row if target is cell 2 (remember, the first cell is 0)
        if (listCell === 2) {
            list.deleteRow(listRow);

            runTheNumbers();
        }
    });

}); //close DOMContentLoaded function