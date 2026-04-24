import { createHmac } from 'node:crypto';

const UPPERCASE_RULE_CHARACTERS = 'sunlovesnow1990090127xykab';

const md5 = (input: string, key: string): string =>
  createHmac('md5', key).update(input).digest('hex');

export const generateCode = (password: string, key: string): string => {
  const firstPass = md5(password, key);
  const secondPass = md5(firstPass, 'snow');
  const thirdPass = md5(firstPass, 'kise');

  const source = secondPass.split('');

  for (const [index, character] of source.entries()) {
    if (!Number.isNaN(Number(character))) {
      continue;
    }

    const ruleCharacter = thirdPass[index];
    if (ruleCharacter && UPPERCASE_RULE_CHARACTERS.includes(ruleCharacter)) {
      source[index] = character.toUpperCase();
    }
  }

  const code32 = source.join('');
  const firstCharacter = code32[0];

  return Number.isNaN(Number(firstCharacter))
    ? code32.slice(0, 16)
    : `K${code32.slice(1, 16)}`;
};