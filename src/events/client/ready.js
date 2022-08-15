module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log(`Personality Core Initialised ${client.user.tag} is at your service!`);
    }
}