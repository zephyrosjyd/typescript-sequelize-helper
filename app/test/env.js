/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const dotenv = require('dotenv');

const Logger = console;

// 전체 공용 환경설정
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
Logger.debug(process.env, 'environment variables');

// const NODE_ENV = process.env.NODE_ENV || 'local';
// // docker환경이 아닐때 실행되는 세팅
// if (NODE_ENV === 'test' || NODE_ENV === 'local') {
//   process.env.SERVER_NAME = 'guideRest';
//   process.env.KAFKA_HOST = process.env.KAFKA_LOCAL_HOST;
//   process.env.POSTGRES_HOST = process.env.POSTGRES_LOCAL_HOST;

//   const tagetPort = `${_.toUpper(process.env.SERVER_NAME)}_PORT`;
//   process.env[tagetPort] = `${process.env[tagetPort]}1`;

//   Logger.log('completely loaded env file.');
// }
