import amqp from "amqplib";

const QUEUE_NAME = "user-queue";
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

    await channel.assertQueue(QUEUE_NAME);

    console.log("Connected to RabbitMQ");
    return true;
  } catch (error) {
    handleConnectionError(error);
    return false;
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

    await channel.assertQueue(QUEUE_NAME);
    await channel.sendToQueue(QUEUE_NAME, Buffer.from(message), {
      correlationId: currentCorrelationId.toString(),
    });

    console.log("Data sent to RabbitMQ");
  } catch (error) {
    console.error("Error while sending data to RabbitMQ:", error);
    throw error;
  }
}

async function retryConnection(retryInterval: number) {
  let isConnected = await connectQueue();

  while (!isConnected) {
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
