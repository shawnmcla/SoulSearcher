import './App.css';
import { type Deck, type Stake } from './Data';
import { SeedSearch } from './SeedSearch/SeedSearch';
import { LegendaryCriteria, type SeedSearchOptions, type SeedSearchResult } from './SeedFinder';
import SeedFinderWorker from "./SeedFinderWorker?worker";


function processResult(res: SeedSearchResult) {
  console.log("RESULT\n", res, "\nSEEDS FOUND\n", res.seeds.join("\n"));
}

function doTest() {
  const deck: Deck = "Red Deck";
  const stake: Stake = "White Stake";
  const timeoutSecs = 10;
  const seedCount = 1;

  const opts: SeedSearchOptions = {
    deck, stake,
    timeoutSecs, seedCount, version: "10106",
    showman: false,
    legendaryCriteria: new LegendaryCriteria(
      "Perkeo", "Round1Skip", undefined
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
function App() {
  const test = true;
  return (
    <>
      <h1>SoulSearcher</h1>
      {(
        test && <div>
          <h2>Test Mode</h2>
          <button onClick={() => doTest()}>Run Test</button>
        </div>
      ) || <SeedSearch />
      }
    </>
  )
}

export default App
