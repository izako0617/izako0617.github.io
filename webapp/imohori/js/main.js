'use strict';

import Ground from "./ground.js";
import mapData from "./data.js";


{
  // DOM ターゲット
  const header = document.querySelector('header'); 
  const footer = document.querySelector('footer'); 
  const ground_f = document.querySelector('#ground'); 
  const ground_b = document.querySelector('#underground');
  const imo = document.querySelector('#imo');
  const map = document.querySelector('#map');
  const mask = document.querySelector('#mask');
  const btn_start = document.querySelector('#ground #btn_start');
  const btn_next = document.querySelector('#ground #btn_next');
  const btn_l = document.querySelector('#btn_l');
  const btn_r = document.querySelector('#btn_r');
  const btn_t = document.querySelector('#btn_t');
  const btn_b = document.querySelector('#btn_b');
  const btn_map = document.querySelector('#btn_map');
  const btn_exit = document.querySelector('#btn_exit');

  // □ ロード時実行(ロード)
  document.addEventListener('DOMContentLoaded', () => {
    console.log("□ 【イベント】ロード"); // ★
    Ground.view("ground_f"); // ■ 画面遷移
    Ground.newMap(); // ■ マップ新規作成
  });

  // □ スタートボタン(クリック)
  btn_start.addEventListener('click', () => {
    console.log("□ 【イベント(クリック)】スタート"); // ★
    Ground.view("ground_b"); // ■ 画面遷移
    Ground.underWorld("・"); // ■ 地中探索
  });

  // □ 別のいもにする(クリック)
  btn_next.addEventListener('click', () => {
    console.log("□ 【イベント(クリック)】別のいも"); // ★
    Ground.newMap(); // ■ マップ新規作成
    Ground.nextImoAnime(); // ■ 地上別のいもアニメ
  });

  // □ 上ボタン(クリック)
  btn_t.addEventListener('click', () => {
    console.log("□ 【イベント(クリック)】上"); // ★
    Ground.underWorld("↑"); // ■ 地中探索
  });

  // □ 下ボタン(クリック)
  btn_b.addEventListener('click', () => {
    console.log("□ 【イベント(クリック)】下"); // ★
    Ground.underWorld("↓"); // ■ 地中探索
  });

  // □ 左ボタン(クリック)
  btn_l.addEventListener('click', () => {
    console.log("□ 【イベント(クリック)】左"); // ★
    Ground.underWorld("←"); // ■ 地中探索
  });

  // □ 右ボタン(クリック)
  btn_r.addEventListener('click', () => {
    console.log("□ 【イベント(クリック)】右"); // ★
    Ground.underWorld("→"); // ■ 地中探索
  });

  // □ マップボタン(クリック)
  btn_map.addEventListener('click', () => {
    console.log("□ 【イベント(クリック)】マップ"); // ★
    Ground.view("map"); // ■ 画面遷移
  });

  // □ ギブアップボタン(クリック)
  btn_exit.addEventListener('click', () => {
    console.log("□ 【イベント(クリック)】マップ"); // ★
    Ground.view("ground_f"); // ■ 画面遷移
  });

  // □ マップ画面(クリック)
  map.addEventListener('click', () => {
    console.log("□ 【イベント(クリック)】マップ"); // ★
    let playGame = Ground.reValue("playGame"); // ■ 値をmain.jsに返す
    if (playGame === "ON") {
      Ground.view("ground_b"); // ■ 画面遷移
    } else if (playGame === "OFF") {
      Ground.view("ground_f"); // ■ 画面遷移
      Ground.newMap(); // ■ マップ新規作成
    }
  });

  // □ マスク画面(クリック)
  let playGameOffModal = 0;
  mask.addEventListener('click', () => {
    console.log("□ 【イベント(クリック)】マスク"); // ★
    let playGame = Ground.reValue("playGame"); // ■ 値をmain.jsに返す
    if (playGame === "ON") {
      Ground.view("ground_b"); // ■ 画面遷移
    } else if (playGame === "OFF") {
      if (playGameOffModal === 0) {
        Ground.view("map"); // ■ 画面遷移
        playGameOffModal++;
      } else if (playGameOffModal === 1){
        Ground.view("ground_f"); // ■ 画面遷移
        Ground.newMap(); // ■ マップ新規作成
        playGameOffModal = 0;
      }
    }
  });

  // □ イモ画面(クリック)
  imo.addEventListener('click', () => {
    console.log("□ 【イベント(クリック)】イモ"); // ★
    let playGame = Ground.reValue("playGame"); // ■ 値をmain.jsに返す
    if (playGame === "ON") {
      Ground.view("ground_b"); // ■ 画面遷移
    } else if (playGame === "OFF") {
      Ground.view("map"); // ■ 画面遷移
    }
  });

}

// □ イベント
// ■ 関数、メソッド