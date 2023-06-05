//Higher Order Functionalities
//Calculator
function add(num1, num2) {
  return num1 + num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}
function sub(num1, num2) {
  return num1 - num2;
}
function division(num1, num2) {
  return num1 / num2;
}
function modulus(num1, num2) {
  return num1 % num2;
}

function calculator(num1, num2, operator) {
  return operator(num1, num2);
}

var calculation = calculator(20, 30, add);
var calculation1 = calculator(2, 30, multiply);

console.log(calculation, calculation1);
