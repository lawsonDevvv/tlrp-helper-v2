import { Precondition } from "@sapphire/framework";
import type { CommandInteraction, GuildMember } from "discord.js";

export default abstract class extends Precondition {
  chatInputRun(interaction: CommandInteraction) {
    return (interaction.member as GuildMember).roles.cache.has(
      "897856246596640768"
    )
      ? // if they have the role, let them proceed
        this.ok()
      : // if they dont have the role, throw an error which will be caught by the "commandDenied.ts" file
        this.error({
          message:
            "Insufficient Permissions! You need to be an Interviewer to use this command.",
        });
  }
}

declare module "@sapphire/framework" {
  interface Preconditions {
    InterviewerOnly: never;
  }
}
