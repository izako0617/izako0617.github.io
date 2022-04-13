'use strict';
import jisho from "./data.js";

{
  const msg_ja = document.querySelector('#msg_ja');
  const show02 = document.querySelector('#show02');
  const msg_cat = document.querySelector('#msg_cat');
  const btn = document.querySelector('#btn');
  const copy = document.querySelector('#copy');
  
  console.log(jisho);

  // ■ にゃん語 変換
  function nyango(word_before) {
    let word_after = word_before;
    jisho.forEach((i) => {
      word_after = word_after.replaceAll(i[0], i[1]);
      // console.log(word_after.replaceAll(i[0], i[1])); // ★
    });
    console.log("【変換前】 " + word_before); // ★
    console.log("【変換後】 " + word_after); // ★
    return word_after;
  }

  // ■ ランダムねこ背景
  function catImg() {
    let deleteClassName = "";
    for (let i = 1; i <= 13; i++) {
      deleteClassName = "cat" + ("00" + i).slice( -2 );
      show02.classList.remove(deleteClassName);
    }
    const n = Math.floor(Math.random() * 13) + 1;
    let addClassName = "cat" + ("00" + n).slice( -2 );
    show02.classList.add(addClassName);
    console.log("【背景画像】 " + addClassName); // ★
  }

  // 変換ボタンクリック
  btn.addEventListener('click', () => {
    console.log("【入力値】\n" + msg_ja.value);  // ★
    console.log("【文字数】" + msg_ja.value.length);  // ★

    catImg(); // ■ ランダムねこ背景

    // 前回のテキストを削除
    const p = document.querySelectorAll('#msg_cat p');
    for (let i = 0; i < p.length; i++) {
      msg_cat.removeChild(p[i]);
    }

    // 一行ごと配列に格納
    const msg_ja_row = msg_ja.value.split('\n');
    console.log(msg_ja_row);  // ★

    // 今回のテキスト追加
    for(let i = 0; i < msg_ja_row.length; i++) {
      const word = nyango(msg_ja_row[i]); // ■ にゃん語 変換
      // pタグ作成・値代入・末尾に追加
      const p = document.createElement('p');
      p.textContent = word + " にゃ！";
      copyText += word + " にゃ！" + "\n";
      msg_cat.appendChild(p);
    }
  });

  // コピーボタンクリック
  let copyText = "";
  copy.addEventListener('click', async () => {
    await navigator.clipboard.writeText(copyText);
    copyText = "";
  });
}


{
  const question = document.querySelector('#question');
  const answer = document.querySelector('#answer');
  const p = document.querySelectorAll('#answer p');
  const close = document.querySelector('#close');

  p[3].textContent = "現在にゃん語辞書収録数 " + jisho.length + "件";
  
  // ？ボタンクリック
  question.addEventListener('click', () => {
    answer.classList.toggle('show');
  });

  // ✕ボタンクリック
  close.addEventListener('click', () => {
    answer.classList.toggle('show');
  });
}
