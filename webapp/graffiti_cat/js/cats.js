'use strict';

import catdata from "./data.js";

// ------------- #cover
const cover = document.querySelector('#cover');
// ------------- #index
const index = document.querySelector('#index');
const index_list = document.querySelector('#index dl');
// ------------- #cats
const cats = document.querySelector('#cats');
const cats_grid_table = document.querySelector('#cats table');
const cat_tag = document.querySelector('#cats h3');
const cat_name = document.querySelector('#cats h2');
const cat_life = document.querySelector('#cats h4');
const cat_from = document.querySelector('#cats h5');
const cat_text = document.querySelectorAll('#cats p');
const cat_img = document.querySelector('#cats img');
const cat_page = document.querySelector('#cats #page');
// ------------- #btn
const btn = document.querySelector('#btn');
const btn_open = document.querySelector('#btn-open');
const btn_enter = document.querySelectorAll('#btn-enter');
const btn_previous = document.querySelector('#btn-previous');
const btn_next = document.querySelector('#btn-next');
const btn_grid = document.querySelectorAll('#btn-grid i');
const btn_pencil = document.querySelector('#btn-pencil');
const btn_eraser = document.querySelector('#btn-eraser');
// ------------- #mask
const mask = document.querySelector('#mask');
// ------------- #paint
const paint = document.querySelector('#paint');
const paint_catName = document.querySelector('#paint #tool #catname');
const canvas_img = document.querySelector('#canvas img');
const canvas_grid_table = document.querySelector('#canvas table');

let s_index = "OFF";
let canvasPage = 0;
let grid = 0;
let color = "#000";
let colorData = [];
for (let i = 0; i < 6; i++) {
  colorData[i] = [];
}

class Cats {
  // コンストラクター
  constructor(page, name, tag, life, from, text, img) {
    this.page = page;
    this.name = name;
    this.tag = tag;
    this.life = life;
    this.from = from;
    this.text = text;
    this.img = img;
  }

  // ■ 画面表示
  static view(str) {
    if (str === "topPage") {
      // (1) 画面: トップページ
      cover.classList.remove('hide'); // 表示
      index.classList.add('hide');
      cats.classList.add('hide');
      btn.classList.add('hide');
      mask.classList.add('hide');
      paint.classList.add('hide');
      
    } else if (str === "catPage0") {
      // (2) 画面: 教科書 目次
      cover.classList.remove('hide'); // 表示
      index.classList.remove('hide'); // 表示
      cats.classList.add('hide');
      btn.classList.remove('hide'); // 表示
      mask.classList.remove('hide'); // 表示
      paint.classList.add('hide');
      
    } else if (str === "catPageN") {
      // (3) 画面: 教科書 各ページ
      cover.classList.remove('hide'); // 表示
      index.classList.add('hide');
      cats.classList.remove('hide'); // 表示
      btn.classList.remove('hide'); // 表示
      mask.classList.remove('hide'); // 表示
      paint.classList.add('hide');

    } else if (str === "canvas") {
      // (4) 画面: キャンバス
      cover.classList.add('hide');
      index.classList.add('hide');
      cats.classList.add('hide');
      btn.classList.add('hide');
      mask.classList.add('hide');
      paint.classList.remove('hide'); // 表示

    }


  }

  // ■ 教科書を開く（ページ）
  catPage(n) {
    if (n === 0) {  // 0ページ目なら目次を表示
      console.log("【 目次 】 " + this.page); // ★
      Cats.view("catPage0"); // ■ 画面表示

    } else {  // 0ページ目以外なら各ページを表示
      console.log("【ページ】 " + this.page); // ★
      Cats.view("catPageN"); // ■ 画面表示
      cat_name.textContent = this.name;
      cat_tag.textContent = this.tag;
      cat_life.textContent = this.life;
      cat_from.textContent = this.from;
      cat_text[0].textContent = this.text;
      cat_page.textContent = "- " + this.page + " -";
      cat_img.src = this.img;
      btn_enter[0].classList.toggle('r-img');
      btn_enter[0].classList.toggle('l-img');
      
    }

  }

  // ■ 目次を生成
  static catIndex() {
    if (s_index === "ON") {
      // すでに目次が生成されていたら、新たに生成しない
    } else {
      s_index = "ON";
      console.log("【目次を生成】");
      for (let i = 1; i < catdata.length; i++) {
        const dt = document.createElement('dt');
        const dd = document.createElement('dd');
        dt.textContent = "異名"; // ★
        dd.textContent = "ページ"; // ★
        index_list.appendChild(dt);
        index_list.appendChild(dd);
      }
      indexName(); // ■ 目次 値の代入
    }
  }

