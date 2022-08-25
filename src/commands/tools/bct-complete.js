const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`bct-complete`)
        .setDescription(`request S-3 For a MOS Training and Tag Assignment`)
        .addUserOption((target) => target.setName(`user`).setDescription(`Choose user who has completed their Basic Combat Training`).setRequired(true)),
    async execute(interaction, client) {
        s1Role = interaction.guild.roles.cache.get(`823553424581722132`);
        s3Role = interaction.guild.roles.cache.get(`823553449227714571`);
        const recruitRole = interaction.guild.roles.cache.get(`809189422675394590`);
        const targetMember = interaction.options.getUser('user');
        const myTarget = interaction.guild.members.cache.get(targetMember.id);
        const workOrder = client.channels.cache.get(`1011724724356796437`);
        const { roles } = interaction.member;

        if(!roles.cache.has(`823553449227714571`)) {
            await interaction.reply({
                content: "ERROR: You are not authorised to use this Command, This is for Section 3 ONLY!", ephemeral: true,
            })
        } else {

            if(!myTarget.roles.cache.has(recruitRole.id)) {

                await interaction.reply({
                    content: "ERROR: User is not a Recruit!", ephemeral: true,
                })
            } else {
                //Remove Recruit role
                myTarget.roles.remove(recruitRole);

                //Add OR-1 Role
                myTarget.roles.add(`809148027293401199`);

                //Message Work Order
                workOrder.send(`Target(s): ${s1Role} \n Name: Sága A.I. \n Request Type(s): Basic Combat Training Completed \n Request Text: ${targetMember} has finished Basic Combat Training, And is now OR-1 \n Notes: N/A`);

                await interaction.reply({
                    content: "User has been Promoted past Recruit!", ephemeral: true,
                })
            }
        }
    },
};