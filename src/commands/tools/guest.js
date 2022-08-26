const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`guest`)
        .setDescription(`Assign someone as a unit guest`)
        .addUserOption((user) => user.setName(`user`).setDescription(`Choose the user who will be assigned guest roles`).setRequired(true)),
    async execute(interaction, client) {
        const { roles } = interaction.member;
        const target = interaction.options.getUser(`user`);
        const myTarget = interaction.guild.members.cache.get(target.id);
        s2Role = interaction.guild.roles.cache.get(`823553424913596466`);
        civillian = interaction.guild.roles.cache.get(`809148027255783495`);
        guestRole = interaction.guild.roles.cache.get(`809148027255783494`);

        if (!roles.cache.has(s2Role.id)) {

            await interaction.reply({
                content: "ERROR: You are not authorised to use this command! This is for Section 2 ONLY!", ephemeral: true,
            })
        } else {

            if(!myTarget.roles.cache.has(civillian.id)) {

                await interaction.reply({
                    content: "ERROR: Target user is not a Civillian, and as such cannot be assigned as a guest!", ephemeral: true,
                })

            } else {

                myTarget.roles.remove(civillian.id);

                myTarget.roles.add(guestRole);

                await interaction.reply({
                    content: "SUCCESSFUL: User has been assigned as a Guest!", ephemeral: true,
                })
            }
        }
    },
};