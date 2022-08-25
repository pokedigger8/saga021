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
      .fetch(`809148027255783498`)
      .catch(console.error);
    
    const target = interaction.options.getUser(`user`);
    const myTarget = interaction.guild.members.cache.get(target.id);
    if (roles.cache.has(`823553424913596466`)) {

      if (!myTarget.roles.cache.some(tw => tw.name === `21STB`)) {
        //Remove Civvie Tag, Add 21st, Rifleman, Recruit and Reserves Tag, and first platoon Tags
        myTarget.roles.remove(`809148027255783495`);
        myTarget.roles.add(`809148027255783498`);
        myTarget.roles.add(`809148027331805249`);
        myTarget.roles.add(`809189422675394590`);
        myTarget.roles.add(`809148027331805252`);
        myTarget.roles.add(`809148027385544705`);

        //Roles we need to Mention
        s1Role = interaction.guild.roles.cache.get(`823553424581722132`);
        s3Role = interaction.guild.roles.cache.get(`823553449227714571`);

        //Channels to send messages
        const unitinfo = client.channels.cache.get(`809148027897905211`);
        const s3recruits = client.channels.cache.get(`823581911913070592`);
        const workChannel = client.channels.cache.get(`1011724724356796437`);

        //Get the Desired MOS
        const occupation = interaction.options.getString(`mos`);

        //Send the Standard Welcome Message
        client.channels.cache.get(`809148028841492560`).send(`Welcome ${target} to the 21st Shock Trooper Battalion!\n Please change your name to Rct. [Name Initial] "[OPTIONAL NICKNAME]" [Last Name]. Look at your peers for a rough idea \n Please speak to Section 3 Training Staff to organise a training in ${s3recruits}!\n Any required things such as modpack, server information and ORBAT is located in ${unitinfo}`);

        //Check what MOS the target wants to be, Assign Extra MOS Role and send slightly different advisory role.

        if (occupation == `Rifleman`) {
          workChannel.send(`Target(s): ${s1Role} , ${s3Role} \nName: Sága A.I. \nRequest Type(s): ORBAT Assignment, S-3 Trainee Arrival Reminder \nRequest Text: Please Assign ${target} to ORBAT and Organise a Training \nNote: Trainee joined as a Rifleman`);
        } else if (occupation == `Grenadier`) {
            //Set Grenadier Role
            myTarget.roles.add(`809148027331805248`);

            workChannel.send(`Target(s): ${s1Role} , ${s3Role} \nName: Sága A.I. \nRequest Type(s): ORBAT Assignment, S-3 Trainee Arrival Reminder \nRequest Text: Please Assign ${target} to ORBAT and Organise a Training \nNote: Trainee joined as a Grenadier`);
        } else if (occupation == `S.A.W.`) {
            myTarget.roles.add(`809148027331805247`);

            workChannel.send(`Target(s): ${s1Role} , ${s3Role} \nName: Sága A.I. \nRequest Type(s): ORBAT Assignment, S-3 Trainee Arrival Reminder \nRequest Text: Please Assign ${target} to ORBAT and Organise a Training \nNote: Trainee joined as a S.A.W.`);
        } else if (occupation == `Anti-Tank`) {
            myTarget.roles.add(`809148027313979401`);

            workChannel.send(`Target(s): ${s1Role} , ${s3Role} \nName: Sága A.I. \nRequest Type(s): ORBAT Assignment, S-3 Trainee Arrival Reminder \nRequest Text: Please Assign ${target} to ORBAT and Organise a Training \nNote: Trainee joined as an Anti-Tank`);
        } else if (occupation == `Breacher`) {
            myTarget.roles.add(`1002979111351894056`);

            workChannel.send(`Target(s): ${s1Role} , ${s3Role} \nName: Sága A.I. \nRequest Type(s): ORBAT Assignment, S-3 Trainee Arrival Reminder \nRequest Text: Please Assign ${target} to ORBAT and Organise a Training \nNote: Trainee joined as a Breacher`);
        } else if (occupation == `Marksman`) {
            myTarget.roles.add(`809148027313979398`);

            workChannel.send(`Target(s): ${s1Role} , ${s3Role} \nName: Sága A.I. \nRequest Type(s): ORBAT Assignment, S-3 Trainee Arrival Reminder \nRequest Text: Please Assign ${target} to ORBAT and Organise a Training \nNote: Trainee joined as a Marksman`);
        } else if (occupation == `S.A.R.C.`) {
            myTarget.roles.add(`809148027313979400`);

            workChannel.send(`Target(s): ${s1Role} , ${s3Role} \nName: Sága A.I. \nRequest Type(s): ORBAT Assignment, S-3 Trainee Arrival Reminder \nRequest Text: Please Assign ${target} to ORBAT and Organise a Training \nNote: Trainee joined as a S.A.R.C.`);
        } else if (occupation == `R.T.O.`) {
            myTarget.roles.add(`841016140524290049`);

            workChannel.send(`Target(s): ${s1Role} , ${s3Role} \nName: Sága A.I. \nRequest Type(s): ORBAT Assignment, S-3 Trainee Arrival Reminder \nRequest Text: Please Assign ${target} to ORBAT and Organise a Training \nNote: Trainee joined as aN R.T.O.`);
        } else {
            console.log(error);
        }
        await interaction.reply({
            content: `User Has been recruited Sucesfully`, ephemeral: true,
        })

      } else {
        await interaction.reply({
          content: `This person is already a 21st Member`, ephemeral: true,
        });
      }
    } else {
      await interaction.reply({
        content: `Only Section 2 is authorised for use of this command!`, ephemeral: true,
      });
    }
  },
};
