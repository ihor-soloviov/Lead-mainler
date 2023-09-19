import winston from "winston";

const { combine, timestamp, printf } = winston.format;

const logFormat = printf(({ timestamp, level, message }) => {
  return `${timestamp} ${level}: ${message}`;
});

export const errorLogger = winston.createLogger({
  level: "error",
  format: combine(timestamp(), logFormat),
  transports: [
    new winston.transports.File({
      filename: "./logs/error.log",
      level: "error",
    }),
  ],
});

