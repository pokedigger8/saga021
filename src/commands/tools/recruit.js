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
      "Operator",
      "S.A.W.",
      "Anti-Tank",
      "Marksman",
      "S.A.R.C."
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
        myTarget.roles.remove(`1064364346781741076`); //Remove Civvie Role
        myTarget.roles.add(`1064363798007386234`); //Add Unit Member
        myTarget.roles.add(`1064365917959618604`); //Add Candidate Role
        myTarget.roles.add(`1064369402579001355`); //Add Reserve Role

        //Roles we need to Mention
        s1Role = interaction.guild.roles.cache.get(`1064368351679369359`); //S3 Role
        s3Role = interaction.guild.roles.cache.get(`1064368420981833729`); // S1 Role

        //Channels to send messages
        const unitinfo = client.channels.cache.get(`1064388216842633327`); //Unit-Info Channel
        const s3recruits = client.channels.cache.get(`1064419017403662346`); //S3 Recruitment Channel
        const workChannel = client.channels.cache.get(`1064386986896535572`); //Work Orders Channel
        const regulations = client.channels.cache.get(`1064380304896311326`); //Unit Regulations
        const unitHandbooks = client.channels.cache.get(`1064413208699482174`); //Unit Handbooks Channel
        const unitFAQ = client.channels.cache.get(`1069955157309267979`); //FAQ Channel
        const thoughtsAndConcerns = client.channels.cache.get(`1065982079625613363`); //Thoughts and concerns channel

        //Get the Desired MOS
        const occupation = interaction.options.getString(`mos`); //Gets the string of the Chosen MOS from the command.

        //Send the Standard Welcome Message
        client.channels.cache.get(`1064384325912645726`).send(`Welcome ${target} to Special Operations Company - Viper! \n Please change your name to Can. [Name Initial] "[OPTIONAL NICKNAME]" [Last Name] as per our name ${regulations}. \n When possible, please get in contact with Training and Doctrine Staff [TRADOC] in ${s3recruits} channel to organise a training. \n Mods and other useful and important information can be found in both ${unitinfo} and ${unitHandbooks}.\n ${workChannel} Will contain work order that will typically concern most aspects of what happens to you in the unit. If you want to go on leave, you can fill a leave of absence request there. The pinned messages will typically help you fill one out either manually or with help of myself, The Silas AI. \n ${unitFAQ} also contains useful info if needed. \n Feel free to ask or recommend anything especially inside of ${thoughtsAndConcerns}!`);

        //Check what MOS the target wants to be, Assign Extra MOS Role and send slightly different advisory role.

        if (occupation == `Operator`) {
          workChannel.send(`Target(s): ${s1Role} , ${s3Role} \nName: Sága A.I. \nRequest Type(s): ORBAT Assignment, S-3 Trainee Arrival Reminder \nRequest Text: Please Assign ${target} to ORBAT and Organise a Training \nNote: Trainee joined as an Operator`);

          myTarget.roles.add(`1064366996701065257`); //Add Operator Role
        }  else if (occupation == `S.A.W.`) {
            myTarget.roles.add(`1064367028883963935`);//Add SAW Role

            workChannel.send(`Target(s): ${s1Role} , ${s3Role} \nName: ${target} \nRequest Type(s): ORBAT Assignment, S-3 Trainee Arrival Reminder \nRequest Text: Please Assign ${target} to ORBAT and Organise a Training \nNote: Trainee joined as a S.A.W.`);
        } else if (occupation == `Anti-Tank`) {
            myTarget.roles.add(`1064367029718634517`); //Add AT Role

            workChannel.send(`Target(s): ${s1Role} , ${s3Role} \nName: ${target} \nRequest Type(s): ORBAT Assignment, S-3 Trainee Arrival Reminder \nRequest Text: Please Assign ${target} to ORBAT and Organise a Training \nNote: Trainee joined as an Anti-Tank`);
        } else if (occupation == `Marksman`) {
            myTarget.roles.add(`1064367400876777542`); //Add Marksman Role

            workChannel.send(`Target(s): ${s1Role} , ${s3Role} \nName: ${target} \nRequest Type(s): ORBAT Assignment, S-3 Trainee Arrival Reminder \nRequest Text: Please Assign ${target} to ORBAT and Organise a Training \nNote: Trainee joined as a Marksman`);
        } else if (occupation == `S.A.R.C.`) {
            myTarget.roles.add(`1064367872463343626`); //Add SARC Role

            workChannel.send(`Target(s): ${s1Role} , ${s3Role} \nName: ${target} \nRequest Type(s): ORBAT Assignment, S-3 Trainee Arrival Reminder \nRequest Text: Please Assign ${target} to ORBAT and Organise a Training \nNote: Trainee joined as a S.A.R.C.`);
        } else {
            console.log(error);
        }
        await interaction.reply({
            content: `User Has been recruited Sucesfully`, ephemeral: true,
        })

      } else {
        await interaction.reply({
          content: `This person is already a Member`, ephemeral: true,
        });
      }
    } else {
      await interaction.reply({
        content: `Only Section 2 is authorised for use of this command!`, ephemeral: true,
      });
    }
  },
};
