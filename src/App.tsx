import { useState } from 'react'
import './App.css'
import Picker from './Picker';
import { DECKS, STAKES, type Deck, type Stake } from './Data';
import { SeedSearch, type SeedSearchOptions } from './SeedSearch';
import { findSeed } from './SeedFinder';

function App() {
  const [seed, setSeed] = useState("HFWMNI21");
  const [maxAnte, setMaxAnte] = useState(8);
  const [deck, setDeck] = useState<Deck>(DECKS[0]);
  const [stake, setStake] = useState<Stake>(STAKES[0]);

  const [searchOpts, setSearchopts] = useState<SeedSearchOptions | null>(null);

  return (
    <>
      <h1>SoulSearcher</h1>
      <SeedSearch onSubmit={opts => setSearchopts(opts)} />

      {/* <div className='form'>
        <label htmlFor="seed">Seed</label>
        <input
          type="text"
          name="seed"
          id="seed"
          value={seed}
          pattern="^[A-Za-z0-9]{0-8}$"
          title="Seed must be 8 characters long, using uppercase letters and numbers only."
          maxLength={8}
          autoComplete="off"
          onChange={e => setSeed(e.target.value.toUpperCase())}
        />

        <label htmlFor="maxAnte">Max Ante</label>
        <input type="number" min="1" max="39" id="maxAnte" value={maxAnte} onChange={e => setMaxAnte(Number(e.target.value))} />

        <label htmlFor="Deck">Deck</label>
        <Picker options={[...DECKS]} value={deck} onChange={e => setDeck(e.target.value as Deck)} />

        <label htmlFor="Stake">Stake</label>
        <Picker options={[...STAKES]} value={stake} onChange={e => setStake(e.target.value as Stake)} />

      </div> */}
    </>
  )
}

export default App
