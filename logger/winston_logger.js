/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-undef */
const winston = require("winston");
// const path = require("path");
// const config = require("config");

// eslint-disable-next-line no-undef
const infoFileName = "./logs/log_info.log";//path.join(__dirname, "/log_info.log");
// eslint-disable-next-line no-undef
const errorFileName = "./logs/log_error.log";//path.join(__dirname, "/log_error.log");

/**
 * Возвращает настроенный winston-логгер. В случае если в файле config.json секция development указана как true
 * помимо логгирования в файл происходит логгирование и в console. При этом логгирование происходит в два файла: log_error.log и log_info.log
 */
const nodeEnv = !process.env.NODE_ENV ? "development" : process.env.NODE_ENV;

if (nodeEnv === "development") {
	exports.logger = winston.createLogger({
		transports: [
		    new winston.transports.Console({ format: winston.format.combine(winston.format.colorize(),	winston.format.simple()) }),
			new winston.transports.File({ format: winston.format.combine(winston.format.timestamp(), winston.format.json()), name: "info-log", level: "info", filename: infoFileName }),
			new winston.transports.File({ format: winston.format.combine(winston.format.timestamp(), winston.format.json()), name: "error-log", level: "error", filename: errorFileName })
		]
	});
}
else {
	exports.logger = winston.createLogger({
		transports: [
			new winston.transports.Console({ format: winston.format.combine(winston.format.colorize(),	winston.format.simple()) }),
			new winston.transports.File({ format: winston.format.combine(winston.format.timestamp(), winston.format.json()), name: "info-log", level: "info", filename: process.env.INFO_LOG }),
			new winston.transports.File({ format: winston.format.combine(winston.format.timestamp(), winston.format.json()), name: "error-log", level: "error", filename: process.env.ERROR_LOG })
		]
	});
}















