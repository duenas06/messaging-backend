import http from 'http';
import cors from 'cors';
import express, { Application } from 'express';
import initKnex from './configs/knex';
import schemas from './graphql/schemas';
import resolvers from './graphql/resolvers';
import { GraphQLError } from 'graphql';
import { validateToken } from './jwt';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';

const fileUpload = require('express-fileupload');
// @ts-ignore
const port = parseInt(process?.env?.PORT) || 6321;

const app: Application = express();

const server = http.createServer(app);

// initEnvironment();

interface ConnectionContext {
  token?: String;
}

const unProtectedServer = new ApolloServer<ConnectionContext>({
  typeDefs: schemas.unProtectedDef,
  resolvers: resolvers.unProtectedResolvers,
  introspection: process.env.NODE_ENV !== 'production',
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer: server })],
});

const protectedServer = new ApolloServer<ConnectionContext>({
  typeDefs: schemas.protectedDef,
  resolvers: resolvers.protectedResolvers,
  introspection: process.env.NODE_ENV !== 'production',
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer: server })],
});

const initApolloServer = async () => {
  try {
    initKnex();

    await unProtectedServer.start();
    await protectedServer.start();

    app.get('/', (req, res) => {
      res.status(200).send(`<h2>Server is running in ${process.env.NODE_ENV} mode.</h2>`);
    });

    app.get('/debug-sentry', function mainHandler(req, res) {
      throw new Error('My first Sentry error!');
    });

    //   app.post('/postFileUpload', fileUpload({ false: true, useTempFiles: true, tempFileDir: './src/temporary_folder/' }), filesPayloadExists, fileExtLimiter(['.png', '.jpg', '.jpeg', '.hevc', '.mp4', '.docx', '.pdf']), FileUploadController);
    app.use('/unprotected-graphql', cors(), express.json(), expressMiddleware(unProtectedServer));
    app.use(
      '/protected-graphql',
      cors(),
      express.json(),
      expressMiddleware(protectedServer, {
        // WHEN USING THIS ON APOLLO PLAYGROUND TURN OFF THE SCHEMA LONG POLLING
        context: async ({ req }) => {
          const auth = req.headers.authorization;
          const user = await validateToken(req.headers.authorization as string);

          if (auth === undefined || typeof user === 'string') {
            throw new GraphQLError('USER IS NOT ALLOW TO ACCESS', {
              extensions: {
                code: 'UNAUTHENTICATED USER',
                http: { status: 401 },
              },
            });
          } else {
            return { ...user };
          }
        },
      })
    );

    server.listen(port, async () => {
      console.log(`API ENVIRONMENT - ${process.env.NODE_ENV}`);
      console.log(`APP IS NOW RUNNING - http://localhost:${port}/unprotected-graphql`);
      console.log(`APP IS NOW RUNNING - http://localhost:${port}/protected-graphql`);
    });
  } catch (error: any) {
    console.error('initApolloServer', JSON.stringify(error));
  }
};
initApolloServer();
