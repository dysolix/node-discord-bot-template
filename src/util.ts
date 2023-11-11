import { SlashCommandBuilder } from "discord.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises"

export function getDirectoryName(importMeta: ImportMeta) {
    return path.dirname(fileURLToPath(importMeta.url));
}

export function getFileName(importMeta: ImportMeta) {
    return fileURLToPath(importMeta.url);
}

export function createSlashCommand(data: { name: string, description: string } | SlashCommandBuilder, execute: SlashCommandExecuteFunction): ExecutableSlashCommand {
    return {
        data: data instanceof SlashCommandBuilder ? data : new SlashCommandBuilder().setName(data.name).setDescription(data.description),
        execute
    }
}

export async function importDirectory(directoryPath: string, recursive = true) {
    const directoryEntries = await fs.readdir(directoryPath, { withFileTypes: true });
    const exports: any[] = [];
    for(const entry of directoryEntries) {
        if(entry.isFile()) {
            const exp = await import(path.join(directoryPath, entry.name));
            exports.push(exp);
        } else if(entry.isDirectory() && recursive) {
            const exps = await importDirectory(path.join(directoryPath, entry.name), recursive);
            exports.push(...exps);
        }
    }

    return exports;
}