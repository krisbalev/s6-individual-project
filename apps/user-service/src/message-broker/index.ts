//!USER SERVICE

import amqp from "amqplib";
import { GetUsernamesPerId } from "../repositories";
const QUEUE_NAME = "post-queue";

let channel: amqp.Channel, connection: amqp.Connection;

const URL = process.env.RABBITMQ_URL || "amqp://localhost:5672";

export async function connectQueue() {
  try {
    connection = await amqp.connect(URL);
    channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME);

    channel.consume(QUEUE_NAME, async (data) => {
      const message = data?.content.toString();
      console.log(`Received message: ${message}`);

      const replyData = await GetUsernamesPerId(JSON.parse(message!));

      const response = JSON.stringify(replyData);

      channel.sendToQueue(data?.properties.replyTo, Buffer.from(response), {
        correlationId: data?.properties.correlationId,
      });

      channel.ack(data!);
    });

    console.log("Connected to RabbitMQ");
    return true;
  } catch (error) {
    console.error("RabbitMQ connection error:", error);
    return false;
  }
}

async function retryConnection(retryInterval: number) {
  let isConnected = await connectQueue();

  while(!isConnected) {
    console.log(`Retrying connection in ${retryInterval / 1000} seconds`);
    await new Promise(resolve => setTimeout(resolve, retryInterval));
    isConnected = await connectQueue();
  }
}

export async function startListening(retryInterval = 5000) {
  try {
    await retryConnection(retryInterval);
  } catch (error) {
    console.error("Error while starting to listen:", error);
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