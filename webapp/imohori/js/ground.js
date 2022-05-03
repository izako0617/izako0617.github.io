'use strict';

import mapData from "./data.js";

// DOM ターゲット
const body = document.querySelector('body'); 
const header = document.querySelector('header'); 
const footer = document.querySelector('footer'); 
const ground_f = document.querySelector('#ground'); 
const ground_f_img = document.querySelectorAll('#ground .ground-img div'); 
const ground_b = document.querySelector('#underground');
const ground_h2 = document.querySelector('#underground h2');
const ground_cat = document.querySelector('#underground #cat');
const ground_cat_move = document.querySelector('#underground #cat #cat-move');
const ground_cat_run = document.querySelector('#underground #cat #cat-run');
const ground_world = document.querySelector('#underground #world');
const ground_world_s = document.querySelectorAll('#underground #world table #world_s');
const ground_world_t = document.querySelector('#underground #world table #world_t');
const ground_world_r = document.querySelector('#underground #world table #world_r');
const ground_world_b = document.querySelector('#underground #world table #world_b');
const ground_world_l = document.querySelector('#underground #world table #world_l');
const ground_world_c = document.querySelector('#underground #world table #world_c');
const btn_nav = document.querySelector('#underground .btn_nav');
const imo = document.querySelector('#imo');
const imo_p = document.querySelectorAll('#imo p');
const imo_h2 = document.querySelector('#imo h2');
const imo_img = document.querySelector('#imo #imo-img');
const imo_numText = document.querySelectorAll('#imo span');
const imo_numImg = document.querySelector('#underground .menu span');
const map = document.querySelector('#map');
const map_table = document.querySelector('#map table');
const map_dt = document.querySelectorAll('#map dl dt');
const map_dd = document.querySelectorAll('#map dl dd');

let position_row = 0; // 座標row
let position_col = 0; // 座標col
let position_imo = []; // イモ座標
let position_root = []; // 探索済み座標
let map_num = 0; // マップナンバー
let imoSet_num = 0; // イモの総数
let imoGet9_num = 0; // 獲得した普通のイモ
let imoGet8_num = 0; // 獲得した伝説のイモ
let playGame = "ON"; // ゲーム起動 ON / OFF

// クラス定義
class Ground {  
  // ■ 画面遷移
  static view(view) {
    body.classList.remove('scroll-off');
    header.classList.remove('blur');
    footer.classList.remove('blur');
    ground_b.classList.remove('blur');
    ground_f.classList.add('hide'); 
    ground_b.classList.add('hide'); 
    map.classList.add('hide'); 
    imo.classList.add('hide'); 
    mask.classList.add('hide'); 

    if (view === "ground_f") {
      console.log("■ 【画面】地上"); // ★
      ground_f.classList.remove('hide'); 
    } else if (view === "ground_b") {
      console.log("■ 【画面】地中"); // ★
      ground_b.classList.remove('hide'); 
    } else if (view === "map") {
      console.log("■ 【画面】地図"); // ★
      body.classList.add('scroll-off');
      header.classList.add('blur'); 
      footer.classList.add('blur'); 
      ground_b.classList.add('blur'); 
      ground_b.classList.remove('hide'); 
      map.classList.remove('hide'); 
      mask.classList.remove('hide'); 
    } else if (view === "imo") {
      console.log("■ 【画面】イモ発見"); // ★
      body.classList.add('scroll-off');
      header.classList.add('blur'); 
      footer.classList.add('blur'); 
      ground_b.classList.add('blur'); 
      ground_b.classList.remove('hide'); 
      imo.classList.remove('hide'); 
      mask.classList.remove('hide'); 
    } else {
      console.log("■ 【画面】エラー"); // ★
    }
  }

