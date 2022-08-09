import type { Message } from "discord.js";
import { LawsonClient } from "./lib/LawsonClient";
import { container } from "@sapphire/framework";
export const snipes = new Map<string, Message>();
export const editsnipes = new Map<string, Message[]>();

const client = new LawsonClient();

async function main() {
  try {
    client.logger.info("Attempting to login...");
    await client.login(process.env.TOKEN ?? "0");
    client.logger.info("Successfully Logged In ✅");

    container.logger.info("Up.")
  } catch (error) {
    client.logger.fatal(
      "I had an issue trying to initialize! The issue should be somewhere below this line."
    );
    console.error(error);
    container.logger.error("Down.")
  }
}

main();
