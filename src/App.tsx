import { useState } from 'react'
import './App.css'
import Picker from './Picker';
import { DECKS, STAKES, type Deck, type Stake } from './Data';
import Card from './Card';

function App() {
  const [seed, setSeed] = useState("HFWMNI21");
  const [maxAnte, setMaxAnte] = useState(8);
  const [deck, setDeck] = useState<Deck>(DECKS[0]);
  const [stake, setStake] = useState<Stake>(STAKES[0]);
  const [cardsPerAnte, setCardsPerAnte] = useState<number[]>([15, 50, 50, 50, 50, 50, 50, 50]);

  return (
    <>
      <h1>SoulSearcher</h1>
      <h2>Options</h2>
      <div className='form'>

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

        <label htmlFor="cardsPerAnte">Cards Per Ante</label>
        <input type="text" />

        <label htmlFor="Deck">Deck</label>
        <Picker options={[...DECKS]} value={deck} onChange={e => setDeck(e.target.value as Deck)} />

        <label htmlFor="Stake">Stake</label>
        <Picker options={[...STAKES]} value={stake} onChange={e => setStake(e.target.value as Stake)} />

      </div>

      <Card name='Canio' type='joker' />
      <div style={{ position: "absolute", bottom: 0, left: 0, textAlign: 'left' }}>Summary: Seed: {seed} | Max Ante: {maxAnte} | Deck: {deck} | Stake: {stake}</div>
    </>
  )
}

export default App