  // ■ マップ新規作成
  static newMap() { 
  
    { // 設定 リセット
      playGame = "ON"; // ゲーム 起動
      position_imo = []; // 発見済みイモ座標
      position_root = []; // 探索済み座標
      imoSet_num = 0; // イモの総数
      imoGet9_num = 0; // 獲得した普通のイモ
      imoGet8_num = 0; // 獲得した伝説のイモ
      map_table.innerHTML = ""; // 地図
    }

    map_num = Math.floor(Math.random() * mapData.length); // マップナンバー抽選
    console.log("■ 【マップ新規作成】map_num " + map_num); // ★
    console.table(mapData[map_num]); // ★
    let row = mapData[map_num].length;
    let col = mapData[map_num][0].length;
    console.log("行: " + row + " 列: " + col); // ★
    for (let j = 0; j < row; j++) {
      const tr = document.createElement('tr');
      for (let i = 0; i < col; i++) {
        const td = document.createElement('td');
        // td.textContent = j + "" + i; // ★
        td.textContent = mapData[map_num][j][i]; // ★
        if (mapData[map_num][j][i] === "9" || mapData[map_num][j][i] === "8") {
          imoSet_num++;
        }
        tr.appendChild(td);
      }
      map_table.appendChild(tr);
    }
    position_row = 0;
    position_col = mapData[map_num][0].indexOf('2');
    console.log("スタート座標: " + position_row,position_col); // ★
    console.log("イモ総数: " + imoSet_num); // ★
  }

  // ■ 地中探索
  static underWorld(arrow) {
    console.log("■ 【地中探索】"); // ★
    let value = mapData[map_num][position_row][position_col];
    console.log("座標(移動前): " + position_row,position_col + "  値: " + value); // ★
    if (arrow === "↑") {
      console.log("移動 ↑"); // ★
      position_row--;
    } else if (arrow === "→") {
      console.log("移動 →"); // ★
      position_col++;
    } else if (arrow === "↓") {
      console.log("移動 ↓"); // ★
      position_row++;
    } else if (arrow === "←") {
      console.log("移動 ←"); // ★
      position_col--;
    }

    value = mapData[map_num][position_row][position_col];
    console.log("座標(移動後): " + position_row,position_col + "  値: " + value); // ★
    // ground_h2.innerHTML = ""; // ★
    // ground_h2.innerHTML += "座標: " + position_row + " " + position_col + "<br>"; // ★
    // ground_h2.innerHTML += "値: " + value; // ★
    this.imoCounter(value); // ■ イモカウンター
    this.rootLog(position_row,position_col,value); // ■ 探索済みルート記録
    this.paintMap(position_row,position_col); // ■ 地図に着色
    this.catAnime(arrow); // ■ 地中ねこアニメ
    this.arrow(arrow); // ■ 移動ボタン表示
  }

