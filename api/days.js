export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "*");

  const DAYS = 365;

  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 1);
  const diff = today - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const todayIndex = Math.floor(diff / oneDay);

  const dayNumber = todayIndex + 1;
  const percent = ((dayNumber / DAYS) * 100).toFixed(1);

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
<meta name="viewport" content="width=device-width, initial-scale=1">

<style>
body{
margin:0;
background:#EAEFEF;
display:flex;
justify-content:center;
align-items:center;
height:100vh;
font-family:-apple-system;
}

.wrapper{text-align:center}

.counter{font-size:18px;font-weight:600;color:#25343F}
.percent{font-size:12px;opacity:.6;margin-bottom:10px}

.grid{
display:grid;
grid-template-columns:repeat(20,1fr);
gap:4px;
width:320px;
}

.day{aspect-ratio:1;background:#BFC9D1;border-radius:3px}
.past{background:#25343F}
.today{background:#FF9B51}
</style>

</head>

<body>
<div class="wrapper">
<div class="counter">Day ${dayNumber}/365</div>
<div class="percent">${percent}% completed</div>
<div class="grid">${blocks}</div>
</div>
</body>
</html>
`);
}
