import db from "../../../../db";
import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.BOT_TOKEN);

export async function POST(req) {
  const data = await req.json();

  // записываем в SQLite
  db.prepare(
    `
  INSERT INTO applications (
    cargoName, loadPlace, unloadPlace, length, width, height, weight,
    name, company, email, phone, message, privacy, date,
    tg_id, tg_first_name, tg_last_name, tg_username
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `
  ).run(
    data.cargoName,
    data.loadPlace,
    data.unloadPlace,
    data.length,
    data.width,
    data.height,
    data.weight,
    data.name,
    data.company,
    data.email,
    data.phone,
    data.message,
    data.privacy ? 1 : 0,
    new Date().toISOString(),
    data.user?.id || null,
    data.user?.first_name || null,
    data.user?.last_name || null,
    data.user?.username || null
  );

  // отправляем админу
  const message = `
📦 <b>Новая заявка</b>

<b>Груз:</b> ${data.cargoName}
📍 <b>Погрузка:</b> ${data.loadPlace}
🏁 <b>Выгрузка:</b> ${data.unloadPlace}
📐 <b>Размеры:</b> ${data.length} × ${data.width} × ${data.height} м (Д × Ш × В)
⚖️ <b>Масса:</b> ${data.weight} т

👤 <b>Отправитель:</b>
• Имя: ${data.name}
• Компания: ${data.company}
• Email: ${data.email}
• Телефон: ${data.phone}

🤖 <b>Telegram:</b>
• ID: ${data.user?.id || "—"}
• Имя: ${data.user?.first_name || "—"}
• Фамилия: ${data.user?.last_name || "—"}
• Username: @${data.user?.username || "—"}

📝 <b>Комментарий:</b>
${data.message || "—"}
`;

  await bot.telegram.sendMessage(process.env.ADMIN_CHAT_ID, message, {
    parse_mode: "HTML",
  });
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
