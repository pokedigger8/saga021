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
        //Remove Civvie Tag, Add 21st, Rifleman, Recruit and Reserves Tag
        myTarget.roles.remove(`809148027255783495`);
        myTarget.roles.add(`809148027255783498`);
        myTarget.roles.add(`809148027331805249`);
        myTarget.roles.add(`809189422675394590`);
        myTarget.roles.add(`809148027331805252`);

        //Channels to send messages
        const unitinfo = client.channels.cache.get(`809148027897905211`);
        const s3recruits = client.channels.cache.get(`823581911913070592`);

        //Get the Desired MOS
        const occupation = interaction.options.getString(`mos`);

        //Send the Standard Welcome Message
        client.channels.cache.get(`809148028841492560`).send(`Welcome ${target} to the 21st Shock Trooper Battalion!\n Please change your name to Rct. [Name Initial] "[OPTIONAL NICKNAME]" [Last Name]. Look at your peers for a rough idea \n Please speak to Section 3 Training Staff to organise a training in ${s3recruits}!\n Any required things such as modpack, server information and ORBAT is located in ${unitinfo}`);

        //Check what MOS the target wants to be, Assign Extra MOS Role and send slightly different advisory role.

        if (occupation == `Rifleman`) {
            client.channels.cache.get(`823581791230230620`).send(`BE ADVISED SECTION 3 STAFF, ${target} has joined as a Rifleman! Please organise a training as soon as is convinient`);
            client.channels.cache.get(`823581243571437599`).send(`BE ADVISED SECTION 1 STAFF, ${target} has joined as a Rifleman! Stand by for a name change and update the ORBAT with relevant information!`);
        } else if (occupation == `Grenadier`) {
            //Set Grenadier Role
            myTarget.roles.add(`809148027331805248`);

            client.channels.cache.get(`823581791230230620`).send(`BE ADVISED SECTION 3 STAFF, ${target} has joined as a Grenadier! Please organise a training as soon as is convinient`);
            client.channels.cache.get(`823581243571437599`).send(`BE ADVISED SECTION 1 STAFF, ${target} has joined as a Grenadier! Stand by for a name change and update the ORBAT with relevant information!`);
        } else if (occupation == `S.A.W.`) {
            myTarget.roles.add(`809148027331805247`);

            client.channels.cache.get(`823581791230230620`).send(`BE ADVISED SECTION 3 STAFF, ${target} has joined as a S.A.W. ! Please organise a training as soon as is convinient`);
            client.channels.cache.get(`823581243571437599`).send(`BE ADVISED SECTION 1 STAFF, ${target} has joined as a S.A.W. ! Stand by for a name change and update the ORBAT with relevant information!`);
        } else if (occupation == `Anti-Tank`) {
            myTarget.roles.add(`809148027313979401`);

            client.channels.cache.get(`823581791230230620`).send(`BE ADVISED SECTION 3 STAFF, ${target} has joined as a Anti-Tank! Please organise a training as soon as is convinient`);
            client.channels.cache.get(`823581243571437599`).send(`BE ADVISED SECTION 1 STAFF, ${target} has joined as a Anti-Tank! Stand by for a name change and update the ORBAT with relevant information!`);
        } else if (occupation == `Breacher`) {
            myTarget.roles.add(`1002979111351894056`);

            client.channels.cache.get(`823581791230230620`).send(`BE ADVISED SECTION 3 STAFF, ${target} has joined as a Breacher! Please organise a training as soon as is convinient`);
            client.channels.cache.get(`823581243571437599`).send(`BE ADVISED SECTION 1 STAFF, ${target} has joined as a Breacher! Stand by for a name change and update the ORBAT with relevant information!`);
        } else if (occupation == `Marksman`) {
            myTarget.roles.add(`809148027313979398`);

            client.channels.cache.get(`823581791230230620`).send(`BE ADVISED SECTION 3 STAFF, ${target} has joined as a Marksman! Please organise a training as soon as is convinient`);
            client.channels.cache.get(`823581243571437599`).send(`BE ADVISED SECTION 1 STAFF, ${target} has joined as a Marksman! Stand by for a name change and update the ORBAT with relevant information!`);
        } else if (occupation == `S.A.R.C.`) {
            myTarget.roles.add(`809148027313979400`);

            client.channels.cache.get(`823581791230230620`).send(`BE ADVISED SECTION 3 STAFF, ${target} has joined as a S.A.R.C. ! Please organise a training as soon as is convinient`);
            client.channels.cache.get(`823581243571437599`).send(`BE ADVISED SECTION 1 STAFF, ${target} has joined as a S.A.R.C. ! Stand by for a name change and update the ORBAT with relevant information!`);
        } else if (occupation == `R.T.O.`) {
            myTarget.roles.add(`841016140524290049`);

            client.channels.cache.get(`823581791230230620`).send(`BE ADVISED SECTION 3 STAFF, ${target} has joined as a R.T.O. ! Please organise a training as soon as is convinient`);
            client.channels.cache.get(`823581243571437599`).send(`BE ADVISED SECTION 1 STAFF, ${target} has joined as a R.T.O. ! Stand by for a name change and update the ORBAT with relevant information!`);
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
