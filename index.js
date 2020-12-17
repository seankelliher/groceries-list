//Module invokes functions.
//These functions monitor inputs and rows.

import {monitorInputsFocus, monitorInputsKeys} from "./app/inputs.js";
import {monitorRow} from "./app/row.js";

//When DOMContentLoaded, invoke functions.
document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    monitorInputsFocus();
    monitorInputsKeys();
    monitorRow();
});