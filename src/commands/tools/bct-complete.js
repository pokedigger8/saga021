const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`bct-complete`)
        .setDescription(`request S-3 For a MOS Training and Tag Assignment`)
        .addUserOption((target) => target.setName(`user`).setDescription(`Choose user who has completed their Basic Combat Training`).setRequired(true)),
    async execute(interaction, client) {
        const s1Role = interaction.guild.roles.cache.get(`1064368351679369359`);
        const s3Role = interaction.guild.roles.cache.get(`1064368420981833729`);
        const recruitRole = interaction.guild.roles.cache.get(`1064365917959618604`);
        const targetMember = interaction.options.getUser('user');
        const myTarget = interaction.guild.members.cache.get(targetMember.id);
        const workOrder = client.channels.cache.get(`1064386986896535572`);
        const { roles } = interaction.member;

        if(!roles.cache.has(s3Role.id)) {
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

                //Add E-1 Role
                myTarget.roles.add(`1064366120439644230`);

                //Message Work Order
                workOrder.send(`Target(s): ${s1Role} \n Name: ${targetMember} \n Request Type(s): Basic Training Completion \n Request Text: Trainee Completed Basic Combat Training, Promoted to E-1 \n Notes: N/A`);

                await interaction.reply({
                    content: "User has been Promoted past Recruit!", ephemeral: true,
                })
            }
        }
    },
};