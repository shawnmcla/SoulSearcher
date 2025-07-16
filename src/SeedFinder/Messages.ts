import type { SeedSearchOptions, SeedSearchResult } from "./SeedFinder";

export type WorkerReq =
    | { type: "FindSeed", options: SeedSearchOptions }
    | { type: "Stop" }
    | { type: "Kill" };

export type WorkerRes =
    | { type: "Seed", seed: string } 
    | { type: "Stopped" }
    | { type: "Done", results: SeedSearchResult }
    | { type: "Error", message: string }
    | { type: "Info", message: string }
    | { type: "Timeout", results: SeedSearchResult };
