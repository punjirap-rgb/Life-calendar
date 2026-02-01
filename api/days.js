export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const W = 1170;
  const H = 2532;


  const DAYS = 365;
  const COLS = 20;

  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 1);
  const diff = today - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const todayIndex = Math.floor(diff / oneDay);

  const dayNumber = todayIndex + 1;
  const percent = ((dayNumber / DAYS) * 100).toFixed(1);

  // Match lifecal sizing logic
  const gridWidth = Math.min(W * 0.78, 420);
  const gap = Math.round(gridWidth / 90);
  const cell = (gridWidth - gap * (COLS - 1)) / COLS;

  let blocks = "";

  for (let i = 0; i < DAYS; i++) {
    let cls = "day";
    if (i < todayIndex) cls += " past";
    if (i === todayIndex) cls += " today";
    blocks += `<div class="${cls}"></div>`;
  }

  res.send(`
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=1170, height=2532, initial-scale=1">

<style>
body{
margin:0;
background:#EAEFEF;
width:1170px;
height:2532;
display:flex;
justify-content:center;
align-items:center;
font-family:-apple-system;
overflow:hidden;
}


.wrapper{
display:flex;
flex-direction:column;
align-items:center;
}

.counter{
font-size:${Math.round(W/38)}px;
font-weight:600;
color:#25343F;
}

.percent{
font-size:${Math.round(W/75)}px;
opacity:.6;
margin:4px 0 14px;
}

.grid{
display:grid;
grid-template-columns:repeat(${COLS},${cell}px);
gap:${gap}px;
}

.day{
height:${cell}px;
background:#BFC9D1;
border-radius:4px;
}

.past{background:#25343F}
.today{background:#FF9B51}
</style>

</head>

<body>
<div class="wrapper">
<div class="counter">Day ${dayNumber} / ${DAYS}</div>
<div class="percent">${percent}% completed</div>
<div class="grid">${blocks}</div>
</div>
</body>
</html>
`);
}
