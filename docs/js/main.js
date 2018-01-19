(function() {
  'use strict';



var cntA = 0;
var cntB = 0;

var inputBtn = document.getElementById('input-btn');



var itemBtnA = document.getElementById('item-btn-A');
var itemBtnB = document.getElementById('item-btn-B');
var resultItemA = document.getElementById('result-item-A');
var resultItemB = document.getElementById('result-item-B');

var spreadItemA = document.getElementById('spread-item-A');
var spreadItemB = document.getElementById('spread-item-B');


function countUpA(){
  cntA++;
  document.getElementById("result-item-A").innerHTML=cntA;
}

function countUpB(){
  cntB++;
  document.getElementById("result-item-B").innerHTML=cntB;
}

function spreadSave(){
  document.getElementById("spread-item-A").innerHTML=cntA;
  document.getElementById("spread-item-B").innerHTML=cntB;
}

// function save(){
//     localStorage.setItem("count1" , document.getElementById("dayCount").innerHTML);
// }



window.onload = function(){
    document.getElementById("result-item-A").innerHTML=cntA;
    document.getElementById("result-item-B").innerHTML=cntB;
    itemBtnA.addEventListener('click', function() {
      countUpA();
    });
    itemBtnB.addEventListener('click', function() {
      countUpB();
    });
};

inputBtn.addEventListener('click', function() {
  spreadSave();
});




})();
