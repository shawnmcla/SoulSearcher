import './App.css';
import { type Deck, type Stake } from './Data';
import { SeedSearch } from './Components/SeedSearch';
import { LegendaryCriteria, type SeedSearchOptions, type SeedSearchResult } from './SeedFinder/SeedFinder';
import { SearchDispatcher } from './SeedFinder/Dispatcher';

async function doTest() {
  try {
    const seeds = await SearchDispatcher.findSeeds({deck: "Red Deck", stake: "White Stake", showman: false, timeoutSecs: 20, version: "10106", 
      legendaryCriteria: new LegendaryCriteria("Perkeo", "Round1Skip", "Negative")}, 10);
      console.log("DONE", seeds);
  }catch(e) {
    console.error("ERROR", e);
  }
  
}

function App() {
  const test = false;
  return (
    <>
      <h1>SoulSearcher</h1>
      {(
        test && <div>
          <h2>Test Mode</h2>
          <button onClick={() => doTest()}>Run Test</button>
          <button onClick={() => {
            SearchDispatcher.cancel().then((success: boolean) => console.log(success ? "Stopped" : "Could not stop")).catch(() => console.error("Error stopping"));
          }}>STOP</button>
        </div>
      ) || <SeedSearch />
      }
    </>
  )
}

export default App
