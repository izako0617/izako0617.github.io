'use strict';

// #nyazilla 実装
{
  const h1 = document.querySelector('#nyazilla h1');
  const p = document.querySelectorAll('#nyazilla p span');
  const x = document.querySelectorAll('#xline li');
  const xb = document.querySelectorAll('#xsky li');
  const y = document.querySelector('#yline');
  // 設定
  const load = [
    "000000001",
    "0100010010",
    "0100010010",
    "0100000010",
    "0010001100",
    "0100010001",
    "1000100110",
    "0011010001",
    "1110001111",
    "0000000000",
  ];
  const jump = "01233210";
  let xline_0 = "0";
  let yline_0 = "0";

  let sum = 0;
  for (let i = 0; i < load.length; i++) {
    sum += load[i];
  }
  console.log(sum); // ★
  console.log(sum.length); // ★

  // ■ xline
  let x_num = 0;
  function xline() {
    setTimeout(() => {
      xline_0 = sum[x_num];
      // console.log("xline_0: " + xline_0); // ★
      groundImg(x_num); // ■
      gameOverClear(); // ■
      nyazillaWalk(x_num); // ■
      pointPrint(x_num); // ■
      x_num++;
      const xline_end = setTimeout(xline, speed(x_num));
      if(gmclr === 1 || gmvr === 1) { // ゲーム終了
        clearTimeout(xline_end);
        console.log('▲ x 終了'); // ★
        x_num = 0;
        x_play = 0;
        gmvr = 0;
        gmclr = 0;
      }
    } , 0);
  }

  // ■ yline
  let y_num = 0;
  function yline() {
    y.classList.add('yj');
    setTimeout(() => {
      // y.textContent = jump[y_num]; //☆
      yline_0 = jump[y_num];
      // console.log("yline_0: " + yline_0); // ★
      y_num++;
      const yline_end = setTimeout(yline, 500);
      if(y_num >= jump.length) {
        y.classList.remove('yj');
        clearTimeout(yline_end);
        console.log('▲ y 終了'); // ★
        y_num = 1;
        y_play = 0;
      }
    } , 0);
  }

  // ■ ゲームオーバー・ゲームクリアー判定
  let gmvr = 0;
  let gmclr = 0;
  function gameOverClear() {
    if (xline_0 === "1" && yline_0 === "0") {
      h1.textContent = "GAME OVER";
      console.log("GAME OVER"); // ★
      gmvr = 1;
    } else if (x_num >= sum.length) {
      h1.textContent = "CLEAR";
      console.log("GAME CLEAR"); // ★
      gmclr = 1;
    } else {
      h1.textContent = " ";
      console.log("SAFE"); // ★
    }
  }

  // ■ ポイント・ハイスコア出力
  let higthScore = "00000";
  function pointPrint(point) {
    if(gmclr === 1 || gmvr === 1) {
      if (higthScore < point) {
        higthScore = point;
      }
    } else if (point % 10 === 0 && point !== 0) {
      // 点滅処理
      p[1].classList.add('onoff');
    } else {
      setTimeout(p[1].classList.remove('onoff'), 3000);
    }
    p[1].textContent = ('0000' + point).slice( -4) + "0";
    p[0].textContent = "HI " + ('0000' + higthScore).slice( -4) + "0";
  }

  // ■ 地面・空 アニメ
  function groundImg(n) {
    // 地面
    for (let i = 0; i < 10; i++) {
      x[i].classList.remove('x0');
      x[i].classList.remove('x1');
      x[i].classList.remove('xend');
      if (sum[n + i] !== undefined) {
        // x[i].textContent = sum[n + i]; //☆
        if (sum[n + i] === "0") {
          x[i].classList.add('x0');
        } else {
          x[i].classList.add('x1');
        }
      } else {
        // x[i].textContent = "end"; //☆
        x[i].classList.add('xend');
      }
    }
    // 空
    let sky = "000102000100210".repeat(10);
    if (n % 3 === 0) {
      for (let i = 0; i < 10; i++) {
        xb[i].textContent = " "; // ☆
        xb[i].classList.remove('xb1');
        xb[i].classList.remove('xb2');
        let j = i + n / 3;
        // xb[i].textContent = sky[j]; // ☆
        if (sky[j] === "1") {
          xb[i].classList.add('xb1');
        } else if (sky[j] === "2") {
          xb[i].classList.add('xb2');
        } else {
        }
      }
    }
  }

  // ■ ニャジラ歩く・アウト アニメ
  function nyazillaWalk(n) {
    if (gmvr === 1) {
      y.classList.remove('y0');
      y.classList.remove('y1');
      y.classList.add('y2');
    } else if (n % 2 === 0){
      y.classList.remove('y1');
      y.classList.remove('y2');
      y.classList.add('y0');
    } else {
      y.classList.remove('y0');
      y.classList.remove('y2');
      y.classList.add('y1');
    }
  }

  // ■ スピード処理
  // const speed = [1500, 1300, 1100, 900, ];
    function speed(n) {
    if (n < 10) {
      console.log(n, 1500);
      return 1500;
    } else if (n < 20) {
      console.log(n, 1300);
      return 1300;
    } else if (n < 30) {
      console.log(n, 1100);
      return 1100;
    } else if (n < 40) {
      console.log(n, 900);
      return 900;
    } else if (n < 50) {
      console.log(n, 800);
      return 800;
    } else if (n < 60) {
      console.log(n, 700);
      return 700;
    } else if (n < 90) {
      console.log(n, 600);
      return 600;
    } else if (n < 100) {
      console.log(n, 1000);
      return 1000;
    }
  }

  // ニャジラ起動 (startボタン)
  let x_play = 0;
  document.querySelector('#btn_ok').addEventListener('click', () => {
    if (x_play === 0) {
      console.log('▼ x 開始'); // ★
      x_play = 1;
      xline(); // ■
    } else {                        // ニャジラがすでに起動中は起動しない
    }
  });
  
  // ニャジラ起動 (nyazillaボタン)
  let y_play = 0;
  y.addEventListener('click', () => {
    if (x_play === 0) {             // ニャジラが未起動時は起動する
      console.log('▼ x 開始'); // ★
      x_play = 1;
      xline(); // ■
    } else if (y_play === 0) {      // ニャジラがすでに起動中はジャンプする
      console.log('▼ y 開始'); // ★
      y_play = 1;
      yline(); // ■
    } else {                        // すでにジャンプ中はジャンプしない
    }
  });
}

// #text 実装
{
  const q = document.querySelector('#btn_question dt');
  const a = document.querySelector('#btn_question dd');
  const li = document.querySelectorAll('#text li');
  const err = document.querySelector('#err');
  const ok = document.querySelector('#btn_ok');

  // はてなボタン
  q.addEventListener('click', () => {
    const amsg = [
      'ニャジラはChromeブラウザーの<br>パロディです', 
      'ニャジラは田舎産の<br>いもねこです', 
      'やきいもから<br>スイートポテトへ',
      '着地クッションはセーフです',
      '大きないもは抜けません',
    ];
    a.innerHTML = amsg[Math.floor(Math.random() * amsg.length)];
    a.classList.toggle('hide');
    li[0].textContent = "ニャジラをタップ！";
    li[1].textContent = "タップしてジャンプ！";
    li[2].textContent = "そして、ニャジラ都会へ行く…";
    // err.textContent = "ARE_YOU_LADY?";
    err.textContent = "ARE_YOU_READY_TO_BE_A_LADY?";
    ok.textContent = "STRAT";
    li[0].classList.add('fadein');
    li[1].classList.add('fadein');
    li[2].classList.add('fadein');
    err.classList.add('fadein');
    ok.classList.add('fadein');
  });
}