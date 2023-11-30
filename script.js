let display_value = 0;
let first_value = 0;
let second_value = 0;
let total_value = 0;
let operator = 0;
//division = 1
//multiply = 2
//addition = 3
//subtraction = 4
let awaiting_decimal = false;

//The on_click function for the numerical buttons 0-9
//A 'val' is passed into the function, designating the value of the button pressed. i.e. 1, 2, 3, 4, etc.
//If the display_value is 0 it will be replaced with the value of the button pressed. If the value is not zero, it will convert the value to a string to add the pressed value at the end and convert it back into a floating number.
function btnValue(val){
    if(display_value == 0){
        if(awaiting_decimal){
            let str = "0." + val.toString();
            awaiting_decimal = false;
            display_value = parseFloat(str);
            updateDisplayValue();
            return;
        }
        display_value = val;
        updateDisplayValue();
    } else {
        let str = display_value.toString();
        if(awaiting_decimal){
            str += ".";
            awaiting_decimal = false;
        }
        str += val.toString();
        display_value = parseFloat(str);
        updateDisplayValue();
    }
}

function operatorButton(val){
    if(first_value == 0){
        first_value = display_value;
        operator = val;
    } else {
        equal();
        operator = val;
        first_value = total_value;
        display_value = 0;
        updateDisplayValue();
    }
    display_value = 0;
    updateDisplayValue();
}

function equal(){
    second_value = display_value;
    if(operator == 1){
        //divide
        divide();
    } else if(operator == 2){
        //multiply
        multiply();
    } else if (operator == 3){
        //addition
        addition();
    } else if (operator == 4){
        //subtraction
        subtraction();
    }
}

function addition(){
    console.log("adding...");
    let c = first_value + second_value;
    total_value = c;
    updateTotalValue();
}

function subtraction(){
    console.log("subtracting...");
    let c = first_value - second_value;
    total_value = c;
    updateTotalValue();
}

function multiply(){
    console.log("multiplying...");
    let c = first_value * second_value;
    total_value = c;
    updateTotalValue();
}

function divide(){
    console.log("dividing...");
    let c = first_value / second_value;
    total_value = c;
    updateTotalValue();
}

function updateTotalValue(){
    document.getElementById('screen_bottom').innerHTML = total_value;
}

function decimal(){
    console.log('we got ourselves a decimal');
    awaiting_decimal = true;
}

//Clears the entire calculation. Resets display to '0' and sets all recorded values to '0'.
function clearCalc(){
    display_value = 0;
    first_value = 0;
    second_value = 0;
    total_value = 0;
    operator = 0;
    updateDisplayValue();
    updateTotalValue();
    console.log("cleared.");
}

//Updates the text in the top portion of the calculator to match what was pressed by the user.
function updateDisplayValue(){
    document.getElementById('screen_top').innerHTML = display_value;
}