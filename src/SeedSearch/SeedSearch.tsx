import { useState } from "react";
import Picker from "../Picker";
import { DECKS, EDITIONS, LEGENDARY_JOKERS, STAKES, type Deck, type Edition, type Legendary, type Stake, type Voucher } from "../Data";
import { LegendaryCriteria, LegendarySources, type LegendarySource, type SeedSearchOptions, type SeedSearchResult } from "../SeedFinder";

import SeedFinderWorker from "../SeedFinderWorker?worker";
import { RevealContainer } from "../Components/RevealContainer";
import Modal from "../Components/Modal";

const Decks = [...DECKS];
const Editions = Object.keys(EDITIONS) as Edition[];
const Legendaries = [...LEGENDARY_JOKERS];
const Stakes = [...STAKES];
const Tier1Vouchers: Voucher[] = [
    "Overstock",
    "Clearance Sale",
    "Hone",
    "Reroll Surplus",
    "Crystal Ball",
    "Telescope",
    "Grabber",
    "Wasteful",
    "Tarot Merchant",
    "Planet Merchant",
    "Seed Money",
    "Blank",
    "Magic Trick",
    "Hieroglyph",
    "Director's Cut",
    "Paint Brush"
];

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

function legendarySourceStr(src: LegendarySource) {
    switch (src) {
        case "Any":
            return "Any";
        case "Round1Skip":
            return "Round 1 skip";
        default:
            throw new Error(`Invalid legendary source: ${src}`)
    }
}

function VoucherSearch() {
    const [voucher, setVoucher] = useState<Voucher>(Tier1Vouchers[0]);

    return <div className="row">
        <label>Voucher</label>
        <Picker onChange={e => setVoucher(e.target.value as Voucher)}
            options={Tier1Vouchers}
            value={voucher} />
    </div>
}

type LegendarySearchOpts = { legendary: Legendary, source: LegendarySource, findEdition: boolean, edition?: Edition };
const DefaultLegendarySearchOpts = {
    legendary: Legendaries[0],
    source: LegendarySources[0],
    findEdition: false,
    edition: Editions[0],
};

function LegendarySearch({ onChange }: { onChange: (opts: LegendarySearchOpts) => void }) {
    const [opts, setOpts] = useState<LegendarySearchOpts>(DefaultLegendarySearchOpts);

    function setSearchOpts(opts: LegendarySearchOpts) {
        setOpts(opts);
        onChange(opts);
    }

    return <>
        <div className="row">
            <label htmlFor="legendary">Legendary Joker</label>
            <Picker onChange={e => setSearchOpts({ ...opts, legendary: e.target.value as Legendary })}
                options={LEGENDARY_JOKERS}
                value={opts.legendary}
            />
        </div>

        <div className="row">
            <label htmlFor="legendarySrc">Legendary Source</label>
            <Picker onChange={e => setSearchOpts({ ...opts, source: e.target.value as LegendarySource })}
                options={LegendarySources}
                value={opts.source}
                displayFn={legendarySourceStr}
            />
        </div>

        <div className="row">
            <label htmlFor="edition">Specific Edition</label>
            <div>
                <input type="checkbox" name="edition" id="check_edition" checked={opts.findEdition} onChange={e => setSearchOpts({ ...opts, findEdition: e.target.checked })} />
            </div>
        </div>

        <RevealContainer active={opts.findEdition} className="row">
            <label htmlFor="legendaryEdition">Legendary Edition</label>
            <Picker onChange={e => setSearchOpts({ ...opts, edition: e.target.value as Edition })}
                options={Editions}
                value={opts.edition ?? ""}
            />
        </RevealContainer>
    </>
}

