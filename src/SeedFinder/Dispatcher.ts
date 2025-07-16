import { type SeedSearchOptions } from './SeedFinder';
import type { WorkerReq, WorkerRes } from './Messages';
import FinderWorker from './FinderWorker?worker';

const cores = navigator.hardwareConcurrency || 4;

class Dispatcher {
    private seeds: string[] = [];
    private workers: Worker[] = [];
    private running = false;

    constructor() {

    }

    private terminateWorkers() {
        for (const worker of this.workers) {
            worker.terminate();
        }
        this.running = false;
        this.workers.length = 0;
    }

    async cancel(): Promise<boolean> {
        return new Promise((resolve) => {
            if (!this.running) resolve(false);
            this.terminateWorkers();
            resolve(true);
        });
    }

    async dispatchSearch(opts: SeedSearchOptions, onSeedFound?: (seed: string) => void) {
        for (let i = 0; i < cores; i++) {
            const worker = new FinderWorker();
            worker.onmessage = (e) => {
                console.log("Dispatcher :: Message from worker: " + e.data);
                if (typeof e.data !== "object" || !e.data.type || typeof e.data.type !== "string") throw new Error("Dispatcher: Invalid message received");
                const msg = e.data as WorkerRes;
                switch (msg.type) {
                    case "Seed":
                        this.seeds.push(msg.seed);
                        if(onSeedFound) onSeedFound(msg.seed);
                        break;
                    default:
                        throw new Error("Unhandled worker response type: " + msg.type);
                }
            }
            worker.onerror = (e) => {
                console.error("Dispatcher :: Error: " + e);
            }
            const msg: WorkerReq = { type: "FindSeed", options: opts };
            this.workers.push(worker);
            worker.postMessage(msg);
            console.log(worker);
        }
    }

    async findSeeds(opts: SeedSearchOptions, seedCount: number = 1, onSeedFound?: (seed: string) => void): Promise<string[]> {
        return new Promise((resolve, reject) => {
            if (this.running) {
                reject("Already running, cancel first");
            } else {
                this.running = true;
                this.seeds.length = 0;
                const start = performance.now();
                const timeoutMs = opts.timeoutSecs * 1000;
                this.dispatchSearch(opts, onSeedFound);

                const interval = setInterval(
                    () => {
                        if (!this.running) {
                            console.debug("Dispacher: Done running");
                            clearInterval(interval);
                            this.terminateWorkers();
                            return resolve(this.seeds.slice(0, seedCount));
                        }
                        else if (performance.now() - start >= timeoutMs) {
                            console.debug("Dispatcher: Timeout, stopping");
                            this.running = false;
                        } else if(this.seeds.length >= seedCount) {
                            console.debug("Dispatcher: Target seed count reached");
                            this.running = false;
                        }
                    }, 10
                );
            }
        });
    }
}

export const SearchDispatcher = new Dispatcher();