#!/bin/sh

rm -rf node_modules
rm -f yarn.lock yarn-*.log

yarn add "dotenv"\
    "lodash"\
    "pg"\
    "sequelize"
yarn add -D "@types/bluebird"\
    "@types/dotenv"\
    "@types/jest"\
    "@types/lodash"\
    "@types/node"\
    "@types/pg"\
    "@types/sequelize"\
    "@typescript-eslint/eslint-plugin"\
    "@typescript-eslint/parser"\
    "eslint"\
    "eslint-config-airbnb-typescript"\
    "eslint-plugin-import"\
    "eslint-plugin-jest"\
    "jest"\
    "nodemon"\
    "plugin-import"\
    "sequelize-cli"\
    "ts-jest"\
    "ts-node"\
    "typescript"
