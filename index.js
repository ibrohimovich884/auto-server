import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const TARGET_URL = "https://four0-mak-server-3.onrender.com/health";

// Bu endpoint orqali ma'lumotni qaytaradi
app.get("/ping-data", async (req, res) => {
  try {
    const response = await fetch(TARGET_URL);
    const data = await response.json(); // u yerdan JSON qaytadi deb hisoblaymiz
    res.json({
      source: TARGET_URL,
      data
    });
  } catch (err) {
    res.status(500).json({ error: "Ma'lumotni olishda xatolik", detail: err.message });
  }
});

await fetch("https://four0-mak-server-3.onrender.com/notify", { 
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    message: "Health endpoint ishga tushdi!",
    time: new Date().toISOString(),
  }),
});


// Pingni 10 daqiqada bir yuborish (faqat backendni uyg‘otish uchun)
setInterval(async () => {
  try {
    const res = await fetch(TARGET_URL);
    console.log(`[PING] ${new Date().toLocaleTimeString()} - Status: ${res.status}, Messenge ${res.message}`);
  } catch (err) {
    console.error("Ping xatolik:", err.message);
  }
}, 1000); // 10 minut 600000

app.listen(3000, () => {
  console.log("Ping server 3000-portda ishlayapti");
});
