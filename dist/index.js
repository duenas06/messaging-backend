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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const knex_1 = __importDefault(require("./configs/knex"));
const schemas_1 = __importDefault(require("./graphql/schemas"));
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const graphql_1 = require("graphql");
const jwt_1 = require("./jwt");
const server_1 = require("@apollo/server");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const express4_1 = require("@apollo/server/express4");
const fileUpload = require('express-fileupload');
// @ts-ignore
const port = parseInt((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.PORT) || 6321;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const unProtectedServer = new server_1.ApolloServer({
    typeDefs: schemas_1.default.unProtectedDef,
    resolvers: resolvers_1.default.unProtectedResolvers,
    introspection: process.env.NODE_ENV !== 'production',
    plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer: server })],
});
const protectedServer = new server_1.ApolloServer({
    typeDefs: schemas_1.default.protectedDef,
    resolvers: resolvers_1.default.protectedResolvers,
    introspection: process.env.NODE_ENV !== 'production',
    plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer: server })],
});
const initApolloServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, knex_1.default)();
        yield unProtectedServer.start();
        yield protectedServer.start();
        app.get('/', (req, res) => {
            res.status(200).send(`<h2>Shyfts Server is running in ${process.env.NODE_ENV} mode.</h2>`);
        });
        app.get('/debug-sentry', function mainHandler(req, res) {
            throw new Error('My first Sentry error!');
        });
        //   app.post('/postFileUpload', fileUpload({ false: true, useTempFiles: true, tempFileDir: './src/temporary_folder/' }), filesPayloadExists, fileExtLimiter(['.png', '.jpg', '.jpeg', '.hevc', '.mp4', '.docx', '.pdf']), FileUploadController);
        app.use('/unprotected-graphql', (0, cors_1.default)(), express_1.default.json(), (0, express4_1.expressMiddleware)(unProtectedServer));
        app.use('/protected-graphql', (0, cors_1.default)(), express_1.default.json(), (0, express4_1.expressMiddleware)(protectedServer, {
            // WHEN USING THIS ON APOLLO PLAYGROUND TURN OFF THE SCHEMA LONG POLLING
            context: ({ req }) => __awaiter(void 0, void 0, void 0, function* () {
                const auth = req.headers.authorization;
                const user = yield (0, jwt_1.validateToken)(req.headers.authorization);
                if (auth === undefined || typeof user === 'string') {
                    throw new graphql_1.GraphQLError('USER IS NOT ALLOW TO ACCESS', {
                        extensions: {
                            code: 'UNAUTHENTICATED USER',
                            http: { status: 401 },
                        },
                    });
                }
                else {
                    return Object.assign({}, user);
                }
            }),
        }));
        server.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`API ENVIRONMENT - ${process.env.NODE_ENV}`);
            console.log(`APP IS NOW RUNNING - http://localhost:${port}/unprotected-graphql`);
            console.log(`APP IS NOW RUNNING - http://localhost:${port}/protected-graphql`);
        }));
    }
    catch (error) {
        console.error('initApolloServer', JSON.stringify(error));
    }
});
initApolloServer();
