import { useState } from "react";
import Picker from "./Picker";
import { DECKS, LEGENDARY_JOKERS, STAKES, type Deck, type Legendary, type Stake } from "./Data";
import { findSeed } from "./SeedFinder";

export interface SeedSearchOptions {
    soul: boolean;
    legendary: Legendary;
    deck: Deck;
    stake: Stake;
    showman: boolean;
    version: string;
}

export interface SeedSearchOptionsProps {
    onSubmit: (values: SeedSearchOptions) => void;
}

function search(opts: SeedSearchOptions): string | undefined {
    try {
        const seed = findSeed(opts);
        return seed;
    }
    catch (e) {
        console.error(`Error finding seed: ${e}`);
    }
}

export function SeedSearch({ onSubmit }: SeedSearchOptionsProps) {
    const [soul, setSoul] = useState<boolean>(false);
    const [legendary, setLegendary] = useState<Legendary>(LEGENDARY_JOKERS[0]);
    const [deck, setDeck] = useState<Deck>(DECKS[0]);
    const [stake, setStake] = useState<Stake>(STAKES[0]);

    const [seed, setSeed] = useState<string>("");

    return <div>
        <h2>Seed Search Options</h2>
        <div className="form">
            <label htmlFor="Deck">Deck</label>
            <Picker options={[...DECKS]} value={deck} onChange={e => setDeck(e.target.value as Deck)} />

            <label htmlFor="Stake">Stake</label>
            <Picker options={[...STAKES]} value={stake} onChange={e => setStake(e.target.value as Stake)} />

            <label htmlFor="soul">The Soul</label>
            <input type="checkbox" name="soul" id="check_soul" value={legendary} onChange={e => setSoul(e.target.checked)} />

            <label className={soul ? "" : "inactive"} htmlFor="legendary">Legendary Joker</label>
            <Picker className={soul ? "" : "inactive"} onChange={e => setLegendary(e.target.value as Legendary)}
                options={LEGENDARY_JOKERS}
                value={legendary}
            />

            <button className="" onClick={() => setSeed(search({
                deck, stake, legendary, soul, showman: false, version: "10106"
            }) ?? "")}>Find Seed!</button>

            <input name="seed" id="seed" className="" style={{ textAlign: "center" }} type="text" readOnly value={seed} placeholder="seed" />

            {seed.length > 0 && <button className="span-row" onClick={async () => {
                await navigator.clipboard.writeText(seed);
            }}>Copy Seed</button>}
        </div>
    </div>;
}