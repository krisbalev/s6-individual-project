//!POST SERVICE

import amqp from "amqplib";

const QUEUE_NAME = "test-queue";
const REPLY_QUEUE = "test-reply-queue";

const URL = process.env.RABBITMQ_URL || "amqp://localhost:5672";

console.log(URL);


let channel: amqp.Channel, connection: amqp.Connection;
let correlationId = 1;

export async function connectQueue() {
  try {
    connection = await amqp.connect(URL);
    connection.on("error", handleConnectionError);
    connection.on("close", handleConnectionClose);
    channel = await connection.createChannel();

    await channel.assertQueue(REPLY_QUEUE);
    await channel.assertQueue(QUEUE_NAME);

    console.log("Connected to RabbitMQ");
  } catch (error) {
    handleConnectionError(error);
  }
}

function handleConnectionError(err: any) {
  console.error("RabbitMQ connection error:", err);
}

function handleConnectionClose() {
  console.log("RabbitMQ connection closed");
}

export async function sendData(data: any) {
  try {
    if (!channel) {
      console.log("RabbitMQ channel not available. Reconnecting...");
      await connectQueue();
    }

    const currentCorrelationId = correlationId++;
    const message = JSON.stringify(data);

    const { queue } = await channel.assertQueue("", { exclusive: true });

    const responsePromise = new Promise((resolve) => {
      channel.consume(
        queue,
        (msg) => {
          if (
            msg?.properties.correlationId === currentCorrelationId.toString()
          ) {
            const response = msg.content.toString();
            channel.ack(msg);
            resolve(response);
          }
        },
        { noAck: true }
      );
    });

    await channel.assertQueue(QUEUE_NAME);
    await channel.sendToQueue(QUEUE_NAME, Buffer.from(message), {
      replyTo: queue,
      correlationId: currentCorrelationId.toString(),
    });

    console.log("Data sent to RabbitMQ");

    return responsePromise;
  } catch (error) {
    console.error("Error while sending data to RabbitMQ:", error);
    throw error;
  }
}

export async function closeConnection() {
  if (channel) {
    await channel.close();
  }
  if (connection) {
    await connection.close();
  }
}
