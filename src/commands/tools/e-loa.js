const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`e-loa`)
        .setDescription(`Set yourself on extended leave of absence, or remove yourself from extended leave of absence`),
    async execute(interaction, client) {
        const { roles } = interaction.member;
        const targetMember = interaction.member;
        const squadLeaderRole = roles.cache.find(seniorLeader => seniorLeader.name === `Senior Leadership`);

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

        console.log(`TargetMemberUnit Value: ${targetMemberUnit}`);

        //This finds out if the person already has the ELOA Tag or Not. If they do not they are given the ELOA Tag, S1 is asked to give them the ELOA Tag, 
        //Warn their squad leader and assign the tag, or if they do already have it, it gets removed and the same but in the opposite happens.
        
        if (!roles.cache.has(`1002980858694746173`)) {
            targetMember.roles.add(`1002980858694746173`);

            client.channels.cache.get(`823581243571437599`).send(`BE ADVISED S-1, ${targetMember} of ${targetMemberUnit} has gone on an Extended Leave of Absence, please assign them as such on the ORBAT`);

            if (!roles.cache.some(reserves => reserves.name === `Reserves`)) {
                targetMemberSquadChannel.send(`Be Advised ${squadLeaderRole}, ${targetMember} has gone on an Extended Leave of Absence.`);
            } else return;

            await interaction.reply({
                content: `You have been put on Extended Leave of Absence, Good luck trooper!`, ephemeral: true,
            })
        } else {
            targetMember.roles.remove(`1002980858694746173`);

            client.channels.cache.get(`823581243571437599`).send(`BE ADVISED S-1, ${targetMember} of ${targetMemberUnit} has returned from Extended Leave of Absence, please assign them as such on the ORBAT`);

            if (!roles.cache.some(reserves => reserves.name === `Reserves`)) {
                targetMemberSquadChannel.send(`Be Advised ${squadLeaderRole}, ${targetMember} has returned from an Extended Leave of Absence.`);
            } else return;

            await interaction.reply({
                content: `You have been removed from Extended Leave of Absence, Welcome back trooper!`, ephemeral: true,
            })
        }
    },
};