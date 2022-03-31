'use strict';

{
  // const set_name = ["who", "what", "when", "where", "how", "play"];
  const btn_open = document.querySelector('#btn_open');
  const btn_close = document.querySelector('#btn_close');
  const mask = document.querySelector('#mask');
  const command = document.querySelector('#command');
  const text = document.querySelector('#text');
  const text_empty = [
    "にゃんにゃんする",
    "生涯ネコとしていきる", 
    "ネコをネ申としてあがめる", 
    "ネコに小判を納める", 
    "玉様を布教する"
  ];
  
  // 開く（クリック）
  btn_open.addEventListener('click', () => {
    const set_input = [
      document.querySelectorAll('#who input'),
      document.querySelectorAll('#when input'),
      document.querySelectorAll('#who input'),
      document.querySelectorAll('#what input'),
      document.querySelectorAll('#where input'),
      document.querySelectorAll('#how input'),
      document.querySelectorAll('#play input')
    ];

    const set_value = [];                              // [[00,01,02,...],[10,11,12,...],[20,21,22,...],...]
    let ran = 0;
    const set_text = [];                               // [0*,1*,2*,...]
    for (let j = 0; j < set_input.length; j++) {
      set_value[j] = [];
      for (let i = 0; i < 5; i++) {
        set_value[j].push(set_input[j][i].value);       // 値を配列に代入
      }
      console.log(set_value[j]); // ★
      
      ran = Math.floor(Math.random() * set_value[j].length); // ランダム
      console.log(ran); // ★
      console.log(set_value[j][ran]); // ★
      set_text.push(set_value[j][ran]);
    }

    console.log(set_text); // ★
    let text_change = "";
    const text_ja = [" が ", " に ", " の ", " を ", " で ", " ", " のにゃ！"];
    for (let i = 0; i < set_text.length; i++) {
      if (set_text[i] !== "") {
        text_change += set_text[i] + text_ja[i];
      } else {
        text_change += "";
      }
    }
    if (text_change === "") {
      ran = Math.floor(Math.random() * text_empty.length);
      text_change = text_empty[ran] + text_ja[6];
    } else if (set_text[6] === "") {
      text_change +=text_empty[0] + text_ja[6];
    }

    console.log(text_change); // ★
    text.textContent = text_change;

    mask.classList.remove('hide');
    command.classList.remove('hide');
    console.log("開く"); // ★
  });

  // 閉じる（クリック）
  btn_close.addEventListener('click', () => {
    mask.classList.add('hide');
    command.classList.add('hide');
    console.log("閉じる"); // ★
  });
}


