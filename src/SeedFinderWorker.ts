/// <reference lib="webworker" />
import { findSeed, type SeedSearchOptions } from './SeedFinder';

import Immolate from './immolate';

self.onmessage = async (event: MessageEvent) => {
    const opts = event.data;
    const imm = await Immolate({
        locateFile(path: string) {
            if (path.endsWith('.wasm')) {
                return '/immolate.wasm';
            }
            return path;
        }
    });
    const result = findSeed(opts as SeedSearchOptions, imm);
    (self as DedicatedWorkerGlobalScope).postMessage(result);
};