import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const TARGET_URL = "https://four0-mak-server-3.onrender.com/hez";

setInterval(async () => {
  try {
    const res = await fetch(TARGET_URL);
    console.log(`[PING] ${new Date().toLocaleTimeString()} - Status: ${res.status}`);
  } catch (err) {
    console.error("Xatolik:", err.message);
  }
}, 600000); // 10 minut = 600000 ms

app.listen(3000, () => {
  console.log("Ping server 3000-portda ishlayapti");
});
