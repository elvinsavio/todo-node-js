const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

interface IFormatter {
  level: "info" | "error" | "http";
  message: string;
  label: string;
  timestamp: Date;
  at?: string;
}

const formatter = printf(({ level, message, label, timestamp, at }: IFormatter) => {
  return `${timestamp}::[${label}]::${level}::${message}${at ? `::${at}` : ""}`;
});

const logger = createLogger({
  transports: [
    new transports.File({ filename: "log/log.log", level: "info", format: formatter }),
    new transports.File({ filename: "log/error.log", level: "error", format: formatter }),
  ],
});

export default {
  info: (message: string, label: string, at?: string) => {
    logger.log({
      level: "info",
      message,
      label,
      at,
      timestamp: new Date().toISOString(),
    });
  },
  error: (message: string, label: string, at?: string) => {
    logger.error({
      level: "error",
      message,
      label,
      at,
      timestamp: new Date().toISOString(),
    });
  },
};
