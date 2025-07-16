import { IsArcanaPack, PackSize, type Deck, type Edition, type Legendary, type Pack, type Stake, type Tag } from "../Data";

export interface SeedSearchOptions {
    deck: Deck;
    stake: Stake;
    showman: boolean;
    version: string;
    timeoutSecs: number;
    legendaryCriteria?: LegendaryCriteria;
}

export const CriteriaKind = {
    Legendary: "Legendary",
} as const;

export const LegendarySources = [
    "Any",
    "Round1Skip",
] as const;

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
                    if (soulJoker.edition && soulJoker.edition === edition) {
                        return i;
                    }
                    return false;
                }

                return i;
            }

            return false;
        }
    }

    return false;
}

export function findSeed(opts: SeedSearchOptions, Immolate: TImmolate): string {
    if (!opts.legendaryCriteria) { throw new Error("Legendary criteria is required for seed search."); }

    let inst: ImmolateInstance | undefined;

    while (true) {
        if (deletables.length > 0) {
            for (const d of deletables) {
                d.delete();
            }
            deletables.length = 0;
        }

        const seed = getRandomSeed();
        inst = new Immolate.Instance(seed);
        deletables.push(inst);

        initUnlocks(inst);
        const ante = 1;
        const ante1Tags: Tag[] = [inst.nextTag(ante), inst.nextTag(ante)];
        const shop1Packs: Pack[] = [inst.nextPack(ante), inst.nextPack(ante)];
        const shop2Packs: Pack[] = [inst.nextPack(ante), inst.nextPack(ante)];

        // If the source is "Round1Skip", then we only check if there's a charm tag and bail out otherwise.
        if (opts.legendaryCriteria.source === "Round1Skip") {
            if (ante1Tags[0] !== "Charm Tag") {
                continue;
            } else {
                if (checkArcanaForLegendary(inst, ante, 5, opts.legendaryCriteria.legendary, opts.legendaryCriteria.edition) !== false) {
                    return seed;
                }
                continue;
            }
        }
        else {
            // Here we check for any appearance of The Soul
            // The Soul can appear in two ways in Ante 1: From a Charm tag skip, or from an arcana pack in the shop
            if (ante1Tags[0] === "Charm Tag") {
                if (checkArcanaForLegendary(inst, ante, 5, opts.legendaryCriteria.legendary, opts.legendaryCriteria.edition)) {
                    return seed;
                }
            }
            else {
                // shop1Packs[0] is always a Buffoon Pack in Ante 1 on the latest version of the game
                if (IsArcanaPack(shop1Packs[1])) {
                    if (checkArcanaForLegendary(inst, ante, PackSize(shop1Packs[1]), opts.legendaryCriteria.legendary, opts.legendaryCriteria.edition)) {
                        return seed;
                    }
                }
            }

            for (const pack of shop2Packs) {
                if (IsArcanaPack(pack)) {
                    if (checkArcanaForLegendary(inst, ante, PackSize(pack), opts.legendaryCriteria.legendary, opts.legendaryCriteria.edition)) {
                        return seed;
                    }
                }
            }
        }
    }
}