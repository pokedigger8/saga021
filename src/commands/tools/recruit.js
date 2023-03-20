const {
  SlashCommandBuilder,
  MembershipScreeningFieldType,
  messageLink,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`recruit`)
    .setDescription(
      `Section 2 Utility command to recruit new individuals into the 21st Shock Trooper Battalion`
    )
    .addUserOption((target) =>
      target
        .setName("user")
        .setDescription("Select Server Member in Channel")
        .setRequired(true)
    )
    .addStringOption((role) =>
      role
        .setName(`mos`)
        .setDescription(`define what MOS this person wants to become`)
        .setAutocomplete(true)
        .setRequired(true)
    ),
  async autocomplete(interaction, client) {
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
    const { roles } = interaction.member;
    const role = await interaction.guild.roles
      .fetch(`1064363798007386234`)
      .catch(console.error);
    
    const target = interaction.options.getUser(`user`);
    const myTarget = interaction.guild.members.cache.get(target.id);
    if (roles.cache.has(`1064368417546706955`)) {

      if (!myTarget.roles.cache.some(tw => tw.name === `Unit Member`)) {
        //Remove Civvie Tag, Add 21st, Rifleman, Recruit and Reserves Tag, and first platoon Tags
        myTarget.roles.remove(`1064364346781741076`);
        myTarget.roles.add(`1064363798007386234`);
        myTarget.roles.add(`1064366996701065257`);
        myTarget.roles.add(`1064365917959618604`);
        myTarget.roles.add(`1064369402579001355`);

        //Roles we need to Mention
        s1Role = interaction.guild.roles.cache.get(`1064368351679369359`);
        s3Role = interaction.guild.roles.cache.get(`1064368420981833729`);

        //Channels to send messages
        const unitinfo = client.channels.cache.get(`1064388216842633327`);
        const s3recruits = client.channels.cache.get(`1064419017403662346`);
        const workChannel = client.channels.cache.get(`1064386986896535572`);
        const regulations = client.channels.cache.get(`1064380304896311326`);
        const unitHandbooks = client.channels.cache.get(`1064413208699482174`);
        const unitFAQ = client.channels.cache.get(`1069955157309267979`);
        const thoughtsAndConcerns = client.channels.cache.get(`1065982079625613363`);

        //Get the Desired MOS
        const occupation = interaction.options.getString(`mos`);

        //Send the Standard Welcome Message
        client.channels.cache.get(`1064384325912645726`).send(`Welcome ${target} to the 2nd Marine Raider Battalion! \n Please change your name to Rct. [Name Initial] "[OPTIONAL NICKNAME]" [Last Name] as per our name ${regulations}. \n When possible, please get in contact with Training and Doctrine Staff [TRADOC] in ${s3recruits} channel to organise a training. \n Mods and other useful and important information can be found in both ${unitinfo} and ${unitHandbooks}.\n ${workChannel} Will contain work order that will typically concern most aspects of what happens to you in the unit. If you want to go on leave, you can fill a leave of absence request there. The pinned messages will typically help you fill one out either manually or with help of myself, The Silas AI. \n ${unitFAQ} also contains useful info if needed. \n Feel free to ask or recommend anything especially inside of ${thoughtsAndConcerns}!`);

        //Check what MOS the target wants to be, Assign Extra MOS Role and send slightly different advisory role.

        if (occupation == `Rifleman`) {
          workChannel.send(`Target(s): ${s1Role} , ${s3Role} \nName: Sága A.I. \nRequest Type(s): ORBAT Assignment, S-3 Trainee Arrival Reminder \nRequest Text: Please Assign ${target} to ORBAT and Organise a Training \nNote: Trainee joined as a Rifleman`);
        } else if (occupation == `Grenadier`) {
            //Set Grenadier Role
            myTarget.roles.add(`1064367026241544243`);

            workChannel.send(`Target(s): ${s1Role} , ${s3Role} \nName: ${target} \nRequest Type(s): ORBAT Assignment, S-3 Trainee Arrival Reminder \nRequest Text: Please Assign ${target} to ORBAT and Organise a Training \nNote: Trainee joined as a Grenadier`);
        } else if (occupation == `S.A.W.`) {
            myTarget.roles.add(`1064367028883963935`);

            workChannel.send(`Target(s): ${s1Role} , ${s3Role} \nName: ${target} \nRequest Type(s): ORBAT Assignment, S-3 Trainee Arrival Reminder \nRequest Text: Please Assign ${target} to ORBAT and Organise a Training \nNote: Trainee joined as a S.A.W.`);
        } else if (occupation == `Anti-Tank`) {
            myTarget.roles.add(`1064367029718634517`);

            workChannel.send(`Target(s): ${s1Role} , ${s3Role} \nName: ${target} \nRequest Type(s): ORBAT Assignment, S-3 Trainee Arrival Reminder \nRequest Text: Please Assign ${target} to ORBAT and Organise a Training \nNote: Trainee joined as an Anti-Tank`);
        } else if (occupation == `Breacher`) {
            myTarget.roles.add(`1064367858123030552`);

            workChannel.send(`Target(s): ${s1Role} , ${s3Role} \nName: ${target} \nRequest Type(s): ORBAT Assignment, S-3 Trainee Arrival Reminder \nRequest Text: Please Assign ${target} to ORBAT and Organise a Training \nNote: Trainee joined as a Breacher`);
        } else if (occupation == `Marksman`) {
            myTarget.roles.add(`1064367400876777542`);

            workChannel.send(`Target(s): ${s1Role} , ${s3Role} \nName: ${target} \nRequest Type(s): ORBAT Assignment, S-3 Trainee Arrival Reminder \nRequest Text: Please Assign ${target} to ORBAT and Organise a Training \nNote: Trainee joined as a Marksman`);
        } else if (occupation == `S.A.R.C.`) {
            myTarget.roles.add(`1064367872463343626`);

            workChannel.send(`Target(s): ${s1Role} , ${s3Role} \nName: ${target} \nRequest Type(s): ORBAT Assignment, S-3 Trainee Arrival Reminder \nRequest Text: Please Assign ${target} to ORBAT and Organise a Training \nNote: Trainee joined as a S.A.R.C.`);
        } else if (occupation == `R.T.O.`) {
            myTarget.roles.add(`1064367869640581240`);

            workChannel.send(`Target(s): ${s1Role} , ${s3Role} \nName: ${target} \nRequest Type(s): ORBAT Assignment, S-3 Trainee Arrival Reminder \nRequest Text: Please Assign ${target} to ORBAT and Organise a Training \nNote: Trainee joined as an R.T.O.`);
        } else if (occupation == `Aerial Operator`) {
          myTarget.roles.add(`1064367510079688774`);

          workChannel.send(`Target(s): ${s1Role} , ${s3Role} \nName: ${target} \nRequest Type(s): ORBAT Assignment, S-3 Trainee Arrival Reminder \nRequest Text: Please Assign ${target} to ORBAT and Organise a Training \nNote: Trainee joined as an Aerial Operator`);
        } else {
            console.log(error);
        }
        await interaction.reply({
            content: `User Has been recruited Sucesfully`, ephemeral: true,
        })

      } else {
        await interaction.reply({
          content: `This person is already a 2nd MRB Member`, ephemeral: true,
        });
      }
    } else {
      await interaction.reply({
        content: `Only Section 2 is authorised for use of this command!`, ephemeral: true,
      });
    }
  },
};
