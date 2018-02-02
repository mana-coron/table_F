(function() {
  'use strict';


function jsonGet() {

  var userData = localStorage.getItem('userDataStr');
  userData = JSON.parse(userData);

  if(!userData){
    localStorage.removeItem("userDataStr");
    var userData = [];
    localStorage.setItem('userDataStr', JSON.stringify(userData));

  } else {
    var tbody = document.getElementById("table_f_body");

     for (var i = 0; i < userData.length; i++) {
       var row = tbody.insertRow(0);
       var cell0 = row.insertCell(-1);
       var cell1 = row.insertCell(-1);
       var cell2 = row.insertCell(-1);
       var cell3 = row.insertCell(-1);
       var cell4 = row.insertCell(-1);


       cell0.className = 'col0'
       cell1.className = 'col1'
       cell2.className = 'col2 edit-cell'
       cell3.className = 'col3 edit-cell'
       cell4.className = 'col4 edit-cell'

       cell0.innerHTML = userData[i]["date"];
       cell1.innerHTML =  '<span id="count">' + userData[i]["count"] +  '</span>';
       cell2.innerHTML = userData[i]["F2"];
       cell3.innerHTML = userData[i]["F3"];
       cell4.innerHTML = userData[i]["S3"];

       //１以上のときは赤文字にする
       if(cell2.innerText > 0) {
         cell2.innerHTML = '<a id="getcell">' + cell2.innerHTML + '</a>'
       }
       if(cell3.innerText > 0) {
         cell3.innerHTML = '<a id="getcell">' + cell3.innerHTML + '</a>'
       }
       if(cell4.innerText > 0) {
         cntS = 0;
         cell4.innerHTML = '<a id="getcell">' + cell4.innerHTML + '</a>'
       }
       cntS ++;
   }
   Recalculation();
  }
};

//再計算
function Recalculation() {
  var tbody = document.getElementById("table_f_body");
  var tr = tbody.getElementsByTagName("tr");
  var td = tr[0].getElementsByTagName("td");
  var getcount = td[1].innerText;
  length = getcount;

  //累計計算
  var sum = tatecalc("table_f_body", 0, 1, 2, 3, 4); //td[0], td[1], td[4] の合計値が配列で返ってくる

  if (sum) { //非対応ブラウザの時は false が返ってくるので確認
    total1.innerHTML = sum[1];
    total2.innerHTML = sum[2];
    total3.innerHTML = sum[3];

    for(var i = 1; i < 5; i++) {
      var n = 2 ;	// 小数点第n位まで残す
      sum[i] = Math.floor( (sum[i] / length*10) * Math.pow( 10, n ) ) / Math.pow( 10, n );
    }
    formula1.innerHTML = sum[1] + "%";
    formula2.innerHTML = sum[2] + "%";
    formula3.innerHTML = sum[3] + "%";
  }


  //S3計算

  var sumS = Scalc("table_f_body", 0, 1, 2, 3, 4);

  if (sumS) {
    totalS1.innerHTML = sumS[1];
    totalS2.innerHTML = sumS[2];
    totalS3.innerHTML = sumS[3];

    for(var i = 1; i < 5; i++) {
      var n = 2 ;
      sumS[i] = Math.floor( (sumS[i] / cntS*10) * Math.pow( 10, n ) ) / Math.pow( 10, n );
    }
    formulaS1.innerHTML = sumS[1] + "%";
    formulaS2.innerHTML = sumS[2] + "%";
    formulaS3.innerHTML = sumS[3] + "%";
  }

}


var cntA = 0;
var cntB = 0;
var cntC = 0;
var cntS = 0;
var day;


var inputBtn = document.getElementById('input-btn');
var resetBtn = document.getElementById('reset-btn');




var itemBtnA = document.getElementById('item-btn-A');
var itemBtnB = document.getElementById('item-btn-B');
var itemBtnC = document.getElementById('item-btn-C');
var resultItemA = document.getElementById('result-item-A');
var resultItemB = document.getElementById('result-item-B');
var resultItemC = document.getElementById('result-item-C');
var editBtn = document.getElementById('editBtn');
var extBtn = document.getElementById('extBtn');
var deleteBtn = document.getElementById('deleteBtn');



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

function dataEdit() {
  if(editBtn.innerText == "編集") {
    editBtn.innerText = "完了";
    editBtn.style.backgroundColor = '#ffadad';
    BtnDisabled();
      getCELL();
  } else if(editBtn.innerText = "完了") {
    var plusBtn = document.getElementById("plusBtn");
    var minusBtn = document.getElementById("minusBtn");
    if (plusBtn) {
      plusBtn.parentNode.removeChild(plusBtn);
      minusBtn.parentNode.removeChild(minusBtn);
    }
    editBtn.innerText = "編集";
    editBtn.style.backgroundColor = '#f8f8f8';
    unBtnDisabled();
  }
}

function BtnDisabled() {
    $(document).ready(function(){
    $(".input-area, .result-area, #extBtn, #deleteBtn").css({
      "opacity":"0.4",
      "pointer-events":"none"
    });
  });
}
function unBtnDisabled() {
  $(document).ready(function(){
  $(".input-area, .result-area, #extBtn, #deleteBtn").css({
    "opacity":"1",
    "pointer-events":"auto"
  });
});
}

var Dfcount;

function getCELL(){
   var myTbl = document.getElementById('table_f_body');
  　for (var i=0; i<myTbl.rows.length; i++) {
     for (var j=2; j<myTbl.rows[i].cells.length; j++) {
  　　var Cells=myTbl.rows[i].cells[j];
      Dfcount = Cells.innerText;
  　　 Cells.onclick =function(){Mclk(this);} // onclickで 'Mclk'を実行。
           }
         }
}

function Mclk(Cell) {
    if(editBtn.innerText == "完了") {
  var plusBtn = document.getElementById("plusBtn");
  var minusBtn = document.getElementById("minusBtn");
  if (plusBtn) {
    plusBtn.parentNode.removeChild(plusBtn);
    minusBtn.parentNode.removeChild(minusBtn);
  }
  Cell.innerHTML = '<input id="plusBtn" type="button" value="+">' + Cell.innerText + '<input id="minusBtn" type="button" value="ー">';
  if(Cell.innerText > 0) {
    Cell.innerHTML = '<a id="getcell">' + Cell.innerHTML + '</a>'
  }

  var plusBtn = document.getElementById("plusBtn");
  var minusBtn = document.getElementById("minusBtn");

    plusBtn.addEventListener('click', function() {
      if(Cell.innerText < 10) {
        Cell.innerText ++;
      } else {
        //ボタンが消えるか、透明度を落とすかしたい
      }
    });
    minusBtn.addEventListener('click', function() {
      if(Cell.innerText > 0) {
        Cell.innerText --;
      }
    });
    Recalculation();


    //回数で何行目か検索
    if(Dfcount != Cell.innerText) {
      var nCount = Cell.innerText;
      var myTbl = document.getElementById('table_f_body');
      var i = (Cell.parentNode.rowIndex -5);
      var tdcount = Cell.cellIndex;
      var tableCount = myTbl.rows[i].cells[1];
      tableCount = tableCount.innerText;

      var userDataA = localStorage.getItem('userDataStr');
      userDataA = JSON.parse(userDataA);



      var newData = userDataA.filter(function(item, index){
        if (item.count != tableCount) return true;
      });

      var changeData = userDataA.filter(function(item, index){
        if (item.count == tableCount) return true;
      });



      var Gcount;
      switch (tdcount) {
          case 2:
            changeData[0].F2 = nCount;
            break;
          case 3:
            changeData[0].F3 = nCount;
            break;
          case 4:
            changeData[0].S3 = nCount;
            break;
      }
      newData.push(changeData[0]);

      //並び替え
      newData.sort(function(a,b){
        if(a.count<b.count) return -1;
        if(a.count > b.count) return 1;
        return 0;
      });

      localStorage.setItem("userDataStr", JSON.stringify(newData));
    }
}
}








function dataDelete() {
  var result = confirm('データを全て消去してよろしいですか？');

    if(result) {
      dataReset();
      length = 0;
      var table = document.getElementById("table_f_body");
      while (table.rows.length > 0) table.deleteRow(0);
      formula1.innerHTML = "0%";
      formula2.innerHTML = "0%";
      formula3.innerHTML = "0%";
      formulaS1.innerHTML = "0%";
      formulaS2.innerHTML = "0%";
      formulaS3.innerHTML = "0%";
      total1.innerHTML = 0;
      total2.innerHTML = 0;
      total3.innerHTML =0;
      totalS1.innerHTML = 0;
      totalS2.innerHTML = 0;
      totalS3.innerHTML =0;
      localStorage.removeItem("userDataStr");
      var userData = [];
      localStorage.setItem('userDataStr', JSON.stringify(userData));
    }

}






window.onload = function(){
    jsonGet();
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

  var i = -1
  var tbody = document.getElementById("table_f_body");
  var tr = tbody.getElementsByTagName("tr");
  var td = tr[0].getElementsByTagName("td");
  var getC = td[4].innerText;
  getC = parseFloat(getC); //数値に変換
  if(getC > 0) {
    cntS = 0;
    }
  cntS ++;

  var sum = tatecalc("table_f_body", 0, 1, 2, 3, 4); //td[0], td[1], td[4] の合計値が配列で返ってくる

  if (sum) { //非対応ブラウザの時は false が返ってくるので確認
    total1.innerHTML = sum[1];
    total2.innerHTML = sum[2];
    total3.innerHTML = sum[3];

    for(var i = 1; i < 5; i++) {
      var n = 2 ;	// 小数点第n位まで残す
      sum[i] = Math.floor( (sum[i] / length*10) * Math.pow( 10, n ) ) / Math.pow( 10, n );
    }
    formula1.innerHTML = sum[1] + "%";
    formula2.innerHTML = sum[2] + "%";
    formula3.innerHTML = sum[3] + "%";
  }

  var sumS = Scalc("table_f_body", 0, 1, 2, 3, 4);

  if (sumS) {
    totalS1.innerHTML = sumS[1];
    totalS2.innerHTML = sumS[2];
    totalS3.innerHTML = sumS[3];

    for(var i = 1; i < 5; i++) {
      var n = 2 ;
      sumS[i] = Math.floor( (sumS[i] / cntS*10) * Math.pow( 10, n ) ) / Math.pow( 10, n );
    }
    formulaS1.innerHTML = sumS[1] + "%";
    formulaS2.innerHTML = sumS[2] + "%";
    formulaS3.innerHTML = sumS[3] + "%";
  }

});

resetBtn.addEventListener('click', function() {
  dataReset();
});


//表の編集ボタン
editBtn.addEventListener('click', function() {
  dataEdit();
});

extBtn.addEventListener('click', function() {
  dataExt();
});

deleteBtn.addEventListener('click', function() {
  dataDelete();
});




//計算
var formula1 = document.getElementById('formula1');
var formula2 = document.getElementById('formula2');
var formula3 = document.getElementById('formula3');
var total1 = document.getElementById('total1');
var total2 = document.getElementById('total2');
var total3 = document.getElementById('total3');

//S3計算用
var formulaS1 = document.getElementById('formulaS1');
var formulaS2 = document.getElementById('formulaS2');
var formulaS3 = document.getElementById('formulaS3');
var totalS1 = document.getElementById('totalS1');
var totalS2 = document.getElementById('totalS2');
var totalS3 = document.getElementById('totalS3');




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
			for (var ii = 2; ii < arguments.length; ii++) { //引数[0] は tableID なので 引数[1] から開始
				temp[temp.length] = td[arguments[ii]]; //td[ 引数[ii] ] の<td>を一時配列にコピー
			}
			td = temp; //<td>の配列を上書き。これによって引数にない列の<td>は消される
		}

		//===== <td>の合計値を列ごとに計算 =====//

			//jは「左からj番目の<td>」に相当。つまり sum[0] は左から0番目の<td>の合計値を指す

		for (var j = 0; j < td.length; j++) { //<td>の数だけ繰り返し

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



function Scalc(tableID) {

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

	for (var i = 0; i < cntS; i++) { //<tr>の数だけ繰り返し

		//===== tr[i] から計算対象の<td>を取得 =====//

		var td = tr[i].getElementsByTagName("td"); //i番目の<tr>内にある<td>を全部取得（配列）

		if (!td || !td.length) //tr[i] に<td>が含まれなかったら次のループへ
			continue;

		//2個以上の引数を与えられてるか
		if (arguments.length > 1) {
			var temp = new Array(); //一時的な配列
			for (var ii = 2; ii < arguments.length; ii++) { //引数[0] は tableID なので 引数[1] から開始
				temp[temp.length] = td[arguments[ii]]; //td[ 引数[ii] ] の<td>を一時配列にコピー
			}
			td = temp; //<td>の配列を上書き。これによって引数にない列の<td>は消される
		}

		//===== <td>の合計値を列ごとに計算 =====//

			//jは「左からj番目の<td>」に相当。つまり sum[0] は左から0番目の<td>の合計値を指す

		for (var j = 0; j < td.length; j++) { //<td>の数だけ繰り返し

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
      var row = tbody.insertRow(0);
      var cell0 = row.insertCell(i);
      var cell1 = row.insertCell(i);
      var cell2 = row.insertCell(i);
      var cell3 = row.insertCell(i);
      var cell4 = row.insertCell(i);

      length  ++;

      //日付取得
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth()+1;
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      day = year + "/" + month + "/" + day + " " + hour + ":" + minute;


      //jsonを取得
      var userData = localStorage.getItem('userDataStr');
      userData = JSON.parse(userData);

      //json形式データを追加する
      var addData =
      {"date": day,"count": length, F2: cntA, F3: cntB, S3: cntC};
      userData.push(addData);

     // 追加データごと格納
      localStorage.setItem("userDataStr", JSON.stringify(userData));


      //1以上のときは文字に装飾
      if(cntA > 0) {
        cntA = '<a id="getcell">' + cntA + '</a>'
      }
      if(cntB > 0) {
        cntB = '<a id="getcell">' + cntB + '</a>'
      }
      if(cntC > 0) {
        cntC = '<a id="getcell">' + cntC + '</a>'
      }

      cell0.className = 'col0';
      cell1.className = 'col1';
      cell2.className = 'col2 edit-cell';
      cell3.className = 'col3 edit-cell';
      cell4.className = 'col4 edit-cell';


      cell0.innerHTML = day;
      cell1.innerHTML = '<span id="count">' + length + '</span>';
      cell2.innerHTML = cntA;
      cell3.innerHTML = cntB;
      cell4.innerHTML = cntC;


      dataReset();
  }









})();
