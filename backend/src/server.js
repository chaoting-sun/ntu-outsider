import * as fs from "fs";
import { createServer } from "node:http";
import { WebSocketServer } from "ws";
import { createPubSub, createSchema, createYoga } from "graphql-yoga";
import { useServer } from "graphql-ws/lib/use/ws";
import { ChatBoxModel } from "./models/chatbox";
import { PostModel } from "./models/post";
import { UserModel } from "./models/user";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Subscription from "./resolvers/Subscription";
import ChatBox from "./resolvers/ChatBox";
import Post from "./resolvers/Post";
import path from "path";
import express from "express";
import cors from "cors";

const pubsub = createPubSub();

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(cors());
}

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../frontend", "build")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
  });
}

const yoga = new createYoga({
  schema: createSchema({
    typeDefs: fs.readFileSync("./src/schema.graphql", "utf-8"),
    resolvers: {
      Query,
      Mutation,
      Subscription,
      ChatBox,
      Post,
    },
  }),
  context: {
    ChatBoxModel,
    PostModel,
    UserModel,
    pubsub,
  },
  graphql: {
    subscriptionsProtocol: "WS",
  },
});
app.use('/graphql', yoga);
const httpServer = createServer(app);
const wsServer = new WebSocketServer({
  server: httpServer,
  path: yoga.graphqlEndpoint,
});

useServer(
  {
    execute: (args) => args.rootValue.execute(args),
    subscribe: (args) => args.rootValue.subscribe(args),
    onSubscribe: async (ctx, msg) => {
      const { schema, execute, subscribe, contextFactory, parse, validate } =
        yoga.getEnveloped({
          ...ctx,
          req: ctx.extra.request,
          socket: ctx.extra.socket,
          params: msg.payload,
        });
      const args = {
        schema,
        operationName: msg.payload.operationName,
        document: parse(msg.payload.query),
        variableValues: msg.payload.variables,
        contextValue: await contextFactory(),
        rootValue: {
          execute,
          subscribe,
        },
      };
      const errors = validate(args.schema, args.document);
      if (errors.length) return errors;
      return args;
    },
  },
  wsServer
);

export default httpServer;
