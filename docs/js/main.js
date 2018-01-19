(function() {
  'use strict';



var cntA = 0;
var cntB = 0;

var inputBtn = document.getElementById('input-btn');
var resetBtn = document.getElementById('reset-btn');




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


function dataReset() {
  cntA = '0';
  cntB = '0';
  itemBtnA = '0';
  itemBtnB = '0';
  resultItemA = '0';
  resultItemB = '0';
  document.getElementById("result-item-A").innerHTML=cntA;
  document.getElementById("result-item-B").innerHTML=cntB;

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
  dataSave();
});

resetBtn.addEventListener('click', function() {
  dataReset();
});






//表データ

var length = 0;

var addBtn = document.getElementById('addBtn');


function dataSave() {
      var i = -1;

      // テーブル取得
      var table = document.getElementById("table_f");
      var tbody = document.getElementById("table_f_body");
      // 行を行末に追加
      var row = table.insertRow(i);
      // セルの挿入
      var cell1 = row.insertCell(i);
      var cell2 = row.insertCell(i);
      var cell3 = row.insertCell(i);
      var cell4 = row.insertCell(i);
      // ボタン用 HTML
      var button = '<input type="button" value="修正" onclick="updateRow(this)" />';

      // 行数取得
      length  ++;

      // セルの内容入力
      cell1.innerHTML = length;
      cell2.innerHTML = cntA;
      cell3.innerHTML = cntB;
      cell4.innerHTML = button;

      dataReset();
  }

var upLine = function(targetEl) {

      // inputの親要素のtrを取得する
      tr = targetEl.parentNode.parentNode;

      var button = 'contenteditable = "true"'
    };

  addBtn.addEventListener('click', function() {
    addLine();
  });




})();
