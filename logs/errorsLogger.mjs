import winston from "winston";

const { combine, timestamp, printf } = winston.format;

const logFormat = printf(({ timestamp, level, message, meta }) => {
  const now = Date.now(); // Отримуємо поточний час у мілісекундах
  const date = new Date(now); // Перетворюємо мілісекунди в об'єкт Date

  // Форматування дати до зручного вигляду
  const formattedDate = date.toLocaleDateString('uk-UA', {
    year: 'numeric', // повний рік
    month: 'long', // назва місяця
    day: 'numeric', // день місяця
    weekday: 'long', // день тижня
  });
  let logMessage = `${formattedDate} ${level}: ${message}`;

  // Додавання додаткового контексту, якщо він є
  if (meta) {
    logMessage += `\nAdditional Info: ${JSON.stringify(meta, null, 2)}`;
  }

  return logMessage;
});

export const errorLogger = winston.createLogger({
  level: "error",
  format: combine(
    timestamp(),
    winston.format.metadata(), // Для передачі додаткового контексту
    logFormat
  ),
  transports: [
    new winston.transports.File({
      filename: "./logs/error.log",
      level: "error",
    }),
  ],
});
