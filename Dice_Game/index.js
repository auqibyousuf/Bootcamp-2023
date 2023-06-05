var output = [];
var count = 1;
function fizzBuzz() {
  while (count <= 100) {
    if (count % 3 === 0 && count % 5 === 0) {
      output.push("FizzBuzz");
    } else if (count % 3 === 0) {
      output.push("Fizz");
    } else if (count % 5 === 0) {
      output.push("Buzz");
    } else {
      output.push(count);
    }
    count++;
  }
  console.log(output);
}
fizzBuzz();

//99 Bottles of bear
var numberOfBearBottles = 99;
function beer() {
  while (numberOfBearBottles > 0 && numberOfBearBottles <= 99) {
    console.log(
      numberOfBearBottles +
        " bottles of bear on the wall, " +
        numberOfBearBottles +
        " of bear." +
        "\n" +
        "Take one down and pass it around, " +
        (numberOfBearBottles - 1 + "  bottles of bear on the wall.")
    );
    numberOfBearBottles--;
    if (numberOfBearBottles == 0) {
      console.log(
        "No more bottles of bear on the wall. No more bottles of bear." +
          "\n" +
          "Go to the store and buy some more  99 bottles of bear on the wall"
      );
    }
  }
}

beer();

function fibonacciGenerator(n) {
  var fibonacciSeriesOutput = [];
  var prevState = 0;
  var nextState = 1;
  var newState = 0;
  if (n === 1) {
    fibonacciSeriesOutput = [prevState];
  } else if (n === 2) {
    fibonacciSeriesOutput = [prevState, nextState];
  } else {
    fibonacciSeriesOutput = [prevState, nextState];
    for (var i = 2; i <= n; i++) {
      newState = nextState + prevState;
      fibonacciSeriesOutput.push(newState);
      prevState = nextState;
      nextState = newState;
    }
  }
  return fibonacciSeriesOutput;
}
fibonacciSeriesOutput = fibonacciGenerator(10);
console.log(fibonacciSeriesOutput);
