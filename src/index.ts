#!/usr/bin/env node

import clipboard from 'clipboardy';
import { access, readFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

import { generateCode } from './password.js';

interface HuamiConfig {
  password: string;
}

const CONFIG_PATH = join(homedir(), '.huami.json');

const exitWithMessage = (message: string, exitCode: number): never => {
  console.error(message);
  process.exit(exitCode);
};

const readConfig = async (): Promise<HuamiConfig> => {
  try {
    await access(CONFIG_PATH);
  } catch {
    exitWithMessage('~/.huami.json not exists !!', 2);
  }

  try {
    const rawConfig = await readFile(CONFIG_PATH, 'utf8');
    const config = JSON.parse(rawConfig) as Partial<HuamiConfig>;

    if (typeof config.password !== 'string' || config.password.length === 0) {
      throw new Error('Invalid password');
    }

    return { password: config.password };
  } catch {
    exitWithMessage('~/.huami.json file error !!', 3);
  }

  throw new Error('Unreachable');
};

const promptKey = async (): Promise<string> => {
  const readline = createInterface({ input: stdin, output: stdout });

  try {
    const key = (await readline.question('Enter your key: ')).trim();
    if (!key) {
      exitWithMessage('No key, exit ..', 0);
    }

    return key;
  } finally {
    readline.close();
  }
};

const main = async (): Promise<void> => {
  const key = await promptKey();
  const config = await readConfig();
  const result = generateCode(config.password, key);

  await clipboard.write(result);
  console.log('Copied, will clear in 10s ..');

  setTimeout(() => {
    void clipboard.write('   ');
  }, 10_000);
};

void main();