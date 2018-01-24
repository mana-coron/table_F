(function() {
  'use strict';



var cntA = 0;
var cntB = 0;
var cntC = 0;

var inputBtn = document.getElementById('input-btn');
var resetBtn = document.getElementById('reset-btn');




var itemBtnA = document.getElementById('item-btn-A');
var itemBtnB = document.getElementById('item-btn-B');
var itemBtnC = document.getElementById('item-btn-C');
var resultItemA = document.getElementById('result-item-A');
var resultItemB = document.getElementById('result-item-B');
var resultItemC = document.getElementById('result-item-C');



function countUpA(){
  cntA++;
  document.getElementById("result-item-A").innerHTML=cntA;
}
function countUpB(){
  cntB++;
  document.getElementById("result-item-B").innerHTML=cntB;
}
function countUpC(){
  cntC++;
  document.getElementById("result-item-C").innerHTML=cntC;
}


function dataReset() {
  cntA = '0';
  cntB = '0';
  cntC = '0';
  itemBtnA = '0';
  itemBtnB = '0';
  itemBtnC = '0';
  resultItemA = '0';
  resultItemB = '0';
  resultItemC = '0';
  document.getElementById("result-item-A").innerHTML=cntA;
  document.getElementById("result-item-B").innerHTML=cntB;
  document.getElementById("result-item-C").innerHTML=cntC;

}




window.onload = function(){
    document.getElementById("result-item-A").innerHTML=cntA;
    document.getElementById("result-item-B").innerHTML=cntB;
    document.getElementById("result-item-C").innerHTML=cntC;
    itemBtnA.addEventListener('click', function() {
      countUpA();
    });
    itemBtnB.addEventListener('click', function() {
      countUpB();
    });
    itemBtnC.addEventListener('click', function() {
      countUpC();
    });
};

inputBtn.addEventListener('click', function() {
  dataSave();
});

resetBtn.addEventListener('click', function() {
  dataReset();
});



//確率計算
var formula1 = document.getElementById('formula1');
var formula2 = document.getElementById('formula2');
var formula3 = document.getElementById('formula3');




function calcTbl() {
var myTbl = document.getElementById('table_f');
 for(var i=1;i< myTbl.rows.length;i++){ // <tr>をループ（1行目は,見出し行でスキップ)
   var num = 0; // セルの値 格納変数
   var total = 0;// セルの合計値 格納変数
 for(var j=1;j< myTbl.rows[i].cells.length-1;j++){ // tr[i]行目のセルの数
  num = myTbl.rows[i].cells[j].innerHTML; // tr[i]番目行のtd[j] 番目セルの値,取得
  num = parseFloat(num); // 数値に変換
　 num = num *1000;// 小数点問題 (-20.2+20=0.1999～)のような現象を回避
    total += num; // 合計値
      }
 total = total/1000;
  document.getElementById("formula1").innerHTML = total; // 行の末尾のセルに合計値
   myTbl.rows[i].cells[j].style.color="#cc00ff";
       }
    }

if(length > 0) {
  calcTbl();
}



//表データ
var length = 0;




function dataSave() {
      var i = -1;

      // テーブル取得
      var tbody = document.getElementById("table_f_body");
      // 行を行末に追加
      var row = tbody.insertRow(i);
      // セルの挿入
      var cell1 = row.insertCell(i);
      var cell2 = row.insertCell(i);
      var cell3 = row.insertCell(i);
      var cell4 = row.insertCell(i);

      // 行数取得
      length  ++;

      if(cntA > 0) {
        cntA = '<a id="getcell">' + cntA + '</a>'
      }
      if(cntB > 0) {
        cntB = '<a id="getcell">' + cntB + '</a>'
      }
      if(cntC > 0) {
        cntC = '<a id="getcell">' + cntC + '</a>'
      }


      // セルの内容入力
      cell1.innerHTML = '<a id="count">' + length;
      cell2.innerHTML = cntA;
      cell3.innerHTML = cntB;
      cell4.innerHTML = cntC;

      dataReset();
  }







})();