  // ■ 移動ボタン表示
  static arrow(arrow) {
    console.log("■ 【移動ボタン表示】"); // ★
    btn_t.innerHTML = "";
    btn_b.innerHTML = "";
    btn_l.innerHTML = "";
    btn_r.innerHTML = "";
    let t = 0;
    let r = 0;
    let b = 0;
    let l = 0;
    let value = mapData[map_num][position_row][position_col];
    console.log("・ 座標: " + position_row + " " + position_col
      + "  値: " + mapData[map_num][position_row][position_col]); // ★
    // 上 
    if (parseInt(position_row - 1) >= 0) {
      console.log("↑ 座標: " + parseInt(position_row - 1) + " " + position_col
        + "  値: " + mapData[map_num][parseInt(position_row - 1)][position_col]); // ★
      if (mapData[map_num][parseInt(position_row - 1)][position_col] === "1" 
        || mapData[map_num][parseInt(position_row - 1)][position_col] === "2"
        || mapData[map_num][parseInt(position_row - 1)][position_col] === "8"
        || mapData[map_num][parseInt(position_row - 1)][position_col] === "9") {
        console.log("↑ 表示"); // ★
        t = 1;
      }
    } else {
      console.log("↑ 端"); // ★
    }
    // 右
    if (parseInt(position_col + 1) < mapData[map_num][0].length) {
      console.log("→ 座標: " + position_row + " " + parseInt(position_col + 1)
        + "  値: " + mapData[map_num][position_row][parseInt(position_col + 1)]); // ★
      if (mapData[map_num][position_row][parseInt(position_col + 1)] === "1" 
        || mapData[map_num][position_row][parseInt(position_col + 1)] === "8" 
        || mapData[map_num][position_row][parseInt(position_col + 1)] === "9") {
        console.log("→ 表示"); // ★
        r = 1;
      }
    } else {
      console.log("→ 端"); // ★
    }
    // 下
    if (parseInt(position_row + 1) < mapData[map_num].length) {
      console.log("↓ 座標: " + parseInt(position_row + 1) + " " + position_col
        + "  値: " + mapData[map_num][parseInt(position_row + 1)][position_col]); // ★
      if (mapData[map_num][parseInt(position_row + 1)][position_col] === "1" 
        || mapData[map_num][parseInt(position_row + 1)][position_col] === "8" 
        || mapData[map_num][parseInt(position_row + 1)][position_col] === "9") {
        console.log("↓ 表示"); // ★
        b = 1;
      }
    } else {
      console.log("↓ 端"); // ★
    }
    // 左
    if (parseInt(position_col - 1) >= 0) {
      console.log("← 座標: " + position_row + " " + parseInt(position_col - 1)
        + "  値: " + mapData[map_num][position_row][parseInt(position_col - 1)]); // ★
      if (mapData[map_num][position_row][parseInt(position_col - 1)] === "1" 
        || mapData[map_num][position_row][parseInt(position_col - 1)] === "8" 
        || mapData[map_num][position_row][parseInt(position_col - 1)] === "9") {
        console.log("← 表示"); // ★
        l = 1;
      }
    } else {
      console.log("← 端"); // ★
    }

    // ■ 矢印出力
    function printArrow() {
      if (t === 1) {
        btn_t.innerHTML = "<i class=\"bi bi-caret-up-fill\"></i>";
      }
      if (r === 1) {
        btn_r.innerHTML = "<i class=\"bi bi-caret-right-fill\"></i>";
      }
      if (b === 1) {
        btn_b.innerHTML = "<i class=\"bi bi-caret-down-fill\"></i>";
      }
      if (l === 1) {
        btn_l.innerHTML = "<i class=\"bi bi-caret-left-fill\"></i>";
      }
    }

    if (arrow === "・") {
      Ground.paintUnder(t, r, b, l, value); // ■ 地中に着色
      printArrow(); // ■ 矢印出力
    } else {
      console.log("◆ 地中に着色(2s後)"); // ★
      setTimeout(() => {
        Ground.paintUnder(t, r, b, l, value); // ■ 地中に着色
      }, 2000);
      console.log("◆ 矢印出力(4s後)"); // ★
      setTimeout(() => {
        printArrow(); // ■ 矢印出力
      }, 4000);
    }
  }

  // ■ 探索済みルート記録
  static rootLog(position_row,position_col,value) {
    console.log("■ 【探索済みルート記録】"); // ★
    let n = 0;
    position_root.forEach((root) => {
      if (root[0] === position_row && root[1] === position_col) {
        console.log("探索済み経路だよ"); // ★
        n++;
      }
    });
    if (n === 0) {
      console.log("新規開拓経路だよ"); // ★
      position_root.push([position_row,position_col,value]);
    } else {

    }
    console.log(position_root); // ★
  }

