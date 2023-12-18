import Knex from 'knex';
import { Model } from 'objection';

// https://www.npmjs.com/package/colors
const colors = require('colors');

colors.enable();

const initKnex = async () => {
  const knex = Knex({
    client: 'pg',
    connection: {
      host: process.env.INSTANCE_SOCKET ? process.env.INSTANCE_SOCKET : process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT ?? '5432'),
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
    },
    pool: {
      min: 0,
      max: 7,
      afterCreate: (connection: any, done: any) => {
        done(null, connection);
      },
    },
  });

  knex.on('query', (queryData) => {
    const SQL: string = queryData?.sql;

    console.log('\n🚀 START OF QUERY');

    if (SQL.indexOf('where') > -1) {
      console.log(
        '\n' +
          colors.brightBlue('TABLE: ') +
          colors.green(
            SQL.substring(SQL.indexOf('from') + 5, SQL.indexOf('where'))
              .replace('"', '')
              .replace('"', '')
          )
      );
    } else {
      console.log(
        '\n' +
          colors.brightBlue('TABLE: ') +
          colors.green(
            SQL.substring(SQL.indexOf('select') + 7, SQL.indexOf('.'))
              .replace('"', '')
              .replace('"', '')
          )
      );
    }

    console.log(colors.brightBlue('DATE: ') + colors.green(`${new Date().toTimeString()}`));

    console.log(colors.brightBlue('QUERY: ') + colors.brightCyan(`${SQL}\n`));
    console.log(`🚀 END OF QUERY `);
  });

  // Give the knex instance to objection.
  Model.knex(knex);
};

export default initKnex;
