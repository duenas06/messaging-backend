"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const objection_1 = require("objection");
// https://www.npmjs.com/package/colors
const colors = require('colors');
colors.enable();
const initKnex = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const knex = (0, knex_1.default)({
        client: 'pg',
        connection: {
            host: process.env.INSTANCE_SOCKET ? process.env.INSTANCE_SOCKET : process.env.PG_HOST,
            port: parseInt((_a = process.env.PG_PORT) !== null && _a !== void 0 ? _a : '5432'),
            user: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DATABASE,
        },
        pool: {
            min: 0,
            max: 7,
            afterCreate: (connection, done) => {
                done(null, connection);
            },
        },
    });
    knex.on('query', (queryData) => {
        const SQL = queryData === null || queryData === void 0 ? void 0 : queryData.sql;
        console.log('\n🚀 START OF QUERY');
        if (SQL.indexOf('where') > -1) {
            console.log('\n' +
                colors.brightBlue('TABLE: ') +
                colors.green(SQL.substring(SQL.indexOf('from') + 5, SQL.indexOf('where'))
                    .replace('"', '')
                    .replace('"', '')));
        }
        else {
            console.log('\n' +
                colors.brightBlue('TABLE: ') +
                colors.green(SQL.substring(SQL.indexOf('select') + 7, SQL.indexOf('.'))
                    .replace('"', '')
                    .replace('"', '')));
        }
        console.log(colors.brightBlue('DATE: ') + colors.green(`${new Date().toTimeString()}`));
        console.log(colors.brightBlue('QUERY: ') + colors.brightCyan(`${SQL}\n`));
        console.log(`🚀 END OF QUERY `);
    });
    // Give the knex instance to objection.
    objection_1.Model.knex(knex);
});
exports.default = initKnex;
