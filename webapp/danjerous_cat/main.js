'use strict';

{
  const open = document.getElementById('open');
  const mask = document.getElementById('mask');
  const modal = document.getElementById('modal');
  const d_cat = document.getElementById('d_cat');

  // 開くをクリックしたとき
  open.addEventListener('click', () => {
    open.classList.add('hidden');              // hiddenクラスを追加
    mask.classList.remove('hidden');           // hiddenクラスを削除
    modal.classList.remove('hidden');
    d_cat.classList.remove('hidden');
  });

  // 閉まる関数
  function close() {
    open.classList.remove('hidden');           // hiddenクラスを削除
    mask.classList.add('hidden');              // hiddenクラスを追加
    modal.classList.add('hidden');
    d_cat.classList.add('hidden');
  }

  // クリックしたとき、閉まる関数
  d_cat.addEventListener('click', close);
  mask.addEventListener('click', close);
  modal.addEventListener('click', close);
}