type AdvancedOptions = { parallelism: boolean, timeoutSecs: number };
function AdvancedOptions({ active, onSubmit }: { active: boolean, onSubmit: (opts: AdvancedOptions) => void }) {
    const [parallelism, setParallelism] = useState<boolean>(true);
    const [timeoutSecs, setTimeoutSecs] = useState<number>(10);

    function onModalClosed() {
        onSubmit({
            parallelism,
            timeoutSecs
        });
    }

    return <Modal onClose={onModalClosed} isOpen={active} showClose={false}>
        <div className="form">
            <div className="row">
                <h3 style={{ margin: 0 }}>Advanced Options</h3>
            </div>
            <div className="row">
                <label>Timeout (seconds)</label>
                <div>
                    <input type="number" name="timeout" min="1" max="60" id="timeout" value={timeoutSecs} onChange={e => setTimeoutSecs(Number(e.target.value))} />
                </div>
            </div>

            <div className="row">
                <label>Enable parallelism</label>
                <div>
                    <input type="checkbox" name="parallelism" id="parallelism" checked={parallelism} onChange={e => setParallelism(e.target.checked)} />
                </div>
            </div>

            <div className="row">
                <button onClick={() => onModalClosed()}>Save changes</button>
            </div>
        </div>
    </Modal>
}
export function SeedSearch() {
    // Basic options
    const [deck, setDeck] = useState<Deck>(Decks[0]);
    const [stake, setStake] = useState<Stake>(Stakes[0]);
    const [soul, setSoul] = useState<boolean>(false);
    const [legendaryOpts, setLegendaryOpts] = useState<LegendarySearchOpts>(DefaultLegendarySearchOpts)
    const [findVoucher, setFindVoucher] = useState<boolean>(false);
    const [seeds, setSeeds] = useState<string[]>([]);
    const [stats, setStats] = useState<string>("");
    const [seedCount, setSeedCount] = useState<number>(1);

    // Advanced options
    const [advanced, setAdvanced] = useState<boolean>(false);
    const [parallelism, setParallelism] = useState<boolean>(true);
    const [timeoutSecs, setTimeoutSecs] = useState<number>(10);

    function processResult(result: SeedSearchResult) {
        setStats(`Found ${result.seeds.length} seeds in ${Math.floor(result.totalTime)}ms${result.timedOut ? " (Timed out)" : ""}`);
        setSeeds(result.seeds);
        return result;
    }

    function search() {
        const opts: SeedSearchOptions = {
            deck, stake,
            timeoutSecs, seedCount, version: "10106",
            showman: false,
            legendaryCriteria: new LegendaryCriteria(
                legendaryOpts.legendary, legendaryOpts.source, legendaryOpts.findEdition ? legendaryOpts.edition : undefined
            )
        }

        const cores = navigator.hardwareConcurrency;
        const aggregatedResults: SeedSearchResult = {
            seeds: [],
            timedOut: false,
            totalTime: 0,
        };

        let done = 0;
        function workerDone(i: number, data: SeedSearchResult) {
            done++;
            aggregatedResults.seeds.push(...data.seeds);
            if (data.timedOut) aggregatedResults.timedOut = true;
            aggregatedResults.totalTime = Math.max(aggregatedResults.totalTime, data.totalTime);
            console.debug(`Worker id ${i} complete`);
            if (done === cores) {
                console.debug("All done!");
                processResult(aggregatedResults);
            }

        }
        for (let i = 0; i < cores; i++) {
            const worker = new SeedFinderWorker();

            worker.onmessage = (e) => {
                console.log("Worker message received:", e);
                workerDone(i, e.data);
                worker.terminate();
            }

            worker.postMessage(opts);
        }

    }

    return <div>
        <h2>Seed Search Options</h2>
        <div className="form">
            <div className="row">
                <label htmlFor="Deck">Deck</label>
                <div>
                    <Picker options={[...DECKS]} value={deck} onChange={e => setDeck(e.target.value as Deck)} />
                </div>
            </div>

            <div className="row">
                <label htmlFor="Stake">Stake</label>
                <div>
                    <Picker options={[...STAKES]} value={stake} onChange={e => setStake(e.target.value as Stake)} />
                </div>
            </div>

            <div className="row">
                <label htmlFor="soul">The Soul</label>
                <div>
                    <input type="checkbox" name="soul" id="check_soul" checked={soul} onChange={e => setSoul(e.target.checked)} />
                </div>
            </div>

            <RevealContainer className="form" active={soul}>
                <LegendarySearch onChange={o => setLegendaryOpts(o)} />
            </RevealContainer>

            <div className="row">
                <label htmlFor="soul">Ante 1 Voucher</label>
                <div>
                    <input type="checkbox" name="soul" id="check_soul" checked={findVoucher} onChange={e => setFindVoucher(e.target.checked)} />
                </div>
            </div>


            <RevealContainer className="form" active={findVoucher}>
                <VoucherSearch />
            </RevealContainer>

            <div className="row">
                <label htmlFor="seed-count">Seed count</label>
                <div>
                    <input type="number" name="seed-count" min="1" max="100" id="seed-count" value={seedCount} onChange={e => setSeedCount(Number(e.target.value))} />
                </div>
            </div>

            <div className="row">
                <button onClick={search}>Find Seeds!</button>
            </div>

            <div className="results">
                {seeds.map((seed, i) => (
                    <div className="row">
                        <SeedResult key={i} seed={seed} />
                    </div>
                ))}
            </div>

            <div className="row">
                <button style={{ fontSize: "0.75em", background: "rgb(50, 50, 50    )" }} onClick={() => setAdvanced(true)} >Advanced options</button>
            </div>

            <div className="row">{`Timeout: ${timeoutSecs} | Parallelism?: ${parallelism}`} | {stats}</div>
        </div>

        <AdvancedOptions active={advanced} onSubmit={(opts) => {
            setParallelism(opts.parallelism);
            setTimeoutSecs(opts.timeoutSecs);
            setAdvanced(false);
        }} />

    </div>;
}