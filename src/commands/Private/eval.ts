
import { ApplyOptions } from "@sapphire/decorators";
import {
  ApplicationCommandRegistry,
  Command,
  CommandOptions,
  RegisterBehavior,
} from "@sapphire/framework";
import { CommandInteraction, MessageEmbed } from "discord.js";

@ApplyOptions<CommandOptions>({
  preconditions: ["OwnerOnly"],
})
export abstract class EvalCommand extends Command {
  public override registerApplicationCommands(registry: ApplicationCommandRegistry) {
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName("eval")
          .setDescription("Evaluate arbitrary JavaScript code.")
          .addStringOption((option) =>
            option
              .setName("code")
              .setDescription("Code to evaluate.")
              .setRequired(true)
          )
          .addBooleanOption((option) =>
            option
              .setName("async")
              .setDescription("Whether to run the code asynchronously.")
              .setRequired(true)
          ),
      {
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
      }
    );
  }

  public override chatInputRun(interaction: CommandInteraction) {
    const code = interaction.options.getString("code") as string;
    const async = interaction.options.getBoolean("async");
    if (async) {
      try {
        const evaled = eval(`async () => {${code}}`);

        const embed = new MessageEmbed()
          .setAuthor({
            name: interaction.user.tag,
            iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
          })
          .addField("Code to be Evaluated", `\`\`\`ts\n${code}\`\`\``)
          .addField("Result", `${evaled}`)
          .addField("Result Type", `${typeof evaled}`)
          .setFooter({ text: `Async: ${async}` });

        interaction.reply({ embeds: [embed] });
      } catch (err) {
        const embed = new MessageEmbed()
          .setAuthor({
            name: interaction.user.tag,
            iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
          })
          .addField("Code to be Evaluated", `\`\`\`ts\n${code}\`\`\``)
          .addField("Error", `${err}`)
          .setColor("RED");

        interaction.reply({ embeds: [embed] });
      }
    } else {
      try {
        const evaled = eval(code);

        const embed = new MessageEmbed()
          .setAuthor({
            name: interaction.user.tag,
            iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
          })
          .addField("Code to be Evaluated", `\`\`\`ts\n${code}\`\`\``)
          .addField("Result", `${evaled}`)
          .addField("Result Type", `${typeof evaled}`)
          .setFooter({ text: `Async: ${async}` });

        interaction.reply({ embeds: [embed] });
      } catch (err) {
        const embed = new MessageEmbed()
          .setAuthor({
            name: interaction.user.tag,
            iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
          })
          .addField("Code to be Evaluated", `\`\`\`ts\n${code}\`\`\``)
          .addField("Error", `${err}`)
          .setColor("RED");

        interaction.reply({ embeds: [embed] });
      }
    }
  }
}
