import type { Tag } from "./Data";
import type { SeedSearchOptions } from "./SeedSearch";

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
    inst.initLocks(1, false, false);
    inst.lock("Overstock Plus");
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

export function findSeed(opts: SeedSearchOptions): string | undefined {
    if (!opts.soul) return getRandomSeed();

    const TIMEOUT_MS = 10_000;
    const start = performance.now();
    let count = 0;
    let inst: ImmolateInstance | undefined;
    while (performance.now() - start < TIMEOUT_MS) {
        if (++count % 10 === 0) console.info(`Checking seed #${count}`);
        
        if(inst !== undefined) inst.delete();
        
        const seed = getRandomSeed();
        inst = new Immolate.Instance(seed);

        initUnlocks(inst);
        const ante = 1;
        
        const ante1Tags: Tag[] = [inst.nextTag(ante), inst.nextTag(ante)];
        const charmTag = ante1Tags.indexOf("Charm Tag");
        if(charmTag === -1) continue;
        const packSize = 5;
        const arcana = inst.nextArcanaPack(packSize, ante);
        for(let i = 0; i < packSize; i++) {
            if(arcana.get(i) === "The Soul") {
                console.log(`The soul found at slot ${i} on seed: ${seed}`);
                const soulJoker = inst.nextJoker("sou", ante, false);
                console.log("Soul gives: " + soulJoker.joker);
                if(soulJoker.joker === opts.legendary) {
                    console.log("MATCHES CRITERIA");
                    inst.delete();
                    return seed;
                } else {
                    console.log("Wrong legendary, keep going");
                }
            }
        }
    }

    throw new Error("Seed finder timed out.");
}