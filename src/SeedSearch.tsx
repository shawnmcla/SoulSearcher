import { useState } from "react";
import Picker from "./Picker";
import { DECKS, LEGENDARY_JOKERS, STAKES, type Deck, type Legendary, type Stake } from "./Data";
import { findSeed, type SeedSearchOptions, type SeedSearchResult } from "./SeedFinder";

import SeedFinderWorker from "./SeedFinderWorker?worker";

export interface SeedSearchOptionsProps {
    onSubmit: (values: SeedSearchOptions) => void;
}

function CopyIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-copy"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /></svg> }

function SeedResult({ seed }: { seed: string }) {
    return <div className="seed-result span-row"><input style={{ textAlign: "center" }} type="text" readOnly value={seed} placeholder="seed" />
        <button onClick={async () => {
            await navigator.clipboard.writeText(seed);
        }}>
            <CopyIcon />
        </button>
    </div>
}

export function SeedSearch({ onSubmit }: SeedSearchOptionsProps) {
    const [soul, setSoul] = useState<boolean>(false);
    const [legendary, setLegendary] = useState<Legendary>(LEGENDARY_JOKERS[0]);
    const [deck, setDeck] = useState<Deck>(DECKS[0]);
    const [stake, setStake] = useState<Stake>(STAKES[0]);
    const [seeds, setSeeds] = useState<string[]>([]);
    const [stats, setStats] = useState<string>("");

    const [seedCount, setSeedCount] = useState<number>(1);
    const [timeoutSecs, setTimeoutSecs] = useState<number>(10);

    function processResult(result: SeedSearchResult) {
        console.log("RESULT", result);
        setStats(`Found ${result.seeds.length} seeds in ${Math.floor(result.totalTime)}ms${result.timedOut ? " (Timed out)" :""}`);
        setSeeds(result.seeds);
        return result;
    }

    function search() {
        const opts: SeedSearchOptions = {
            deck, soul, legendary, stake,
            timeoutSecs, seedCount, version: "10106",
            showman: false
        }
        
        const worker = new SeedFinderWorker();

        worker.onmessage = (e) => {
            console.log("Worker message received:", e);
            processResult(e.data);
        }

        worker.postMessage(opts);
    }

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

            <label htmlFor="seed-count">Seed count</label>
            <input type="number" name="seed-count" min="1" max="100" id="seed-count" value={seedCount} onChange={e => setSeedCount(Number(e.target.value))} />

            <label htmlFor="timeout">Timeout (seconds)</label>
            <input type="number" name="timeout" min="1" max="60" id="timeout" value={timeoutSecs} onChange={e => setTimeoutSecs(Number(e.target.value))} />

            <button className="span-row" onClick={search}>Find Seeds!</button>

            {seeds.map((seed, i) => (
                <SeedResult key={i} seed={seed} />
            ))}

            <div className="span-row">{stats}</div>
        </div>
    </div>;
}