import { IsArcanaPack, PackSize, type Deck, type Edition, type Legendary, type Pack, type Stake, type Tag } from "./Data";

export interface SeedSearchOptions {
    deck: Deck;
    stake: Stake;
    showman: boolean;
    version: string;
    seedCount: number;
    timeoutSecs: number;
    legendaryCriteria?: LegendaryCriteria;
}

export const CriteriaKind = {
    Legendary: "Legendary",
} as const;

export const LegendarySources = [
    "Any",
    "Round1Skip",
];

export type LegendarySource = typeof LegendarySources[number];

export class LegendaryCriteria {
    public readonly legendary: Legendary;
    public readonly source: LegendarySource;
    public readonly edition?: Edition;
    constructor(legendary: Legendary, source: LegendarySource, edition?: Edition) {
        this.legendary = legendary;
        this.source = source;
        this.edition = edition;
    }
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

const deletables: Deletable[] = [];

function checkArcanaForLegendary(inst: ImmolateInstance, ante: number, packSize: number, legendary: Legendary, edition: Edition | undefined = undefined): number | false {
    const arcana = inst.nextArcanaPack(packSize, ante);
    deletables.push(arcana);

    // Check the pack for The Soul
    for (let i = 0; i < packSize; i++) {
        if (arcana.get(i) === "The Soul") {
            const soulJoker = inst.nextJoker("sou", ante, false);
            if (soulJoker.joker === legendary) {
                if (edition) {
                    console.debug("Found, checking edition");
                    console.debug("Actual edition: " + soulJoker.edition);
                    if (soulJoker.edition && soulJoker.edition === edition) {
                        return i;
                    }
                    return false;
                }

                //console.debug(`Found joker: "${soulJoker.joker}" in Arcana Pack`);
                return i;
            }

            //console.debug("Wrong legendary, keep going");
            return false;
        }
    }

    return false;
}

export function findSeed(opts: SeedSearchOptions, Immolate: TImmolate): SeedSearchResult {
    if (!opts.legendaryCriteria) { throw new Error("Legendary criteria is required for seed search."); }

    const seeds: string[] = [];

    const TIMEOUT_MS = opts.timeoutSecs * 1000;
    if (TIMEOUT_MS <= 0) throw new Error("Timeout must be greater than 0 seconds.");

    const start = performance.now();

    let count = 0;
    let inst: ImmolateInstance | undefined;
    let foundCount = 0;

    console.log(`Searching for ${opts.seedCount} seeds with criteria: ${opts.legendaryCriteria}, deck: ${opts.deck}, stake: ${opts.stake}, timeout: ${TIMEOUT_MS}ms`);

    outer:
    while (performance.now() - start < TIMEOUT_MS && foundCount < opts.seedCount) {
        if (deletables.length > 0) {
            for (const d of deletables) {
                d.delete();
            }
            deletables.length = 0;
        }

        if (++count % 10_000 === 0) console.info(`Checking seed #${count}`);

        const seed = getRandomSeed();
        inst = new Immolate.Instance(seed);
        deletables.push(inst);

        initUnlocks(inst);
        const ante = 1;
        const ante1Tags: Tag[] = [inst.nextTag(ante), inst.nextTag(ante)];
        const shop1Packs: Pack[] = [inst.nextPack(ante), inst.nextPack(ante)];
        const shop2Packs: Pack[] = [inst.nextPack(ante), inst.nextPack(ante)];

        // Check legendary criteria, if applicable
        if (opts.legendaryCriteria.source === "Round1Skip") {
            if (ante1Tags[0] !== "Charm Tag") {
                //console.debug("Ante 1 skip tag is not a Charm Tag, skipping seed");
                continue;
            } else {
                // Charm Tag gives a Mega Celestial pack, which is 5 cards
                if (checkArcanaForLegendary(inst, ante, 5, opts.legendaryCriteria.legendary, opts.legendaryCriteria.edition) !== false) {
                    seeds.push(seed);
                    foundCount++;
                }
                continue;
            }
        }
        else {
            // Here we check for any appearance of The Soul
            // The Soul can appear in two ways in Ante 1: From a Charm tag skip, or from an arcana pack in the shop
            // It is a bit complex to determine. The games' seeded RNG essentially has a "queue" of tarot cards that can appear
            // in packs per ante. This means for example that there could be a soul in an arcana pack in the second shop that only shows up
            // if a charm tag skip is taken in the first round/

            // We must determine the maximum number of tarot cards that we can see, with a combination of charm tags and arcana booster packs.
            // The first shop always contains a buffoon pack, so we can assume that the max of round 1 is always 5 (either a Charm Tag or a Jumbo Arcana pack)
            // The second shop may contain 0 or up to 10 (two jumbo Arcana packs)

            // TODO: This implementation is slightly inaccurate, as it checks all cards as if they were coming from a single pack, which has some implications
            // when it comes to the way Balatro handles duplicates. We need to ensure we check in chunks as the packs would be opened.            
            if (ante1Tags[0] === "Charm Tag") {
                if (checkArcanaForLegendary(inst, ante, 5, opts.legendaryCriteria.legendary, opts.legendaryCriteria.edition)) {
                    // TODO: Return description
                    console.debug("FOUND @ First round Charm Tag skip");
                    seeds.push(seed);
                    foundCount++;
                    continue;
                }
            }
            else {
                if (IsArcanaPack(shop1Packs[1])) {
                    if (checkArcanaForLegendary(inst, ante, PackSize(shop1Packs[1]), opts.legendaryCriteria.legendary, opts.legendaryCriteria.edition)) {
                        console.debug("FOUND @ Shop 1 " + shop1Packs[1]);
                        seeds.push(seed);
                        foundCount++;
                        continue;
                    }
                }
            }

            for (const pack of shop2Packs) {
                if (IsArcanaPack(pack)) {
                    if (checkArcanaForLegendary(inst, ante, PackSize(pack), opts.legendaryCriteria.legendary, opts.legendaryCriteria.edition)) {
                        console.debug("FOUND @ Shop 2 " + pack);
                        seeds.push(seed);
                        foundCount++;
                        continue outer;
                    }
                }
            }
        }
    }


    return { seeds, timedOut: foundCount !== opts.seedCount, totalTime: performance.now() - start };
}