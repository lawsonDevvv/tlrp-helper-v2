import { Manager } from "discord-hybrid-sharding";
import "./lib/setup/index";

const client = new Manager("dist/Bot.js", {
  totalShards: "auto",
  totalClusters: 1,
  mode: "process",
  token: process.env.TOKEN,
});

client.on("clusterCreate", (cluster) =>
  console.log(`Cluster ${cluster.id} Has Been Launched, Now Starting Bot`)
);
client.spawn(undefined);
