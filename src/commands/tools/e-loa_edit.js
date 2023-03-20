const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`eloa_edit`)
        .setDescription(`Change the Return Date of an Existing E-LOA`)
        .addIntegerOption((day) => day.setName(`day`).setDescription(`What day you will return from E-LOA`).setMinValue(1).setMaxValue(31).setRequired(true))
        .addIntegerOption((month) => month.setName(`month`).setDescription(`What Month you will return from E-LOA`).setMinValue(1).setMaxValue(12).setRequired(true))
        .addIntegerOption((year) => year.setName(`year`).setDescription(`What Year you will return from E-LOA E.G. (2022)`).setMinValue(2022).setMaxValue(2030).setRequired(true)),
    async execute(interaction, client) {
        const { roles } = interaction.member;
        const targetMember = interaction.member;
        const squadLeaderRole = interaction.guild.roles.cache.find(seniorLeader => seniorLeader.name === `Senior Leader`);
        const workOrder = client.channels.cache.get(`1064386986896535572`);
        s1Role = interaction.guild.roles.cache.get(`1064368351679369359`);
        const timeFrameDay = interaction.options.getInteger(`day`);
        const timeFrameMonth = interaction.options.getInteger(`month`);
        const timeFrameYear = interaction.options.getInteger(`year`);

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

        //Check if person is currently on E-LOA

        if(!roles.cache.has(`1069673443508891759`))
        {
            await interaction.reply({
                content: "ERROR: You are not on an Active E-LOA Marine. \n Please Consider using the /eloa command to set one up!", ephemeral: true,
            })
        } else {
            workOrder.send(`Target(s): ${s1Role} \n Name: ${targetMember} \n Request Type(s): Leave date Update \n Request Text: ${targetMember} of ${targetMemberUnit.name} has changed their E-LOA Return date! \n Notes: User is on E-LOA until ${timeFrameDay}/${timeFrameMonth}/${timeFrameYear}`);

            if (!roles.cache.some(reserves => reserves.name === `MSOR`)) {
                targetMemberSquadChannel.send(`Be Advised ${squadLeaderRole}, ${targetMember} has edited their E-LOA.`);
            } else return;


            await interaction.reply({
                content: "PROCESS SUCESSFUL: You're E-LOA Date has been edited, and Section 1 has been Advised", ephemeral: true,
            })
        }
    },
};