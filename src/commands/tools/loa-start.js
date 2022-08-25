const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`loa-start`)
        .setDescription(`Start your Standard LOA`),
        async execute(interaction, client) {
            const { roles } = interaction.member;
            const targetMember = interaction.member;
            const squadLeaderRole = roles.cache.find(seniorLeader => seniorLeader.name === `Senior Leadership`);
            const workOrder = client.channels.cache.get(`1011724724356796437`);
            s1Role = interaction.guild.roles.cache.get(`823553424581722132`);
            
            //This if statement is used to figure out what squad element the Person is apart of
            if (roles.cache.find(oneSquad => oneSquad.name === `1st Squad`)) {
                targetMemberUnit = roles.cache.find(oneSquad => oneSquad.name === `1st Squad`);

                targetMemberSquadChannel = client.channels.cache.get(`817608343337697311`);

            } else if (roles.cache.find(twoSquad => twoSquad.name === `2nd Squad`)) {
                targetMemberUnit = roles.cache.find(twoSquad => twoSquad.name === `2nd Squad`);

                targetMemberSquadChannel = client.channels.cache.get(`817608391945486367`);

            } else if (roles.cache.find(threeSquad => threeSquad.name === `3rd Squad`)) {
                targetMemberUnit = roles.cache.find(threeSquad => threeSquad.name === `3rd Squad`);

                targetMemberSquadChannel = client.channels.cache.get(`817608628630585384`);

            } else if (roles.cache.find(combatEngineers => combatEngineers.name === `Combat Engineers`)) {
                targetMemberUnit = roles.cache.find(combatEngineers => combatEngineers.name === `Combat Engineers`);

                targetMemberSquadChannel = client.channels.cache.get(`819136607302713345`);

            } else if (roles.cache.find(vulture => vulture.name === `Vulture`)) {
                targetMemberUnit = roles.cache.find(vulture => vulture.name === `Vulture`);

                targetMemberSquadChannel = client.channels.cache.get(`1003170144413044746`);

            } else if (roles.cache.find(forecon => forecon.name === `FORECON`)) {
                targetMemberUnit = roles.cache.find(forecon => forecon.name === `FORECON`);

                targetMemberSquadChannel = client.channels.cache.get(`824748418656239626`);

            } else if (roles.cache.find(strigon => strigon.name === `STRIGON`)) {
                targetMemberUnit = roles.cache.find(strigon => strigon.name === `STRIGON`);

                targetMemberSquadChannel = client.channels.cache.get(`850328778899324969`);

            } else if (roles.cache.find(warden => warden.name === `WARDEN`)) {
                targetMemberUnit = roles.cache.find(wardenUnit => wardenUnit.name === `WARDEN`);

                targetMemberSquadChannel = client.channels.cache.get(`1008812019941642271`);

            } else {
                targetMemberUnit = roles.cache.find(reserves => reserves.name === `Reserves`);
            }

            workOrder.send(`Target(s): ${s1Role} \n Name: Sága A.I. \n Request Type(s): Start Leave of Absence \n Request Text: ${targetMember} of ${targetMemberUnit} is going on a Leave of Absence \n Notes: Reminder, A leave of Absence only applies for 1 Week (1 Operation)`);

            if (!roles.cache.some(reserves => reserves.name === `Reserves`)) {
                targetMemberSquadChannel.send(`Be Advised ${squadLeaderRole}, ${targetMember} has gone on an Leave of Absence for this week`);
            } else return;

            await interaction.reply({
                content: "PROCESS SUCESSFUL: You're Leave of Absence has been processed, and Section 1 has been Advised", ephemeral: true,
            })
        },
};