  // ■ 教科書を閉じる
  static catClose() {
    return canvasPage;
  }

  // ■ ナビゲーションボタン
  static catBtn(n) {
    if (n === 0) {
      btn_previous.innerHTML = "<i class=\"bi bi-book\"></i><br><span>閉じる</span>";
      btn_enter[1].innerHTML = "";
      btn_next.innerHTML = "<i class=\"bi bi-arrow-right-circle\"></i><br><span>次のページ</span>";
    } else if (n === (catdata.length - 1)) {
      btn_previous.innerHTML = "<i class=\"bi bi-arrow-left-circle\"></i><br><span>前のページ</span>";
      btn_enter[1].innerHTML = "<i class=\"bi bi-pencil\"></i><br><span>落書きする</span>";
      btn_next.innerHTML = "<i class=\"bi bi-book\"></i><br><span>閉じる</span>";
    } else {
      btn_previous.innerHTML = "<i class=\"bi bi-arrow-left-circle\"></i><br><span>前のページ</span>";
      btn_enter[1].innerHTML = "<i class=\"bi bi-pencil\"></i><br><span>落書きする</span>";
      btn_next.innerHTML = "<i class=\"bi bi-arrow-right-circle\"></i><br><span>次のページ</span>";
    }
  }

  // ■ キャンバスを開く
  canvasImg() {
    Cats.view("canvas"); // ■ 画面表示
    canvas_img.src = this.img;
    paint_catName.textContent = "偉猫 " + this.page;
  }

  // ■ グリッド線の表示・非表示
  static gridLine(n) {
    const td = document.querySelectorAll('td');
    if (n === "ON") {
      td.forEach((td) => {
        td.classList.add('grid-off');
      });
      btn_grid[0].classList.remove('hide');
      btn_grid[1].classList.add('hide');
    } else if (n === "OFF") {
      td.forEach((td) => {
        td.classList.remove('grid-off');
      });
      btn_grid[0].classList.add('hide');
      btn_grid[1].classList.remove('hide');
    }
    td.forEach((td) => {
      td.classList.toggle('grid-off');
    });
    btn_grid[0].classList.toggle('hide');
    btn_grid[1].classList.toggle('hide');
  }

  // ■ グリッド生成
  static grid(n, page) {
    // 古いグリッド削除
    console.log("【グリッド削除】"); // ★
    cats_grid_table.innerHTML = "";
    canvas_grid_table.innerHTML = "";

    // 着色データがある場合は、データと同じグリッド数
    if (colorData[page].length !== 0) {
      { console.log('【着色データ（あり）】 ' + "\n" 
        + "page: " + page + "\n" 
        + "grid: " + Math.sqrt(colorData[page].length) + "\n" 
        + "colorData.length: " + colorData[page].length + "\n" 
        + "colorData: \n" + colorData[page]); 
      } // ★
      n = Math.sqrt(colorData[page].length);
    } else {
    }

    console.log('【グリッド生成】 ' + n); // ★
    // 新規グリッド生成（偉猫ページ）
    for (let j = 0; j < n; j++) {
      const tr = document.createElement('tr');
      for (let i = 0; i < n; i++) {
        const td = document.createElement('td');
        // td.textContent = j + "" + i; // ★
        tr.appendChild(td);
      }
      cats_grid_table.appendChild(tr);
    }
    console.log(cats_grid_table); // ★

    // 新規グリッド生成（ペイントページ）
    for (let j = 0; j < n; j++) {
      const tr = document.createElement('tr');
      for (let i = 0; i < n; i++) {
        const td = document.createElement('td');
        // td.textContent = j + "" + i; // ★
        tr.appendChild(td);
      }
      canvas_grid_table.appendChild(tr);
    }
    console.log(canvas_grid_table); // ★
  }

  // ■ グリッド変更アラート
  static gridChange(select, option, page) {
    console.log("【グリッド数(変更前)】" + grid); // ★
    let result = window.confirm("落書きの途中でグリッド数を変更すると\n今描いてる落書きが消えちゃうよ！");
    if (result) {
      console.log("【アラート(yes)】 " + select); // ★
      colorData[page] = []; 
      Cats.grid(select, page); // ■ グリッド生成
      Cats.gridLine("ON"); // ■ グリッド線の表示
      grid = select;
    } else {
      console.log("【アラート(no)】 " + select); // ★
      for (let i = 0; i < option.length; i++) {
        if (option[i].value === grid) {
          option[i].selected = true; // セレクテッド有効
        } else {
          option[i].selected = false; // セレクテッド無効
        }
        console.log(option[i].value, option[i].selected); // ★
      }
    }
  }

