import { ApplyOptions } from "@sapphire/decorators";
import {
  Command,
  ApplicationCommandRegistry,
  RegisterBehavior,
} from "@sapphire/framework";
import type { CommandInteraction, Guild, GuildMember } from "discord.js";

@ApplyOptions<Command.Options>({
  description: "Accept an interviewee.",
  preconditions: ["InterviewerOnly"],
})
export default class AcceptCommand extends Command {
  public override registerApplicationCommands(registry: ApplicationCommandRegistry) {
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName("accept")
          .setDescription(this.description)
          .addUserOption((o) =>
            o
              .setName("user")
              .setDescription("The user to accept.")
              .setRequired(true)
          ),
      {
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
        guildIds: ["897557912568889426"],
      }
    );
  }

  public override async chatInputRun(interaction: CommandInteraction): Promise<void> {
    const user = interaction.guild?.members.cache.get(
      interaction.options.getUser("user", true).id
    ) as GuildMember;
    const accepted = "897856261364793425";
    const awaitingInterview = "897856265634582549";
    const trainingServer = this.container.client.guilds.cache.get(
      "900053257722937396"
    ) as Guild;

    if (user?.roles.cache.has(accepted)) {
      await interaction.reply("User already accepted.");
      return;
    }

    await user?.roles.add(accepted);
    await user?.roles.remove(awaitingInterview);

    const invite = await trainingServer.invites.create("901514978903875634", {
      maxAge: 0,
      maxUses: 1,
      unique: true,
      reason: `${user?.user.tag} accepted by ${interaction.user.tag}`,
    });

    await user.send(
      `https://discord.gg/${invite.code}\n ` +
        "This invite lasts for 30 minutes and is only usable once. If it expires or you experience issues, you can request a new one from your original interviewer."
    );

    await interaction.reply(":thumbsup: Accepted!");
  }
}
