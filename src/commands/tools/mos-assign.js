const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`mos-assign`)
        .setDescription(`Assign Someone an MOS After they have been trained in said MOS`)
        .addUserOption((user) => user.setName(`user`).setDescription(`Select the user you would like to give them a MOS`).setRequired(true))
        .addStringOption((role) => role.setName(`mos`).setDescription(`What MOS you would like to assign to the user`).setAutocomplete(true).setRequired(true)),
    async autocomplete (interaction, client) {
        const focusedValue = interaction.options.getFocused();
        const choices = [
          "Rifleman",
          "Grenadier",
          "S.A.W.",
          "Anti-Tank",
          "Breacher",
          "Marksman",
          "S.A.R.C.",
          "R.T.O.",
          "Aerial Operator",
        ];
        const filtered = choices.filter((choice) =>
          choice.startsWith(focusedValue)
        );
        await interaction.respond(
          filtered.map((choice) => ({ name: choice, value: choice }))
        );
    },
    async execute(interaction, client) {
        s1Role = interaction.guild.roles.cache.get(`1064368351679369359`);
        s3Role = interaction.guild.roles.cache.get(`1064368420981833729`);
        const targetMember = interaction.options.getUser('user');
        const mosInput = interaction.options.getString(`mos`);
        const myTarget = interaction.guild.members.cache.get(targetMember.id);
        const workOrder = client.channels.cache.get(`1064386986896535572`);
        const { roles } = interaction.member;

        if(!roles.cache.has(s3Role.id)) {

            await interaction.reply({
                content: "ERROR: You are not authorised to use this Command, This is for Section 3 ONLY!", ephemeral: true,
            })
        } else {
            //Assign the Target MOS
            const targetMOS = interaction.guild.roles.cache.find(role => role.name === mosInput);
            myTarget.roles.add(targetMOS.id);

            workOrder.send(`Target(s): ${s1Role} \n Name: ${targetMember} \n Request Type(s): M.O.S. Training Completed \n Request Text: ${targetMember} has training for the ${mosInput.name}. please assign their added MOS on the ORBAT \n Notes: N/A`);

            await interaction.reply({
                content: "SUCCESS: You have been assigned the MOS Role and the ORBAT Will be updated by Section 1!", ephemeral: true,
            })
        }
    },
};