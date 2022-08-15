const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`autocomplete`)
    .setDescription(`autocomplete command type test`)
    .addStringOption((option) =>
      option
        .setName(`colour`)
        .setDescription(`A colour based on autocomplete.`)
        .setAutocomplete(true)
        .setRequired(true)
    )
    .addUserOption((target) =>
      target
        .setName("user")
        .setDescription("Select Server Member in Channel")
        .setRequired(true)
    ),
  async autocomplete(interaction, client) {
    const focusedValue = interaction.options.getFocused();
    const choices = ["Red", "Blue", "Green"];
    const filtered = choices.filter((choice) =>
      choice.startsWith(focusedValue)
    );
    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    );
  },
  async execute(interaction, client) {
    const option = interaction.options.getString(`colour`);
    const playerTarget = interaction.options.getUser(`user`);
    await interaction.reply({ content: `i think ${playerTarget} likes "${option}"` });
  },
};