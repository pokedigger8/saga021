const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`mos-training-complete`)
        .setDescription(`Remove someones MOS Need Training Tag!`)
        .addUserOption((user) => user.setName(`user`).setDescription(`Select the User who has finished their MOS Training, which will un-assign the training role`).setRequired(true)),
    async execute(interaction, client) {
        const { roles } = interaction.member;
        const workOrder = client.channels.cache.get(`1011724724356796437`);
        const targetMember = interaction.options.getUser('user');
        const myTarget = interaction.guild.members.cache.get(targetMember.id);
        trainingTag = interaction.guild.roles.cache.find(role => role.name === `Need Training`)

        if(!roles.cache.some(role => role.name === `S-3`)) {
            await interaction.reply({
                content: "ERROR: You are not authorised to use this Command, This is for Section 3 ONLY!", ephemeral: true,
            })
        } else {
            if(!myTarget.roles.cache.has(trainingTag.id)) {
                await interaction.reply({
                    content: "ERROR: The user is not currently in Any MOS Training as of this time", ephemeral: true,
                })
            } else {
                myTarget.roles.remove(trainingTag);

                await interaction.reply({
                    content: "SUCCESS: The user has had their training tag removed", ephemeral: true,
                })
            }
        }
    },
};