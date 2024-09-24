const { createLogger, format, transports } = require("winston");
require("winston-daily-rotate-file");
const fs = require("fs");
const path = require("path");

const env = process.env.NODE_ENV || "development";
const logDir = "log";

//* Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const filename = path.join(logDir, "results.log");

const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: `${logDir}/%DATE%-result.log`,
  datePattern: "DD-MM-YYYY",
});

const logger = createLogger({
  //* change level if in dev environment versus production
  level: env === "development" ? "debug" : "info",
  //* อันนี้เป็น global format แปลว่าสามารถ ทำ formatแบบ locale ได้เช่นกัน
  format: format.combine(
    format.label({ label: path.basename(require.main.filename) }),
    format.timestamp({
      format: "DD-MM-YYYY HH:mm:ss",
    }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
    // format.json()
  ),
  // format: format.json(),
  transports: [
    new transports.Console({
      //*  ใน console สามารถ ตังค่า format ซ้อนได้อีก ทำให้ console จะใช้ format ด้านในนี้ ส่วน file จะใช้ format จาก property เริ่มต้น
      level: "info",
      //* here is the locale format
      format: format.combine(
        format.colorize(),
        format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
      ),
    }),
    //* อันบนสร้างแล้วมันจะค้างอยู่ในเครื่อง แต่อันล่าง มันจะมีการลบตัวเองแบบรายวัน
    // new transports.File({ filename }),
    // dailyRotateFileTransport,
    new transports.File({
        filename,
        format: format.combine(
          format.printf(
            info =>
              `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`
          )
        )
      })
  ],
});

module.exports = logger;
