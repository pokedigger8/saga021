const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`eloa`)
        .setDescription(`Set yourself on extended leave of absence, or remove yourself from extended leave of absence`)
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

        //This finds out if the person already has the ELOA Tag or Not. If they do not they are given the ELOA Tag, S1 is asked to give them the ELOA Tag, 
        //Warn their squad leader and assign the tag, or if they do already have it, it gets removed and the same but in the opposite happens.
        
        if (!roles.cache.has(`1069673443508891759`)) {
            targetMember.roles.add(`1069673443508891759`);

            workOrder.send(`Target(s): ${s1Role} \n Name: ${targetMember} \n Request Type(s): Start Extended Leave of Absence Assignment \n Request Text: Please Assign ${targetMember} of ${targetMemberUnit.name} to E-LOA \n Notes: User is on E-LOA until ${timeFrameDay}/${timeFrameMonth}/${timeFrameYear}`);

            if (!roles.cache.some(reserves => reserves.name === `MSOR`)) {
                targetMemberSquadChannel.send(`Be Advised ${squadLeaderRole}, ${targetMember} has gone on an Extended Leave of Absence.`);
            } else return;

            await interaction.reply({
                content: `You have been put on Extended Leave of Absence, Good luck trooper!`, ephemeral: true,
            })
        } else {
            await interaction.reply({
                content: `You are already on Extended Leave of Absence!`, ephemeral: true,
            })
        }
    },
};