//!USER SERVICE

import amqp from "amqplib";
const QUEUE_NAME = "test-queue";

let channel: amqp.Channel, connection: amqp.Connection;

const URL = process.env.RABBITMQ_URL || "amqp://localhost:5672";

export async function connectQueue() {
  try {
    connection = await amqp.connect(URL);
    channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME);

    channel.consume(QUEUE_NAME, (data) => {
      const message = data?.content.toString();
      console.log(`Received message: ${message}`);

      const response = `Response to ${message}`;

      channel.sendToQueue(data?.properties.replyTo, Buffer.from(response), {
        correlationId: data?.properties.correlationId,
      });

      channel.ack(data!);
    });

    console.log("Connected to RabbitMQ");
  } catch (error) {
    console.error("RabbitMQ connection error:", error);
  }
}

export async function startListening() {
  try {
    await connectQueue();
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
