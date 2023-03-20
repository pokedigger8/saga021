const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`mos-request`)
        .setDescription(`Request S-3 For a MOS Training and Tag Assignment`)
        .addStringOption((role) => role.setName(`mos`).setDescription(`What MOS you would like to recieve training in`).setAutocomplete(true).setRequired(true)),
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
        const militarySpeciality = interaction.options.getString(`mos`);
        const { roles } = interaction.member;
        const workOrder = client.channels.cache.get(`1064386986896535572`);
        s3Role = interaction.guild.roles.cache.get(`1064368420981833729`);
        const targetMember = interaction.member;
        const mosChannel = client.channels.cache.get(`1064419044935082044`);

        //Check if person already has the MOS
        if (!roles.cache.some(role => role.name === militarySpeciality))
        {
            roles.add(`1081302454538338414`);
            workOrder.send(`Target(s): ${s3Role} \n Name: ${targetMember} \n Request Type(s): M.O.S. Training Request \n Request Text: Please Train ${targetMember} on ${militarySpeciality.name}  \n Notes: Reminder that MOS Trainings are organised in ${mosChannel}`);

            await interaction.reply({
                content: "You're MOS Request has been sucesfully recieved. Standby to be contacted by Section 3!", ephemeral: true,
            })
        } else {

            await interaction.reply({
                content: "Sorry Trooper, you already have this role!", ephemeral: true,
            })
        }
    },
};