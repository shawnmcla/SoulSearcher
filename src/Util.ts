import { type ImmolateInstance  } from "./Immolate";
// Removed invalid declaration or use: 
declare const inst: ImmolateInstance; // if you need a type-only declaration

const pseudorandom: Record<string, number> = {
    hashed_seed: pseudohash(inst.seed)
};


// JavaScript port of the pseudohash function
// as defined in the misc_functions.lua file of the game
export function pseudohash(str: string) {
  let num = 1;
  const PI = Math.PI;
  for (let i = str.length; i >= 1; i--) {
    const charCode = str.charCodeAt(i - 1);
    num = ((1.1239285023 / num) * charCode * PI + PI * i) % 1;
  }
  return num;
}


export function pseudoseed(key: string) {
  // If key is "seed", return a random float
  if (key === "seed") {
    return inst.random("");
  }

  // Initialize cache if needed
  if (!pseudorandom[key]) {
    pseudorandom[key] = pseudohash(key + (pseudorandom.seed || ""));
  }

  pseudorandom[key] = Math.abs(Number(((2.134453429141 + pseudorandom[key] * 1.72431234) % 1).toFixed(13)));
  return (pseudorandom[key] + (pseudorandom.hashed_seed || 0)) / 2;
}
