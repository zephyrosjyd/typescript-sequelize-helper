/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-var-requires */
// const path = require('path');
const dotenv = require('dotenv');

const Logger = console;

// 전체 공용 환경설정
// dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
dotenv.config();
Logger.debug(process.env, 'environment variables');