  // ■ 地図に着色
  static paintMap(position_row,position_col) {
    console.log("■ 【地図に着色】"); // ★
    map_table.classList.add('root_0');
    
    const td = document.querySelectorAll('#map table td');
    let row = mapData[map_num].length;
    let col = mapData[map_num][0].length;
    console.log("行: " + row + " 列: " + col); // ★
    let n = 0;
    for (let j = 0; j < row; j++) {
      for (let i = 0; i < col; i++) {
        td[n].innerHTML = "";
        let value = mapData[map_num][j][i];
        if (value === "5") {
          console.log("探索ルート(済): " + j,i,value + " 空");
          td[n].classList.add('root_5');
        } else if (value === "2") {
          console.log("探索ルート(済): " + j,i,value + " 葉");
          td[n].classList.add('root_2');
        } else {
          position_root.forEach((root) => {
            if (root[0] === j && root[1] === i) {
              if (value === "1") {
                console.log("探索ルート(済): " + j,i,value + " 根");
                td[n].classList.add('root_1');
              } else if (value === "8") {
                console.log("探索ルート(済): " + j,i,value + " イモ");
                td[n].classList.add('root_8');
              } else if (value === "9") {
                console.log("探索ルート(済): " + j,i,value + " イモ");
                td[n].classList.add('root_9');
              } else if (value === "0") {
                console.log("探索ルート(済): " + j,i,value + " 土");
              }
            } else {
              console.log("探索ルート(未): " + j,i,value + " ");
            }
          });
        }
        if (j === position_row && i === position_col) {
          console.log("現在位置: " + position_row,position_col);
          td[n].innerHTML = "<img src=\"./img/cat_c.png\" width=\"30\" alt=\"CAT\">";
        }
        n++;
      }
    }
  }

  // ■ 地中に着色
  static paintUnder(t, r, b, l, value) {
    console.log("■ 【地中に着色】" + t, r, b, l); // ★
    let classRemove = ["root_1", "root_2", "root_5", "root_8", "root_9"];
    classRemove.forEach(root => {
      ground_world_s[0].classList.remove(root);
      ground_world_s[1].classList.remove(root);
      ground_world_c.classList.remove(root);
      ground_world_t.classList.remove(root);
      ground_world_r.classList.remove(root);
      ground_world_b.classList.remove(root);
      ground_world_l.classList.remove(root);
    });
    ground_world_c.classList.add('root_1');

    if (value === "2") {
      ground_world_s[0].classList.add('root_5');
      ground_world_s[1].classList.add('root_5');
      ground_world_t.classList.add('root_5');
      ground_world_r.classList.add('root_5');
      ground_world_l.classList.add('root_5');
      ground_world_c.classList.add('root_2');
    } else if (value === "8") {
      ground_world_c.classList.add('root_8');
    } else if (value === "9") {
      ground_world_c.classList.add('root_9');
    }
    if (t === 1) {
      ground_world_t.classList.add('root_1');
    }
    if (r === 1) {
      ground_world_r.classList.add('root_1');
    }
    if (b === 1) {
      ground_world_b.classList.add('root_1');
    }
    if (l === 1) {
      ground_world_l.classList.add('root_1');
    }

  }

  // ■ 地中ねこアニメ
  static catAnime(arrow) {
    console.log("■ 【地中ねこアニメ】 " + arrow); // ★

    if (arrow === "↑") {
      console.log("移動, 走る ↑"); // ★
      ground_cat_move.classList.add('cat_move_t');
      ground_cat_run.classList.add('cat_run_t');
    } else if (arrow === "→") {
      console.log("移動, 走る →"); // ★
      ground_cat_move.classList.add('cat_move_r');
      ground_cat_run.classList.add('cat_run_r');
    } else if (arrow === "↓") {
      console.log("移動, 走る ↓"); // ★
      ground_cat_move.classList.add('cat_move_b');
      ground_cat_run.classList.add('cat_run_b');
    } else if (arrow === "←") {
      console.log("移動, 走る ←"); // ★
      ground_cat_move.classList.add('cat_move_l');
      ground_cat_run.classList.add('cat_run_l');
    } else if (arrow === "・") {
      console.log("停止 ・"); // ★
      ground_cat_run.classList.add('cat_c');
      return;
    }

    console.log("◆ 地中ねこアニメ停止 (4s後)"); // ★
    setTimeout(() => {
      let classRemove = [
        'cat_move_t', 'cat_move_r', 'cat_move_b', 'cat_move_l', 
        'cat_run_t', 'cat_run_r', 'cat_run_b', 'cat_run_l', 'cat_c'
      ];
      classRemove.forEach((delclass) => {
        ground_cat_move.classList.remove(delclass);
        ground_cat_run.classList.remove(delclass);
      });
      ground_cat_run.classList.add('cat_c');
    }, 4000);
  }

