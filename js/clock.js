const dates = document.querySelector(".date");
const times = document.querySelector(".time");

function time() {
  const today = new Date();
  const H = today.getHours();
  const M = today.getMinutes();
  const S = today.getSeconds();

  times.innerHTML = `${H}:${M < 10 ? `0${M}` : M}:${S < 10 ? `0${S}` : S}`;
}

function date() {
  const today = new Date();
  const D = today.getDate();
  const M = today.getMonth() + 1;
  const Y = today.getFullYear();

  dates.innerHTML = `${D < 10 ? `0${D}` : D}:${M < 10 ? `0${M}` : M}:${Y}`;
}

time();

date();

setInterval(time, 1000);
setInterval(date, 1000);
