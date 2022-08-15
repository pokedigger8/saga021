const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("embed")
        .setDescription("returns an embed message"),
    async execute(interaction, client) {
        const embed = new EmbedBuilder ()
            .setTitle(`this is an embed`)
            .setDescription(`this is a test description for embedded messages`)
            .setColor(0x990000)
            .setImage(client.user.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp(Date.now())
            .addFields([{
                name: `embed test`,
                value: `test 1`,
                inline: true
            },
            {
                name: `embed test 2`,
                value: `test 2`,
                inline: true
            }
            ])

            await interaction.reply({
                embeds: [embed]
            });
    },
};