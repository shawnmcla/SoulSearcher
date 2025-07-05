import type { Deck, Legendary, Stake, Tag } from "./Data";

export interface SeedSearchOptions {
    soul: boolean;
    legendary: Legendary;
    deck: Deck;
    stake: Stake;
    showman: boolean;
    version: string;
    seedCount: number;
    timeoutSecs: number;
}

export function getRandomSeed(length = 8) {
    const ret = [];
    for (let i = 0; i < length; i++) {
        const r = Math.random();
        if (r > 0.7) {
            // char between '1' and '9'
            ret.push(String.fromCharCode(Math.floor(Math.random() * (57 - 49 + 1)) + 49));
        } else if (r > 0.45) {
            // char between 'A' and 'N'
            ret.push(String.fromCharCode(Math.floor(Math.random() * (78 - 65 + 1)) + 65));
        } else {
            // char between 'P' and 'Z'
            ret.push(String.fromCharCode(Math.floor(Math.random() * (90 - 80 + 1)) + 80));
        }
    }
    return ret.join("");
}

function initUnlocks(inst: ImmolateInstance) {
    inst.initLocks(1, false, false); inst.lock("Overstock Plus");
    inst.lock("Liquidation");
    inst.lock("Glow Up");
    inst.lock("Reroll Glut");
    inst.lock("Omen Globe");
    inst.lock("Observatory");
    inst.lock("Nacho Tong");
    inst.lock("Recyclomancy");
    inst.lock("Tarot Tycoon");
    inst.lock("Planet Tycoon");
    inst.lock("Money Tree");
    inst.lock("Antimatter");
    inst.lock("Illusion");
    inst.lock("Petroglyph");
    inst.lock("Retcon");
    inst.lock("Palette");
}

export type SeedSearchResult = {
    seeds: string[];
    timedOut: boolean;
    totalTime: number;
}

export function findSeed(opts: SeedSearchOptions, Immolate: TImmolate): SeedSearchResult {
    if (!opts.soul) return { seeds: [getRandomSeed()], timedOut: false, totalTime: 0 };

    const seeds: string[] = [];

    const TIMEOUT_MS = opts.timeoutSecs * 1000;
    if (TIMEOUT_MS <= 0) throw new Error("Timeout must be greater than 0 seconds.");

    const start = performance.now();
    let count = 0;
    let inst: ImmolateInstance | undefined;
    let foundCount = 0;

    console.log(`Searching for ${opts.seedCount} seeds with legendary: ${opts.legendary}, deck: ${opts.deck}, stake: ${opts.stake}, soul: ${opts.soul}, timeout: ${TIMEOUT_MS}ms`);
    const deletables: Deletable[] = [];
    outer:
    while (performance.now() - start < TIMEOUT_MS && foundCount < opts.seedCount) {
        if(deletables.length > 0) {
            for (const d of deletables) {
                d.delete();
            }
            deletables.length = 0;
        }

        if (++count % 10 === 0) console.info(`Checking seed #${count}`);

        const seed = getRandomSeed();
        inst = new Immolate.Instance(seed);
        deletables.push(inst);

        initUnlocks(inst);
        const ante = 1;

        const ante1Tags: Tag[] = [inst.nextTag(ante), inst.nextTag(ante)];
        const charmTag = ante1Tags.indexOf("Charm Tag");
        if (charmTag === -1) continue;
        const packSize = 5;
        
        const arcana = inst.nextArcanaPack(packSize, ante);
        deletables.push(arcana);

        for (let i = 0; i < packSize; i++) {
            if (arcana.get(i) === "The Soul") {
                console.log(`The soul found at slot ${i} on seed: ${seed}`);
                const soulJoker = inst.nextJoker("sou", ante, false);
                console.log("Soul gives: " + soulJoker.joker);
                if (soulJoker.joker === opts.legendary) {
                    console.log("MATCHES CRITERIA");
                    seeds.push(seed);
                    foundCount++;
                    continue outer;
                } else {
                    console.log("Wrong legendary, keep going");
                }
            }
        }
    }

    
    return { seeds, timedOut: foundCount === opts.seedCount, totalTime: performance.now() - start };
}