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

  var sum = tatecalc("table_f_body", 0, 1, 2, 3); //td[0], td[1], td[4] の合計値が配列で返ってくる

  if (sum) { //非対応ブラウザの時は false が返ってくるので確認
    total1.innerHTML = sum[1];
    total2.innerHTML = sum[2];
    total3.innerHTML = sum[3];
    
    for(var i = 1; i < 4; i++) {
      var n = 2 ;	// 小数点第n位まで残す
      sum[i] = Math.floor( (sum[i] / length*10) * Math.pow( 10, n ) ) / Math.pow( 10, n );
    }
    formula1.innerHTML = sum[1] + "%";
    formula2.innerHTML = sum[2] + "%";
    formula3.innerHTML = sum[3] + "%";

  }
});

resetBtn.addEventListener('click', function() {
  dataReset();
});


//計算
var formula1 = document.getElementById('formula1');
var formula2 = document.getElementById('formula2');
var formula3 = document.getElementById('formula3');
var total1 = document.getElementById('total1');
var total2 = document.getElementById('total2');
var total3 = document.getElementById('total3');




function tatecalc(tableID) {

	//記述の手抜き用
	var d = document;

	//非対応ブラウザはなにもしない（最後のはタチの悪いOpera6を刎ねるための条件）
	if (!d.getElementById || !d.getElementsByTagName || (window.opera && !d.createEvent))
		return false;

	//各<td>の合計値（<td>ごとに別で計算するので配列を使う）
	var sum = new Array();

	//<table id="ID名">を取得
	var table = d.getElementById(tableID);

	//<table>内の<tr>を全部取得（配列）
	var tr = table.getElementsByTagName("tr");


	//===== ループ開始 =====//

	for (var i = 0; i < tr.length; i++) { //<tr>の数だけ繰り返し

		//===== tr[i] から計算対象の<td>を取得 =====//

		var td = tr[i].getElementsByTagName("td"); //i番目の<tr>内にある<td>を全部取得（配列）

		if (!td || !td.length) //tr[i] に<td>が含まれなかったら次のループへ
			continue;

		//2個以上の引数を与えられてるか
		if (arguments.length > 1) {
			var temp = new Array(); //一時的な配列
			for (var ii = 1; ii < arguments.length; ii++) { //引数[0] は tableID なので 引数[1] から開始
				temp[temp.length] = td[arguments[ii]]; //td[ 引数[ii] ] の<td>を一時配列にコピー
			}
			td = temp; //<td>の配列を上書き。これによって引数にない列の<td>は消される
		}

		//===== <td>の合計値を列ごとに計算 =====//

			//jは「左からj番目の<td>」に相当。つまり sum[0] は左から0番目の<td>の合計値を指す

		for (var j = 1; j < td.length; j++) { //<td>の数だけ繰り返し

			//<td>の内容を列ごとに分けて足していく
			var num; //計算用の一時変数
			if (!sum[j]) { //1回目のループでは sum[j] は空なので0を入れる
				sum[j] = 0;
			}

				num = td[j].innerText;
        // num = num.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');
				num = parseFloat(num); //数値に変換

			sum[j] = sum[j] + num; //sum[j] に加算していく（td[j] の合計値になる）
			//次の<td>ループへ
		}
		//次の<tr>ループへ
	}



	if (arguments.length == 1) { //引数がひとつの時のみ下のセルに結果を挿入

		//新しい行を作る（これに結果の<td>を挿入していき、最後に<table>へ追加する）
		var newtr = d.createElement("tr");
		newtr.style.backgroundColor = "#dfd"; //背景色なんかつけてみる

		var th = d.createElement("th"); //見出しセルを作る
		var text = d.createTextNode("結果"); //<th>のテキスト
		th.appendChild(text); //<th>にテキストを挿入
		newtr.appendChild(th); //<tr>の最後に<th>を追加

		//結果を入れた<td>を作って<tr>へ次々に追加していく
		for (i = 0; i < sum.length; i++) {
			text = (sum[i] >= 0) ? (sum[i] /1000) : ""; //sum[j] を小数に戻す
			td = d.createElement("td");
			td.appendChild(d.createTextNode(text)); //ちょっとズボラな書き方
			newtr.appendChild(td);
		}

		//新しく作った<tr>を追加
		var endtr = tr[tr.length -1]; //一番最後の<tr>
		endtr.parentNode.insertBefore(newtr, endtr.nextSibling);

		/* ちょっと解説
		追加対象ノード.insertBefore(追加するノード, 追加する場所);

		<table> ← endtr.parentNode（追加対象ノード）
			<tr>
				<td><\/td>
			<\/tr>
			<tr> ← endtr
				<td><\/td>
			<\/tr>
			■ ← endtr.nextSibling（追加する場所）
		<\/table>
		*/
	}

	return sum; //配列sumを返す
}






var length = 0;

function dataSave() {
      var i = -1;

      var tbody = document.getElementById("table_f_body");
      var row = tbody.insertRow(i);
      var cell1 = row.insertCell(i);
      var cell2 = row.insertCell(i);
      var cell3 = row.insertCell(i);
      var cell4 = row.insertCell(i);

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


      cell1.innerHTML = '<a id="count">' + length;
      cell2.innerHTML = cntA;
      cell3.innerHTML = cntB;
      cell4.innerHTML = cntC;

      dataReset();
  }








})();
