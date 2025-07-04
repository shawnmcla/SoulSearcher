
type ImmolateInstParams = {};
type PackInfo = {
    type: Pack,
    size: number,
    choices: number,
};

type CppVector<T> = {
    get(index: number): T;
    delete(): void;
}

type JokerInfo = {
    joker: string,
    rarity: string,
    edition?: Edition;
    stickers?: Partial<Record<Sticker, boolean>>;
}

type PlayingCard = {
    base: `${Suit}_${Rank}`,
    seal?: Seal,
    edition?: Edition,
    enhancement?: Enhancement,
    rank: Rank,
    suit: Suit,
}

type ImmolateInstance = {
    params: ImmolateInstParams;

    initLocks(ante: number, freshProfile: boolean, freshRun: boolean): void;
    lock(itemName: string): void;
    setStake(stakeName: Stake) : void;
    setDeck(deckName: Deck): void;
    initUnlocks(ante: number, freshProfile: boolean): void;
    unlock(itemName: string): void;

    nextBoss(ante: number): Boss;
    nextTag(ante: number): Tag;
    nextShopItem(ante: number): ShopItem;
    nextPack(ante: number): Pack;
    nextJoker(source: string, ante: number, hasStickers: boolean): JokerInfo;

    nextCelestialPack(size: number, ante: number): CppVector<Consumable>;
    nextArcanaPack(size: number, ante: number): CppVector<Consumable>;
    nextBuffoonPack(size: number, ante: number): CppVector<Joker>;
    nextStandardPack(size: number, ante: number): CppVector<PlayingCard>;

    delete(): void;
}

declare const Immolate: {
    Instance: new (seed: string) => ImmolateInstance;
    InstParams: new(deck: Deck, stake: Stake, tbd0: boolean, version: string) => ImmolateInstParams;
    packInfo: (packName: string) => PackInfo;
}