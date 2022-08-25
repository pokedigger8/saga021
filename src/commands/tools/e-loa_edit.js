const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`e-loa_edit`)
        .setDescription(`Change the Return Date of an Existing E-LOA`)
        .addIntegerOption((day) => day.setName(`day`).setDescription(`What day you will return from E-LOA`).setMinValue(1).setMaxValue(31).setRequired(true))
        .addIntegerOption((month) => month.setName(`month`).setDescription(`What Month you will return from E-LOA`).setMinValue(1).setMaxValue(12).setRequired(true))
        .addIntegerOption((year) => year.setName(`year`).setDescription(`What Year you will return from E-LOA E.G. (2022)`).setMinValue(2022).setMaxValue(2030).setRequired(true)),
    async execute(interaction, client) {
        const { roles } = interaction.member;
        const targetMember = interaction.member;
        const squadLeaderRole = roles.cache.find(seniorLeader => seniorLeader.name === `Senior Leadership`);
        const workOrder = client.channels.cache.get(`1011724724356796437`);
        s1Role = roles.cache.get(`823553424581722132`);
        const timeFrameDay = interaction.options.getInteger(`day`);
        const timeFrameMonth = interaction.options.getInteger(`month`);
        const timeFrameYear = interaction.options.getInteger(`year`);

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

        //Check if person is currently on E-LOA

        if(!roles.cache.has(`1002980858694746173`))
        {
            await interaction.reply({
                content: "ERROR: You are not on an Active E-LOA trooper. \n Please Consider using the /e-loa command to set one up!", ephemeral: true,
            })
        } else {
            workOrder.send(`Target(s): ${s1Role} \n Name: Sága A.I. \n Request Type(s): Edit existing Extended Leave of Absence \n Request Text: ${targetMember} of ${targetMemberUnit} has changed their E-LOA Return date! \n Notes: User is on E-LOA until ${timeFrameDay}/${timeFrameMonth}/${timeFrameYear}`);

            if (!roles.cache.some(reserves => reserves.name === `Reserves`)) {
                targetMemberSquadChannel.send(`Be Advised ${squadLeaderRole}, ${targetMember} has edited their E-LOA.`);
            } else return;


            await interaction.reply({
                content: "PROCESS SUCESSFUL: You're E-LOA Date has been edited, and Section 1 has been Advised", ephemeral: true,
            })
        }
    },
};