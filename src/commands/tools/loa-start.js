const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`loa-start`)
        .setDescription(`Start your Standard LOA`),
        async execute(interaction, client) {
        const { roles } = interaction.member;
        const targetMember = interaction.member;
        const squadLeaderRole = interaction.guild.roles.cache.find(seniorLeader => seniorLeader.name === `Senior Leader`);
        const workOrder = client.channels.cache.get(`1064386986896535572`);
        s1Role = interaction.guild.roles.cache.get(`1064368351679369359`);

        //This if statement is used to figure out what squad element the Person is apart of
        if (roles.cache.find(oneSquad => oneSquad.name === `MSOT-1`)) {
            targetMemberUnit = roles.cache.find(oneSquad => oneSquad.name === `MSOT-1`);

            targetMemberSquadChannel = client.channels.cache.get(`1064389998570373140`);

        } else if (roles.cache.find(twoSquad => twoSquad.name === `MSOT-2`)) {
            targetMemberUnit = roles.cache.find(twoSquad => twoSquad.name === `MSOT-2`);

            targetMemberSquadChannel = client.channels.cache.get(`1064390085631545484`);

        } else if (roles.cache.find(threeSquad => threeSquad.name === `MSOT-3`)) {
            targetMemberUnit = roles.cache.find(threeSquad => threeSquad.name === `MSOT-3`);

            targetMemberSquadChannel = client.channels.cache.get(`1064390117093023776`);

        } else if (roles.cache.find(fourSquad => fourSquad.name === `MSOT-4`)) {
            targetMemberUnit = roles.cache.find(fourSquad => fourSquad.name === `MSOT-4`);

            targetMemberSquadChannel = client.channels.cache.get(`1087263296157130792`);

        } else if (roles.cache.find(mag => mag.name === `MAG-14`)) {
            targetMemberUnit = roles.cache.find(vulture => mag.name === `MAG-14`);

            targetMemberSquadChannel = client.channels.cache.get(`1064390154711748638`);

        }  else if (roles.cache.find(raidcom => raidcom.name === `RAIDCOM`)) {
            targetMemberUnit = roles.cache.find(raidcom => raidcom.name === `RAIDCOM`);

            targetMemberSquadChannel = client.channels.cache.get(`1064387033860157440`);

        } else if (roles.cache.find(commandteam => commandteam.name === `MSOCT`)) {
            targetMemberUnit = roles.cache.find(commandteam => commandteam.name === `MSOCT`);

            targetMemberSquadChannel = client.channels.cache.get(`1064390222021931138`);

        } else {
            targetMemberUnit = roles.cache.find(reserves => reserves.name === `MSOR`);
        }

            workOrder.send(`Target(s): ${s1Role} \n Name: ${targetMember} \n Request Type(s): Start Leave of Absence \n Request Text: ${targetMember} of ${targetMemberUnit.name} is going on a Leave of Absence \n Notes: Reminder, A leave of Absence only applies for 1 Week (1 Operation)`);

            if (!roles.cache.some(reserves => reserves.name === `MSOR`)) {
                targetMemberSquadChannel.send(`Be Advised ${squadLeaderRole}, ${targetMember} has gone on an Leave of Absence for this week`);
            } else return;

            await interaction.reply({
                content: "PROCESS SUCESSFUL: You're Leave of Absence has been processed, and Section 1 has been Advised", ephemeral: true,
            })
        },
};