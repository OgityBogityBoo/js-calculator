let display_value = '';
let working_value = 0;
let first_value = 0;
let second_value = 0;
let total_value = 0;
let operator = 0;
//division = 1
//multiply = 2
//addition = 3
//subtraction = 4
//modulo = 5
let awaiting_decimal = false;

//The on_click function for the numerical buttons 0-9
//A 'val' is passed into the function, designating the value of the button pressed. i.e. 1, 2, 3, 4, etc.
//If the display_value is 0 it will be replaced with the value of the button pressed. If the value is not zero, it will convert the value to a string to add the pressed value at the end and convert it back into a floating number.
function btnValue(val){
    if(working_value == 0){
        if(awaiting_decimal){
            let str = "0." + val.toString();
            awaiting_decimal = false;
            working_value = parseFloat(str);
            updateDisplayValue();
            return;
        }
        working_value = val;
        updateDisplayValue();
    } else {
        let str = working_value.toString();
        if(awaiting_decimal){
            str += ".";
            awaiting_decimal = false;
        }
        str += val.toString();
        working_value = parseFloat(str);
        updateDisplayValue();
    }
}

function operatorButton(val){
    if(first_value == 0){
        first_value = working_value;
        operator = val;
    } else {
        equal();
        operator = val;
        first_value = total_value;
        working_value = 0;
        updateDisplayValue();
    }
    working_value = 0;
    updateDisplayValue();
}

//Based on the operator button selection, which is a series of 1-4 values, each designated to an operation, calls the respective operation function to calculate the given numbers.
function equal(){
    second_value = working_value;
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
    } else if (operator == 5){
        //subtraction
        modulo();
    }
}

//Adds the first and second value together and displays the result.
function addition(){
    console.log("adding...");
    let c = first_value + second_value;
    total_value = c;
    updateTotalValue();
}

//Subtracts the second value from the first value and displays the result.
function subtraction(){
    console.log("subtracting...");
    let c = first_value - second_value;
    total_value = c;
    updateTotalValue();
}

//Multiples the first and second value together and displays the result.
function multiply(){
    console.log("multiplying...");
    let c = first_value * second_value;
    total_value = c;
    updateTotalValue();
}

//Divides the first and second value in the calculation. Does not allow for division by 0.
function divide(){
    console.log("dividing...");
    if(second_value == 0){
        display_value = "Divide by 0? No way Jose.";
        updateDisplayValue();
        first_value = 0;
        second_value = 0;
        return;
    }
    let c = first_value / second_value;
    total_value = c;
    updateTotalValue();
}

//Called by the Square Root button.
//Calls the Math.sqrt js function to get the square root.
function sqrt(){
    console.log("square root of display value");
    let c = Math.sqrt(working_value);
    total_value = c;
    updateTotalValue();
}

//Called when the +/- button is pressed.
//Changes the sign of the value entered by the user by multiplying the value by -1.
function signChange(){
    working_value = working_value * -1;
    updateDisplayValue();
}

function modulo(){
    console.log("mod...");
    let c = first_value % second_value;
    total_value = c;
    updateTotalValue();
}

//Updates the total_value, which is the bottom larger number on the calculator screen. This is the saved value or total value in the calculation as opposed to the smaller value at the top of the screen which is the temporary value the user is entering into the calculator.
function updateTotalValue(){
    document.getElementById('screen_bottom').innerHTML = total_value;
}

//Called when the Decimal button is pressed.
//Sets awaiting_decimal to true.
//When true, the next number pressed will have a decimal precede it.
function decimal(){
    console.log('we got ourselves a decimal');
    awaiting_decimal = true;
}

//Clears the entire calculation. Resets display to '0' and sets all recorded values to '0'.
function clearCalc(){
    working_value = 0;
    display_value = '';
    first_value = 0;
    second_value = 0;
    total_value = 0;
    operator = 0;
    updateDisplayValue();
    updateTotalValue();
    console.log("cleared.");
}

//Deletes the last entered value to the display_value, which is the temporary number the user is typing into the calculator
//If the value is 0, we return preventing NaN error
//If the value is empty or is a leftover '-' negative sign, we swap for 0 and return to avoid NaN issues.
function deleteVal(){
    if(working_value == 0){
        return;
    }
    let str = working_value.toString();
    let new_str = str.slice(0, str.length - 1);
    if(new_str.length <= 0 || new_str == "-"){
        working_value = 0;
        updateDisplayValue();
        return;
    }
    working_value = parseFloat(new_str);
    updateDisplayValue();
}

function operatorMap(val){
    if(val == 1){
        //divide
        return "/";
    } else if(operator == 2){
        //multiply
        return "x";
    } else if (operator == 3){
        //addition
        return "+";
    } else if (operator == 4){
        //subtraction
        return "-";
    } else if (operator == 5){
        //subtraction
        return "%";
    }
}

//Updates the text in the top portion of the calculator to match what was pressed by the user.
function updateDisplayValue(){
    if(first_value != 0){
        display_value = first_value.toString() + operatorMap(operator) + working_value.toString();
        document.getElementById('screen_top').innerHTML = display_value;
    } else { 
        document.getElementById('screen_top').innerHTML = working_value;
    }
}