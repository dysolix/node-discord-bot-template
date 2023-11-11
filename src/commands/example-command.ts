import { createSlashCommand } from "../util.js";

export default createSlashCommand({ name: "example", description: "An example slash command" }, async interaction => {
    await interaction.reply("Hello, world!");
});