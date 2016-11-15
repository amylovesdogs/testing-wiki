var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);
var should = chai.should(),
  expect = chai.expect;
var spy = chai.spy('original');

describe('+', function () {
  // var posNum, negNum;
  // beforeEach(function () {
  //   posNum = 100;
  //   negNum = -50;
  // });
  // it('sums two positive numbers', function () {
  //   var result = posNum + posNum;
  //   expect(result).to.equal(200);
  // });
  // it('sums two negative number', function () {
  //   var result = negNum + negNum;
  //   expect(result).to.equal(-100);
  // });
  // it('sums a negative and a positive', function () {
  //   var result = negNum + posNum;
  //   expect(result).to.equal(50);
  // });
  // it('is commutative', function () {
  //   var resultA = negNum + posNum,
  //     resultB = posNum + negNum;
  //   expect(resultA).to.equal(resultB);
  // });


it('should take 1000ms', function(done){
    var time1 = new Date();
    function timerDone() {
        var time2 = new Date();
        var diff = time2 - time1;
        expect(diff).to.be.closeTo(1000,10);
        done();
    }
    // get the time
  setTimeout(timerDone, 1000);
});


it('check forEach is called n times for an array of n length', function() {
  var arr = [1,2,3,4,5];
  function addFive(curVal) {
      return curVal + 5;
      };
  spyFive = chai.spy(addFive);
  arr.forEach(spyFive);

  expect(spyFive).to.have.been.called.exactly(arr.length);
});
});

