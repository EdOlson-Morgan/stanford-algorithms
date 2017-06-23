//var x = 1234123412341234;
//var y = 5678567856785678;
var x = 3141592653589793238462643383279502884197169399375105820974944592;
var y = 2718281828459045235360287471352662497757247093699959574966967627;

function toFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1]);
    if (e) {
        x *= Math.pow(10,e-1);
        x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
        e -= 20;
        x /= Math.pow(10,e);
        x += (new Array(e+1)).join('0');
    }
  }
  return x;
}

const BigInteger = require('./biginteger').BigInteger;
var a = BigInteger('3141592653589793238462643383279502884197169399375105820974944592');
var b = BigInteger('2718281828459045235360287471352662497757247093699959574966967627');

console.log(a.multiply(b).toString()); // '1234567890987654321'

console.log(toFixed(x*y));

var leftHalf = function(val) {
    // Takes integer input and returns first half of that integer as an integer
    var valString = val.toString();
    var returnValue = parseInt(valString.substring(0,valString.length/2));
    //console.log(returnValue);
    return returnValue;
}
var rightHalf = function(val) {
    // Takes integer input and returns second half of that integer as an integer
    var valString = val.toString();
    var returnValue = parseInt(valString.substring(valString.length/2));
    //console.log(returnValue);
    return returnValue;
}

// Implement Karatsuba algorithm
var karatsuba = function(x,y) {
    
    var n = x.toString().length;
    
    if(n === 1) {
        return x*y;
    }
    
    var a = leftHalf(x);
    var b = rightHalf(x);
    var c = leftHalf(y);
    var d = rightHalf(y);
    
    var recursionOne = karatsuba(a,c);
    var recursionTwo = karatsuba(b,d);
    var recursionThree = karatsuba(a,d) + karatsuba(b,c);
    var recursionGauss = recursionThree - recursionOne - recursionTwo;

    //console.log(recursionOne);
    //console.log(recursionTwo);
    //console.log(recursionGauss);

    return recursionOne*Math.pow(10,n) + recursionTwo + recursionThree*Math.pow(10,n/2);
};

console.log(karatsuba(x,y));