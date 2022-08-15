const { SlashCommandBuilder, SelectMenuBuilder, ActionRowBuilder, SelectMenuOptionBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`menu`)
        .setDescription(`returns a test select menu`),
    async execute(interaction, client) {
         const menu = new SelectMenuBuilder()
            .setCustomId('sub-menu')
            .setMinValues(1)
            .setMaxValues(1)
            .setOptions(new SelectMenuOptionBuilder({
                label: `Test Option #1`,
                value: `https://youtube.com/solowingcypher`,
            }), new SelectMenuOptionBuilder({
                label: `Test Option #2`,
                value: `https://patreon.com/solowingcypher`,
            })
            );

            await interaction.reply({
                components: [new ActionRowBuilder().addComponents(menu)],
            });
    },
};