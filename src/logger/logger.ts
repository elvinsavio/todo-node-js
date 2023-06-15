import { createLogger, format, transports } from "winston";
const { printf } = format;

const infoFormatter = printf(({ message, label }) => {
  return `${new Date().toISOString()}::[${label}]::${message}`;
});

export const infoLogger = createLogger({
  level: "info",
  format: infoFormatter,
  transports: [new transports.Console(), new transports.File({ filename: "logs/log.log", level: "info" })],
});

const errorFormatter = printf(({ message, label }) => {
  return `${new Date().toISOString()}::[${label}]::${message}`;
});

export const errorLogger = createLogger({
  level: "info",
  format: errorFormatter,
  transports: [new transports.Console(), new transports.File({ filename: "logs/error.log", level: "error" })],
});
