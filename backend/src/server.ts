import express, { Request, Response } from "express";
import cors from "cors";

const FCM = require("fcm-node");
const app = express();

app.use(cors());
app.use(express.json());

const fcmTokens: string[] = [];

const serverKey =
  "AAAALLhA2uk:APA91bGij6pY2ow5E48BKSCH9q3QlAGe7e1HJFJS-JBDfvZXc0NOJiKryivioagjcs-xoQBVq6tku4ddLBPkeRXlNchXpL4g-KhkOFDb8dzjQayqdW_JAcPFH6Y04HqWO5zQdzQJauk7";
const fcm = new FCM(serverKey);

app.post("/course/register", (request: Request, response: Response) => {
  const { token } = request.body;
  console.log(token);
  const findedToken = fcmTokens.find((fcmToken) => fcmToken === token);

  if (!findedToken) {
    fcmTokens.push(token);
  }

  console.log(fcmTokens);

  response.json({ success: true });
});

app.post("/course/finish", (request: Request, response: Response) => {
  const { token } = request.body;

  const findedToken = fcmTokens.find((fcmToken) => fcmToken === token);

  if (!findedToken) {
    throw new Error(`You don't started any course.`);
  }

  const message = {
    to: findedToken,

    notification: {
      title: "Notificação de curso concluído",
      body: "Parabéns! Você concluiu o curso.",
    },
  };
  setTimeout(() => {
    fcm.send(message, function (err: Error, response: any) {
      if (err) {
        console.log("Ops! Algo deu errado!");
        console.log(err);
      } else {
        console.log("Notificação enviada com sucesso: ", response);
      }
    });
  }, 5000);
  response.json({ success: true });
});

app.listen(3333, () => {
  console.log("Server started on port 3333");
});
