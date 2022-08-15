const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`e-loa`)
        .setDescription(`Set yourself on extended leave of absence, or remove yourself from extended leave of absence`),
    async execute(interaction, client) {
        const { roles } = interaction.member;
        const role = await interaction.guild.roles;
        const targetMember = interaction.member;

        if (!roles.cache.has(`1002980858694746173`)) {
            targetMember.roles.add(`1002980858694746173`);

            client.channels.cache.get(`823581243571437599`).send(`BE ADVISED S-1, ${targetMember} has gone on an Extended Leave of Absence, please assign them as such on the ORBAT`);


            await interaction.reply({
                content: `You have been put on Extended Leave of Absence, Good luck trooper!`, ephemeral: true,
            })
        } else {
            targetMember.roles.remove(`1002980858694746173`);

            client.channels.cache.get(`823581243571437599`).send(`BE ADVISED S-1, ${targetMember} has returned from Extended Leave of Absence, please assign them as such on the ORBAT`);
            await interaction.reply({
                content: `You have been removed from Extended Leave of Absence, Welcome back trooper!`, ephemeral: true,
            })
        }
    },
};