import { createCanvas } from "canvas";

export default async function handler(req, res) {

  const W = 1179;
  const H = 2556;

  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");

  // Colors
  const BG = "#EAEFEF";
  const EMPTY = "#BFC9D1";
  const PAST = "#25343F";
  const TODAY = "#FF9B51";

  // Background
  ctx.fillStyle = BG;
  ctx.fillRect(0,0,W,H);

  const today = new Date();
  const start = new Date(today.getFullYear(),0,1);
  const dayIndex = Math.floor((today-start)/(1000*60*60*24));
  const total = 365;

  const cols = 20;
  const size = 45;
  const gap = 10;

  const gridWidth = cols*size + (cols-1)*gap;
  const startX = (W-gridWidth)/2;
  const startY = 350;

  for(let i=0;i<total;i++){
    const row = Math.floor(i/cols);
    const col = i%cols;

    const x = startX + col*(size+gap);
    const y = startY + row*(size+gap);

    ctx.fillStyle = EMPTY;
    if(i<dayIndex) ctx.fillStyle = PAST;
    if(i===dayIndex) ctx.fillStyle = TODAY;

    ctx.fillRect(x,y,size,size);
  }

  // Stats
  ctx.fillStyle = "#25343F";
  ctx.font = "80px Helvetica";
  ctx.textAlign="center";

  const pct = Math.round((dayIndex+1)/total*100);

  ctx.fillText(`Day ${dayIndex+1} / ${total}`,W/2,200);
  ctx.fillText(`${pct}%`,W/2,280);

  const buffer = canvas.toBuffer("image/png");

  res.setHeader("Content-Type","image/png");
  res.send(buffer);
}