  // ■ グリッド数セレクテッド
  static gridSelected(option, page) {
    grid = Math.sqrt(colorData[page].length);
    console.log("【グリッド数セレクテッド】"  + "\n" 
    + "page: " + page + "\n" 
    + "grid: " + grid); // ★
    for (let i = 0; i < option.length; i++) {
      option[i].selected = false; // セレクテッド無効
      if (parseInt(option[i].value) === parseInt(grid)) {
        option[i].selected = true; // セレクテッド有効
      } else {
        option[i].selected = false; // セレクテッド無効
      }
      console.log(option[i].value, option[i].selected); // ★
    }
  }

  // ■ 鉛筆選択・色選択・消しゴム選択
  static color(n) {
    color = n;
    if (color === "") {
      btn_pencil.classList.remove('select');
      btn_eraser.classList.add('select');
    } else {
      btn_pencil.classList.add('select');
      btn_eraser.classList.remove('select');
    }
  }

  // ■ グリッド着色
  static draw(e) {
    if (e.target.nodeName === 'TD') {
      console.log("【着色】 " + color);
      e.target.style.backgroundColor = color;
    }
  }

  // ■ グリッド白紙
  static clear(page) {
    colorData[page] = [];
    const td = document.querySelectorAll('#canvas td');
    td .forEach((td) => {
      td.style.backgroundColor = "";
      colorData[page].push("");
    });
  }

  // ■ 着色データを配列に保存
  static calorDataSave(page) {
    canvasPage = page;
    colorData[page] = [];
    const td = document.querySelectorAll('#paint td');
    td.forEach((td) => {
      colorData[page].push(td.style.backgroundColor);
    });
    console.log("【着色データを保存】 " + colorData[page]); // ★
    console.log(colorData); // ★
  }

  // ■ 着色データをグリッドに読込み
  static calorDataload(page) {
    const cats_td = document.querySelectorAll('#cats td');
    const canvas_td = document.querySelectorAll('#canvas td');
    console.log(colorData[page]); // ★
    if (colorData[page].length === 0) {
      console.log("【着色データ(なし)読込み】" + page); // ★
      for (let i = 0; i < cats_td.length; i++) {
        cats_td[i].style.backgroundColor = "";
        canvas_td[i].style.backgroundColor = "";
      }
    } else {
      console.log("【着色データ(あり)読込み】" + page); // ★
      for (let i = 0; i < colorData[page].length; i++) {
        cats_td[i].style.backgroundColor = colorData[page][i];
        canvas_td[i].style.backgroundColor = colorData[page][i];
      }
    }
  }

  
  // ■ 画像のコピー
  static copy(page) {
    const img = document.querySelector('#canvas img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    // 設定
    const grid = Math.sqrt(colorData[page].length);
    const width = canvas.width / grid;
    const height = canvas.height / grid;
    // キャンバスに描画
    ctx.drawImage(img, 0, 0);
    let n = 0;
    for (let j = 0; j < grid; j++) {
      for (let i = 0; i < grid; i++) {
        if (colorData[page][n] === "") {
          // 着色しない
        } else {
          // 着色する
          ctx.fillStyle = colorData[page][n];
          ctx.fillRect((width * i), (height * j), width, height);
        }
        n++;
      }
    }
    console.log(canvas); // ★
    console.log(ctx); // ★
    // キャンバスをクリップボードにコピーする
    canvas.toBlob(async (blob) => {
      const item = new ClipboardItem({
        'image/png' : blob
      });
      await navigator.clipboard.write([item]);
      console.log("【クリップボードに画像をコピー】"); // ★
      // window.alert("クリップボードにコピーしました");
    });
  }

}

// ■ 目次 値の代入
function indexName() {
  const index_tag = document.querySelectorAll('#index dt');
  const index_page = document.querySelectorAll('#index dd');
  for (let i = 1; i < catdata.length; i++) {
    index_tag[i].textContent = catdata[i].tag;
    index_page[i].textContent = "… " + catdata[i].page;
  }
}


{
  // メソッド呼び出し
  // cat.catPage();

  // 静的メソッド呼び出し
  // Cats.静的メソッド名();
}

export default Cats;