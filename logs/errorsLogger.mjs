import winston from "winston";

const { combine, timestamp, printf } = winston.format;

const logFormat = printf(({ timestamp, level, message, meta }) => {
  let logMessage = `${timestamp} ${level}: ${message}`;

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