  // ■ 地上別のイモアニメ
  static nextImoAnime() {
    console.log("■ 【地上別のイモアニメ】 "); // ★
    ground_f_img[0].classList.add('cat_run_r');
    ground_f_img[1].classList.add('cat_move_l');

    console.log("◆ 地上別のイモアニメ停止(4s後)");
    setTimeout(() => {
      ground_f_img[0].classList.remove('cat_run_r');
      ground_f_img[1].classList.remove('cat_move_l');
      ground_f_img[0].classList.add('cat_c');
    }, 4000);
  }

  // ■ イモカウンター
  static imoCounter(value) {
    console.log("■ 【イモカウンター】"); // ★
    if (value === "9" || value === "8") {
      let n = 0;
      position_imo.forEach((imo) => {
        if (imo[0] === position_row && imo[1] === position_col) {
          console.log("すでに発見済みのイモだよ"); // ★
          n++;
        }
      });
      if (n === 0) {
        position_imo.push([position_row,position_col]);
        if (value === "9") {imoGet9_num++;}
        if (value === "8") {imoGet8_num++;}
        console.log("発見: (普通)" + imoGet9_num + " (伝説)" + imoGet8_num + "  総数: " + imoSet_num); // ★
        console.log("発見済みのイモの座標: "); // ★
        console.log(position_imo); // ★
        if (value === "9") {
          imo_p[0].textContent = "! GOOD JOB !";
          imo_h2.textContent = "イモを発見したよ";
          imo_p[1].textContent = "やったね";
          imo_img.classList.remove('root_8');
          imo_img.classList.add('root_9');
        } else if (value === "8") {
          imo_p[0].textContent = "! EXCELLENT!";
          imo_h2.textContent = "伝説のイモを発見したよ";
          imo_p[1].textContent = "すてきな一日になりそう";
          imo_img.classList.remove('root_9');
          imo_img.classList.add('root_8');
          map_dt[4].classList.add('hide');
          map_dd[4].classList.add('hide');
          map_dt[5].classList.remove('hide');
          map_dd[5].classList.remove('hide');
        }
        if ((imoGet9_num + imoGet8_num) === imoSet_num) {
          console.log("全てのイモを発見したよ"); // ★
          playGame = "OFF";
          imo_p[0].textContent = "! MISSION COMPLETE !";
          imo_h2.textContent = "全てのイモを発見したよ";
          imo_p[1].textContent = "おめでとう";
        }
        imo_numText[0].textContent = (imoGet9_num + imoGet8_num);
        imo_numText[1].textContent = imoSet_num;
        console.log("◆ イモカウンターimg / 画面遷移 (3.5s後)"); // ★
        setTimeout(() => {
          Ground.imoCounterImg(); // ■ イモカウンターimg
          Ground.view("imo"); // ■ 画面遷移
        }, 3500);
      }
    } else {
      this.imoCounterImg(); // ■ イモカウンターimg
    }
  }

  // ■ イモカウンターimg
  static imoCounterImg() {
    let img = "";
    for (let i = 0; i < imoGet9_num; i++) {
      img += "<img src=\"./img/imo01.png\" width=\"24\" heigth=\"24\"> ";
    }
    for (let i = 0; i < imoGet8_num; i++) {
      img += "<img src=\"./img/imo02.png\" width=\"24\" heigth=\"24\"> ";
    }
    for (let i = 0; i < (imoSet_num - (imoGet9_num + imoGet8_num)); i++) {
      img += "<img src=\"./img/imo00.png\" width=\"24\" heigth=\"24\"> ";
    }
    imo_numImg.innerHTML = img;
  }

  // ■ 値をmain.jsに返す
  static reValue(value) {
    if (value === "playGame") {
      return playGame;
    } else {

    }
  }

}

export default Ground;