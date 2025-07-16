/// <reference lib="webworker" />
import { findSeed } from './SeedFinder';
import type { WorkerReq, WorkerRes } from './Messages';

import Immolate from '../immolate';

self.onmessage = async (e: MessageEvent<WorkerReq>) => {
    const req = e.data;
    if (req.type === "FindSeed") {
        const imm = await Immolate({
            locateFile(path: string) {
                if (path.endsWith('.wasm')) {
                    return '/immolate.wasm';
                }
                return path;
            }
        });

        while (true) {
            const res = findSeed(req.options, imm);
            postMessage({ type: "Seed", seed: res } as WorkerRes);
        }
    } else {
        throw new Error("SeedFinderWorker: Received invalid message type");
    }
};