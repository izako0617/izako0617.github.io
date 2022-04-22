'use strict';

import catdata from "./data.js";
import Cats from "./cats.js";

{
  // ボタン
  const btn_open = document.querySelectorAll('#btn-open');
  const btn_enter = document.querySelectorAll('#btn-enter');
  const btn_previous = document.querySelector('#btn-previous');
  const btn_next = document.querySelector('#btn-next');
  const btn_grid = document.querySelector('#btn-grid');
  const btn_dot = document.querySelector('#btn-dot');
  const btn_pencil = document.querySelector('#btn-pencil');
  const btn_color = document.querySelector('#btn-color');
  const btn_eraser = document.querySelector('#btn-eraser');
  const btn_clear = document.querySelector('#btn-clear');
  const btn_exit = document.querySelector('#btn-exit');

  let page = 0; // 現在のページ

  // 読み込み後、実行（読み込み後）
  document.addEventListener("DOMContentLoaded", () => {
    Cats.catIndex(); // ■ 目次を生成
  });

  // 教科書を開く（クリック）
  btn_open.forEach((btn_open) => {
    btn_open.addEventListener('click', () => {
      console.log("【教科書を開く】" + page); // ★
      catdata[page].catPage(page); // ■ ページを表示
      Cats.calorDataSave(page); // ■ 着色データを配列に保存
      Cats.grid(20, page); // ■ グリッド生成
      Cats.calorDataload(page); // ■ 着色データをグリッドに読込み
      Cats.gridLine("OFF"); // ■ グリッド線の非表示
      Cats.catBtn(page); // ■ ナビボタンを表示
    });
  });

  // 前のページ（クリック）
  btn_previous.addEventListener('click', () => {
    if (page === 0) {
      console.log("【閉じる】" + page); // ★
      page = Cats.catClose(); // ■ 教科書を閉じる
      if (page !== 0) {
        catdata[page].canvasImg(); // ■ キャンバスを開く
        Cats.grid(20, page); // ■ グリッド生成
        Cats.gridLine("ON"); // ■ グリッド線の表示
        Cats.calorDataload(page); // ■ 着色データをグリッドに読込み
      } else {
        Cats.view("topPage"); // ■ 画面表示
      }
    } else {
      if (page === 1) {
        page = 0;
        console.log("【目次】" + page); // ★
      } else {
        page--;
        console.log("【前のページ】" + page); // ★
      }
      catdata[page].catPage(page); // ■ ページを表示
      Cats.grid(20, page); // ■ グリッド生成
      Cats.calorDataload(page); // ■ 着色データをグリッドに読込み
      Cats.gridLine("OFF"); // ■ グリッド線の非表示
      Cats.catBtn(page); // ■ ナビボタンを表示
    }
  });
  
  // 次のページ（クリック）
  btn_next.addEventListener('click', () => {
    if (page + 1 === catdata.length) {
      console.log("【閉じる】" + page); // ★
      page = Cats.catClose(); // ■ 教科書を閉じる
      if (page !== 0) {
        catdata[page].canvasImg(); // ■ キャンバスを開く
        Cats.grid(20, page); // ■ グリッド生成
        Cats.gridLine("ON"); // ■ グリッド線の表示
        Cats.calorDataload(page); // ■ 着色データをグリッドに読込み
      } else {
        Cats.view("topPage"); // ■ 画面表示
      }
    } else {
      page++;
      console.log("【次のページ】" + page); // ★
      catdata[page].catPage(page); // ■ ページを表示
      Cats.grid(20, page); // ■ グリッド生成
      Cats.calorDataload(page); // ■ 着色データをグリッドに読込み
      Cats.gridLine("OFF"); // ■ グリッド線の非表示
      Cats.catBtn(page); // ■ ナビボタンを表示
    }
  });

  // 落書きする（クリック）
  btn_enter.forEach((btn_enter) => {
    btn_enter.addEventListener('click', () => {
      console.log("【落書きする】" + page); // ★
      Cats.catClose(); // ■ 教科書を閉じる
      catdata[page].canvasImg(); // ■ キャンバスを開く
      Cats.grid(20, page); // ■ グリッド生成
      Cats.gridLine("ON"); // ■ グリッド線の表示
      Cats.gridSelected(btn_dot.children, page);  // ■ グリッド数セレクテッド
      Cats.calorDataload(page); // ■ 着色データをグリッドに読込み
    });
  });

  // グリッド線の表示|非表示
  btn_grid.addEventListener('click', () => {
    console.log("【グリッド線の表示/非表示】"); // ★
    Cats.gridLine(); // ■ グリッド線の表示・非表示
  });

  // グリッド数の選択（セレクト）
  btn_dot.addEventListener('change', () => {
    console.log("【グリッド数の選択】 " + btn_dot.value); // ★
    Cats.gridChange(btn_dot.value, btn_dot.children, page); // ■ グリッド変更アラート
  });

  // 鉛筆（クリック）
  btn_pencil.addEventListener('click', () => {
    console.log("【鉛筆の選択】 " + btn_color.value); // ★
    Cats.color(btn_color.value); // ■ 色選択
  });

  // 色の選択（インプット）
  btn_color.addEventListener('change', () => {
    console.log("【色の選択】 " + btn_color.value); // ★
    Cats.color(btn_color.value); // ■ 色選択
  });

  // 消しゴム（クリック）
  btn_eraser.addEventListener('click', () => {
    console.log("【消しゴムの選択】 " + btn_eraser.value); // ★
    Cats.color(""); // ■ 色選択
  });

  // グリッドに着色（クリック）
  document.querySelector('#canvas table').addEventListener('click', (e) => {
    // console.log(e); // ★
    Cats.draw(e); // ■ グリッド着色
  });

  // 全消し（クリック）
  btn_clear.addEventListener('click', () => {
    console.log("【全消し】 "); // ★
    Cats.clear(page); // ■ グリッド白紙
  });

  // 授業に戻る（クリック）
  btn_exit.addEventListener('click', () => {
    console.log("【授業に戻る】 "); // ★
    Cats.calorDataSave(page); // ■ 着色データを配列に保存
    Cats.view("topPage"); // ■ 画面表示
    Cats.copy(page);// ■ 画像のコピー
  });


  {  // 実装検討中…
    
    // ・ローカルストレージ保存
    // Cats.calorDataSave(page); // ■ 着色データを配列に保存
    // let storage = localStorage;
    // storage.setItem("キー", colorData); // 保存
    // storage.getItem("キー"); // 呼び出し
    // storage.removeItem("キー"); // 削除
    // Cats.calorDataload(page); // ■ 着色データをグリッドに読込み
    
    // ・ドラッグアンドドロップで着色
    // ・キャンバス内でのマウスカーソル
    // ・クリップボードの画像をツイートに添付

  }


}