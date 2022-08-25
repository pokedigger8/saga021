const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`rankup-enlisted`)
        .setDescription(`Rankup enlisted personnel`)
        .addUserOption((user) => user.setName(`user`).setDescription(`Select the user who will be ranked up`).setRequired(true)),
    async execute(interaction, client) {

        const enlistedRanks = [`OR-1`,`OR-2`,`OR-3`,`OR-4`,`OR-5`,`OR-6`,`OR-7`,`OR-8`,`OR-9`];
        const { roles } = interaction.member;
        const workOrder = client.channels.cache.get(`1011724724356796437`);
        const targetMember = interaction.options.getUser('user');
        const myTarget = interaction.guild.members.cache.get(targetMember.id);
        s1Role = interaction.guild.roles.cache.get(`823553424581722132`);
        userRank = ``;
        userRankPosition = 0;

        if(!roles.cache.has(s1Role.id)){

            await interaction.reply({
                content: "ERROR: You are not authorised to use this command! This is for Section 1 ONLY!", ephemeral: true,
            })
        } else {
            for (let i = 0; i < enlistedRanks.length; i++) {

                if(!myTarget.roles.cache.some(role => role.name === enlistedRanks[i])) {
                    console.log(`Continue`);
                } else {
                    userRank = interaction.guild.roles.cache.find(role => role.name === enlistedRanks[i])
                    userRankPosition = i;
                    break;
                }
            }

            if(userRank.name == enlistedRanks[8]) {

                await interaction.reply({
                    content: "ERROR: User is at max Enlisted Rank!", ephemeral: true,
                })

            } else {
                const nextRankPosition = userRankPosition + 1;

                const nextRank = interaction.guild.roles.cache.find(role => role.name === enlistedRanks[nextRankPosition]);

                myTarget.roles.remove(userRank.id);

                myTarget.roles.add(nextRank.id);

                //workOrder.send(`Target(s): ${s1Role} \n Name: Sága A.I. \n Request Type(s): Enlisted Rankup \n Request Text: ${targetMember} has been promoted from ${userRank} to ${nextRank} \n Notes: Please Check the ORBAT Rank Structures for your next rank acronym ${targetMember}! If you are Standard OR-4. If you are Staff or ledaership, Please select Corporal, if not, select Specailist rank!`);

                await interaction.reply({
                    content: "SUCCESSFUL: User has been Ranked up!", ephemeral: true,
                })
            }
        }
    },
};