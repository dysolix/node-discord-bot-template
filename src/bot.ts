import { Client as DiscordClient, Events, REST, Routes } from "discord.js";
import { getCommands } from "./command-manager.js";

const APPLICATION_ID = process.env["APPLICATION_ID"];
if (!APPLICATION_ID)
    throw new Error("Environment variable 'APPLICATION_ID' is missing.")

const TOKEN = process.env["DISCORD_TOKEN"];
if (!TOKEN)
    throw new Error("Environment variable 'DISCORD_TOKEN' is missing.");

const rest = new REST().setToken(TOKEN);
export const Client = new DiscordClient({
    intents: [
        
    ]
});

Client.once(Events.ClientReady, async c => {
    await rest.put(
        Routes.applicationCommands(APPLICATION_ID),
        { body: getCommands().map(cmd => cmd.data) },
    );

    // Exampe directory import
    // await importDirectory(path.join(__dirname, "./message_handlers"));
});

await Client.login(TOKEN);