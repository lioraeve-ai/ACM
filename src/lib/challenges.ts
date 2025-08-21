
import { getInitialsAction } from './actions';

export interface Rule {
  description: string;
  test: (input: string) => boolean | Promise<boolean>;
}

export interface Challenge {
  tier: number;
  title: string;
  description: string;
  basePoints: number;
  multiplier: number;
  rules: Rule[];
}

const commonWords = ['love', 'hope', 'peace', 'happy', 'good', 'nice'];
const sequentialPatterns = ['qwe', 'asd', 'zxc', '123', 'abc'];
const commonUsernames = ['admin', 'user', 'test', 'demo'];

const noviceConditions: Rule[] = [
  { description: "Password must be at least 10 characters long", test: (input) => input.length >= 10 },
  { description: "Must begin with sacred letters 'ACM'", test: (input) => input.startsWith('ACM') },
  { description: "Must contain at least 3 digits from binary realm (0,1,2,4,8)", test: (input) => (input.match(/[01248]/g) || []).length >= 3 },
  { description: "Must include exactly 2 techno-magical symbols (!@#$%^&*)", test: (input) => (input.match(/[!@#$%^&*]/g) || []).length === 2 },
  { description: "Must contain at least 2 letters from 'DAEMON' in uppercase", test: (input) => (input.match(/[DAEMON]/g) || []).length >= 2 },
  { description: "Cannot have any character appear more than twice consecutively", test: (input) => !/(.)\1{2,}/.test(input) },
  { description: "Must include at least 2 different vowels (a,e,i,o,u) in lowercase", test: (input) => new Set(input.match(/[aeiou]/g) || []).size >= 2 },
  { description: "Must contain current day of week as number (1-7, Monday=1)", test: (input) => {
      const day = new Date().getDay();
      const covenDay = day === 0 ? '7' : day.toString();
      return input.includes(covenDay);
    } 
  },
  { description: "Must include at least 1 hexadecimal character (A-F) in uppercase", test: (input) => /[A-F]/.test(input) },
  { description: "Cannot contain common earthly words", test: (input) => !commonWords.some(word => input.toLowerCase().includes(word)) },
  { description: "Must include at least 1 prime number (2, 3, 5, 7, 11, 13, 17, 19)", test: (input) => /(2|3|5|7|11|13|17|19)/.test(input) },
  { description: "Must contain '25' representing mystical year 2025", test: (input) => input.includes('25') },
  { description: "Must include at least 1 letter from each: 'GHOST','WITCH','DEMON'", test: (input) => {
      return ['GHOST', 'WITCH', 'DEMON'].every(word => 
        word.split('').some(char => input.toUpperCase().includes(char))
      );
    }
  },
  { description: "Must contain at least 1 programming operator (+,-,*,/,=,<,>)", test: (input) => /[+\-*/=<>]/.test(input) },
  { description: "Sum of all numeric digits must be divisible by 3", test: (input) => {
      const digits = input.match(/\d/g);
      if (!digits) return false;
      const sum = digits.map(Number).reduce((a, b) => a + b, 0);
      return sum > 0 && sum % 3 === 0;
    }
  },
];

const cyberWarlockConditions: Rule[] = [
    { description: "Password must be at least 14 characters long", test: (input) => input.length >= 14 },
    { description: "Must start with 'ACM' and contain '2025' somewhere within", test: (input) => input.startsWith('ACM') && input.includes('2025') },
    { description: "Must include current moon phase number (1-8)", test: (input) => {
        // Simplified moon phase calculation
        const day = new Date().getDate();
        const phase = (day % 8) + 1;
        return input.includes(phase.toString());
    }},
    { description: "Must contain at least 1 letter from each: 'VIRUS','TROJAN','WORM','BACKDOOR'", test: (input) => {
        return ['VIRUS', 'TROJAN', 'WORM', 'BACKDOOR'].every(word => 
            word.split('').some(char => input.toUpperCase().includes(char))
        );
    }},
    { description: "Cannot use sequential keyboard patterns (qwe,asd,zxc,123,abc)", test: (input) => !sequentialPatterns.some(p => input.toLowerCase().includes(p)) },
    { description: "Must include exactly 6 hexadecimal digits (A-F, a-f)", test: (input) => (input.match(/[A-Fa-f]/g) || []).length === 6 },
    { description: "Must contain programming language abbreviation (JS,PY,CPP,SQL,GO,RUST)", test: (input) => /(JS|PY|CPP|SQL|GO|RUST)/.test(input) },
    { description: "Must include Boolean operator (AND,OR,NOT,XOR) in all caps", test: (input) => /(AND|OR|NOT|XOR)/.test(input) },
    { description: "Must contain current hour in 24-hour format", test: (input) => input.includes(new Date().getHours().toString().padStart(2, '0')) },
    { description: "Must include letters spelling data structure (ARRAY,STACK,QUEUE,TREE,HEAP)", test: (input) => /(ARRAY|STACK|QUEUE|TREE|HEAP)/.test(input.toUpperCase()) },
    { description: "Must contain exactly 3 special characters from mystical symbols", test: (input) => (input.match(/[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/g) || []).length === 3 },
    { description: "Must include at least 2 different prime numbers between 11-97", test: (input) => {
        const primes = ["11", "13", "17", "19", "23", "29", "31", "37", "41", "43", "47", "53", "59", "61", "67", "71", "73", "79", "83", "89", "97"];
        const found = primes.filter(p => input.includes(p));
        return new Set(found).size >= 2;
    }},
    { description: "Must contain letters from protocol incantations (TCP,UDP,HTTP,DNS,SSH,FTP)", test: (input) => /(TCP|UDP|HTTP|DNS|SSH|FTP)/.test(input.toUpperCase()) },
    { description: "Must include current semester indicator (F,S,SU)", test: (input) => {
        const month = new Date().getMonth();
        let semester = 'SU';
        if (month >= 8 && month <= 11) semester = 'F';
        if (month >= 0 && month <= 4) semester = 'S';
        return input.includes(semester);
    }},
    { description: "Must contain letters from hash spell types (MD5,SHA,AES,RSA,DES)", test: (input) => /(MD5|SHA|AES|RSA|DES)/.test(input.toUpperCase()) },
    { description: "Cannot contain common usernames", test: (input) => !commonUsernames.some(u => input.toLowerCase().includes(u)) },
    { description: "Must include at least 1 power of 2 number (4,8,16,32,64,128,256)", test: (input) => /(4|8|16|32|64|128|256)/.test(input) },
    { description: "Must contain at least 2 Roman numerals (I,V,X,L,C,D,M)", test: (input) => (input.match(/[IVXLCDM]/g) || []).length >= 2 },
    { description: "Must include at least 1 bitwise operator symbol (&,|,^,~)", test: (input) => /[&|^~]/.test(input) },
    { description: "Password must be validated within 30-minute window", test: () => true }, // Server-side
];

const masterSorcererConditions: Rule[] = [
    { description: "Password must be at least 18 characters long", test: (input) => input.length >= 18 },
    { description: "Must begin with 'ACM', end with '2025', contain 'LONG live AAKAR'", test: (input) => input.startsWith('ACM') && input.endsWith('2025') && input.includes('LONG live AAKAR') },
    { description: "the technical executives name that is prompting his life at this point", test: (input) => input.includes('PRADYUN') },
    { description: "Must include current moon phase emoji (🌑🌒🌓🌔🌕🌖🌗🌘)", test: (input) => {
        const phases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
        const day = new Date().getDate();
        const phase = phases[day % 8];
        return input.includes(phase);
    }},
    { description: "Must contain the phone number of the lead of LUG", test: (input) => input.includes('+971562058015') },
    { description: "Must include valid chess algebraic notation", test: (input) => /(?:[PNBRQK]?[a-h]?[1-8]?x?[a-h][1-8]|[O-O](?:-O)?)/.test(input) },
    { description: "Include the person who created AI", test: (input) => input.includes('Alan Turing') },
    { description: "Cannot contain sequential ASCII characters", test: (input) => {
        for (let i = 0; i < input.length - 2; i++) {
            const c1 = input.charCodeAt(i);
            const c2 = input.charCodeAt(i + 1);
            const c3 = input.charCodeAt(i + 2);
            if (c2 === c1 + 1 && c3 === c2 + 1) return false;
        }
        return true;
    }},
    { description: "What is the current value of AED in Dollars", test: (input) => input.includes('0.27') },
    { description: "Must contain legendary computer scientist surname", test: (input) => /(Turing|Dijkstra|Knuth|Ritchie|Torvalds|Hopper|Lovelace)/i.test(input) },
    { description: "Must include programming language codes", test: (input) => /(JS|PY|CPP|SQL|GO|RU|C|R|PHP|JAVA)/.test(input) },
    { description: "Cannot use keyboard geometric patterns", test: (input) => !/(qwerty|asdfgh|zxcvbn|147|258|369)/.test(input.toLowerCase()) },
    { description: "Must contain current academic season code (F,S,SU,W)", test: (input) => {
        const m = new Date().getMonth();
        let season = 'W';
        if (m >= 2 && m <= 4) season = 'S';
        if (m >= 5 && m <= 7) season = 'SU';
        if (m >= 8 && m <= 10) season = 'F';
        return input.includes(season);
    }},
    { description: "Must include at least 3 different Roman numerals", test: (input) => new Set(input.match(/[IVXLCDM]/g) || []).size >= 3 },
    { description: "Must include current academic year combination (2526)", test: (input) => input.includes('2526') },
    { description: "Include the year that you graduate", test: (input) => ['2026', '2027', '2028', '2029'].some(year => input.includes(year)) },
    { description: "Add the years when ACM received the ACM Student Chapter Excellence Award", test: (input) => input.includes('2020') && input.includes('2024') },
    { description: "Write the name of the best Footballer", test: (input) => input.includes('Cristiano Ronaldo') },
    { description: "Which song was used in the ad where the main protagonist said nothing beats a JET2 holiday and right now you can save 50 pounds per-person", test: (input) => input.includes('Hold My Hand') },
    { description: "In which country was the distracted boyfriend meme shot in", test: (input) => input.toLowerCase().includes('spanish') },
    { description: "Must contain current business quarter (Q1,Q2,Q3,Q4)", test: (input) => {
        const q = `Q${Math.floor(new Date().getMonth() / 3) + 1}`;
        return input.includes(q);
    }},
    { description: "include the name of the previous ACM president", test: (input) => input.includes('Firas') },
    { description: "Password expires after exactly 180 seconds", test: () => true }, // Server-side
];

export const challenges: Challenge[] = [
  {
    tier: 1,
    title: "Novice Code-Necromancer's Trial",
    description: "Your first steps into the digital ether.",
    basePoints: 100,
    multiplier: 1.0,
    rules: noviceConditions,
  },
  {
    tier: 2,
    title: "Advanced Cyber-Warlock's Nightmare",
    description: "The complexity of the incantations grows.",
    basePoints: 200,
    multiplier: 1.5,
    rules: cyberWarlockConditions,
  },
  {
    tier: 3,
    title: "Master Techno-Sorcerer's Digital Damnation",
    description: "The ultimate challenge of digital sorcery.",
    basePoints: 300,
    multiplier: 2.0,
    rules: masterSorcererConditions,
  },
];

export async function validatePassword(password: string, rules: Rule[]): Promise<(Rule & { isSatisfied: boolean })[]> {
    const results = await Promise.all(
        rules.map(async (rule) => {
            const isSatisfied = await Promise.resolve(rule.test(password));
            return {
                ...rule,
                isSatisfied,
            };
        })
    );
    return results;
}

    