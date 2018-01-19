(function() {
  'use strict';

var length = 0;

var addBtn = document.getElementById('addBtn');


function addLine() {
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
      cell2.innerHTML = 0;
      cell3.innerHTML = 0;
      cell4.innerHTML = button;
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
