export type CardType = "joker" | "tarot" | "planet";

export const DECKS = [
    "Red Deck",
    "Blue Deck",
    "Yellow Deck",
    "Green Deck",
    "Black Deck",
    "Magic Deck",
    "Nebula Deck",
    "Ghost Deck",
    "Abandoned Deck",
    "Checkered Deck",
    "Zodiac Deck",
    "Painted Deck",
    "Anaglyph Deck",
    "Plasma Deck",
    "Erratic Deck",
] as const;

export type Deck = typeof DECKS[number];

export const STAKES = [
    "White Stake",
    "Red Stake",
    "Green Stake",
    "Black Stake",
    "Blue Stake",
    "Purple Stake",
    "Orange Stake",
    "Gold Stake",
] as const;

export type Stake = typeof STAKES[number];

export const JOKERS = [
    { "name": "Joker", "pos": { "x": 0, "y": 0 } }, { "name": "Greedy Joker", "pos": { "x": 6, "y": 1 } }, { "name": "Lusty Joker", "pos": { "x": 7, "y": 1 } }, { "name": "Wrathful Joker", "pos": { "x": 8, "y": 1 } }, { "name": "Gluttonous Joker", "pos": { "x": 9, "y": 1 } }, { "name": "Jolly Joker", "pos": { "x": 2, "y": 0 } }, { "name": "Zany Joker", "pos": { "x": 3, "y": 0 } }, { "name": "Mad Joker", "pos": { "x": 4, "y": 0 } }, { "name": "Crazy Joker", "pos": { "x": 5, "y": 0 } }, { "name": "Droll Joker", "pos": { "x": 6, "y": 0 } }, { "name": "Sly Joker", "pos": { "x": 0, "y": 14 } }, { "name": "Wily Joker", "pos": { "x": 1, "y": 14 } }, { "name": "Clever Joker", "pos": { "x": 2, "y": 14 } }, { "name": "Devious Joker", "pos": { "x": 3, "y": 14 } }, { "name": "Crafty Joker", "pos": { "x": 4, "y": 14 } }, { "name": "Half Joker", "pos": { "x": 7, "y": 0 } }, { "name": "Joker Stencil", "pos": { "x": 2, "y": 5 } }, { "name": "Four Fingers", "pos": { "x": 6, "y": 6 } }, { "name": "Mime", "pos": { "x": 4, "y": 1 } }, { "name": "Credit Card", "pos": { "x": 5, "y": 1 } }, { "name": "Ceremonial Dagger", "pos": { "x": 5, "y": 5 } }, { "name": "Banner", "pos": { "x": 1, "y": 2 } }, { "name": "Mystic Summit", "pos": { "x": 2, "y": 2 } }, { "name": "Marble Joker", "pos": { "x": 3, "y": 2 } }, { "name": "Loyalty Card", "pos": { "x": 4, "y": 2 } }, { "name": "8 Ball", "pos": { "x": 0, "y": 5 } }, { "name": "Misprint", "pos": { "x": 6, "y": 2 } }, { "name": "Dusk", "pos": { "x": 4, "y": 7 } }, { "name": "Raised Fist", "pos": { "x": 8, "y": 2 } }, { "name": "Chaos the Clown", "pos": { "x": 1, "y": 0 } }, { "name": "Fibonacci", "pos": { "x": 1, "y": 5 } }, { "name": "Steel Joker", "pos": { "x": 7, "y": 2 } }, { "name": "Scary Face", "pos": { "x": 2, "y": 3 } }, { "name": "Abstract Joker", "pos": { "x": 3, "y": 3 } }, { "name": "Delayed Gratification", "pos": { "x": 4, "y": 3 } }, { "name": "Hack", "pos": { "x": 5, "y": 2 } }, { "name": "Pareidolia", "pos": { "x": 6, "y": 3 } }, { "name": "Gros Michel", "pos": { "x": 7, "y": 6 } }, { "name": "Even Steven", "pos": { "x": 8, "y": 3 } }, { "name": "Odd Todd", "pos": { "x": 9, "y": 3 } }, { "name": "Scholar", "pos": { "x": 3, "y": 6 } }, { "name": "Business Card", "pos": { "x": 1, "y": 4 } }, { "name": "Supernova", "pos": { "x": 2, "y": 4 } }, { "name": "Ride the Bus", "pos": { "x": 1, "y": 6 } }, { "name": "Space Joker", "pos": { "x": 3, "y": 5 } }, { "name": "Egg", "pos": { "x": 0, "y": 10 } }, { "name": "Burglar", "pos": { "x": 1, "y": 10 } }, { "name": "Blackboard", "pos": { "x": 2, "y": 10 } }, { "name": "Runner", "pos": { "x": 3, "y": 10 } }, { "name": "Ice Cream", "pos": { "x": 4, "y": 10 } }, { "name": "DNA", "pos": { "x": 5, "y": 10 } }, { "name": "Splash", "pos": { "x": 6, "y": 10 } }, { "name": "Blue Joker", "pos": { "x": 7, "y": 10 } }, { "name": "Sixth Sense", "pos": { "x": 8, "y": 10 } }, { "name": "Constellation", "pos": { "x": 9, "y": 10 } }, { "name": "Hiker", "pos": { "x": 0, "y": 11 } }, { "name": "Faceless Joker", "pos": { "x": 1, "y": 11 } }, { "name": "Green Joker", "pos": { "x": 2, "y": 11 } }, { "name": "Superposition", "pos": { "x": 3, "y": 11 } }, { "name": "To Do List", "pos": { "x": 4, "y": 11 } }, { "name": "Cavendish", "pos": { "x": 5, "y": 11 } }, { "name": "Card Sharp", "pos": { "x": 6, "y": 11 } }, { "name": "Red Card", "pos": { "x": 7, "y": 11 } }, { "name": "Madness", "pos": { "x": 8, "y": 11 } }, { "name": "Square Joker", "pos": { "x": 9, "y": 11 } }, { "name": "Seance", "pos": { "x": 0, "y": 12 } }, { "name": "Riff-raff", "pos": { "x": 1, "y": 12 } }, { "name": "Vampire", "pos": { "x": 2, "y": 12 } }, { "name": "Shortcut", "pos": { "x": 3, "y": 12 } }, { "name": "Hologram", "pos": { "x": 4, "y": 12 } }, { "name": "Vagabond", "pos": { "x": 5, "y": 12 } }, { "name": "Baron", "pos": { "x": 6, "y": 12 } }, { "name": "Cloud 9", "pos": { "x": 7, "y": 12 } }, { "name": "Rocket", "pos": { "x": 8, "y": 12 } }, { "name": "Obelisk", "pos": { "x": 9, "y": 12 } }, { "name": "Midas Mask", "pos": { "x": 0, "y": 13 } }, { "name": "Luchador", "pos": { "x": 1, "y": 13 } }, { "name": "Photograph", "pos": { "x": 2, "y": 13 } }, { "name": "Gift Card", "pos": { "x": 3, "y": 13 } }, { "name": "Turtle Bean", "pos": { "x": 4, "y": 13 } }, { "name": "Erosion", "pos": { "x": 5, "y": 13 } }, { "name": "Reserved Parking", "pos": { "x": 6, "y": 13 } }, { "name": "Mail In Rebate", "pos": { "x": 7, "y": 13 } }, { "name": "To the Moon", "pos": { "x": 8, "y": 13 } }, { "name": "Hallucination", "pos": { "x": 9, "y": 13 } }, { "name": "Fortune Teller", "pos": { "x": 7, "y": 5 } }, { "name": "Juggler", "pos": { "x": 0, "y": 1 } }, { "name": "Drunkard", "pos": { "x": 1, "y": 1 } }, { "name": "Stone Joker", "pos": { "x": 9, "y": 0 } }, { "name": "Golden Joker", "pos": { "x": 9, "y": 2 } }, { "name": "Lucky Cat", "pos": { "x": 5, "y": 14 } }, { "name": "Baseball Card", "pos": { "x": 6, "y": 14 } }, { "name": "Bull", "pos": { "x": 7, "y": 14 } }, { "name": "Diet Cola", "pos": { "x": 8, "y": 14 } }, { "name": "Trading Card", "pos": { "x": 9, "y": 14 } }, { "name": "Flash Card", "pos": { "x": 0, "y": 15 } }, { "name": "Popcorn", "pos": { "x": 1, "y": 15 } }, { "name": "Spare Trousers", "pos": { "x": 4, "y": 15 } }, { "name": "Ancient Joker", "pos": { "x": 7, "y": 15 } }, { "name": "Ramen", "pos": { "x": 2, "y": 15 } }, { "name": "Walkie Talkie", "pos": { "x": 8, "y": 15 } }, { "name": "Seltzer", "pos": { "x": 3, "y": 15 } }, { "name": "Castle", "pos": { "x": 9, "y": 15 } }, { "name": "Smiley Face", "pos": { "x": 6, "y": 15 } }, { "name": "Campfire", "pos": { "x": 5, "y": 15 } }, { "name": "Golden Ticket", "pos": { "x": 5, "y": 3 } }, { "name": "Mr. Bones", "pos": { "x": 3, "y": 4 } }, { "name": "Acrobat", "pos": { "x": 2, "y": 1 } }, { "name": "Sock and Buskin", "pos": { "x": 3, "y": 1 } }, { "name": "Swashbuckler", "pos": { "x": 9, "y": 5 } }, { "name": "Troubadour", "pos": { "x": 0, "y": 2 } }, { "name": "Certificate", "pos": { "x": 8, "y": 8 } }, { "name": "Smeared Joker", "pos": { "x": 4, "y": 6 } }, { "name": "Throwback", "pos": { "x": 5, "y": 7 } }, { "name": "Hanging Chad", "pos": { "x": 9, "y": 6 } }, { "name": "Rough Gem", "pos": { "x": 9, "y": 7 } }, { "name": "Bloodstone", "pos": { "x": 0, "y": 8 } }, { "name": "Arrowhead", "pos": { "x": 1, "y": 8 } }, { "name": "Onyx Agate", "pos": { "x": 2, "y": 8 } }, { "name": "Glass Joker", "pos": { "x": 1, "y": 3 } }, { "name": "Showman", "pos": { "x": 6, "y": 5 } }, { "name": "Flower Pot", "pos": { "x": 0, "y": 6 } }, { "name": "Blueprint", "pos": { "x": 0, "y": 3 } }, { "name": "Wee Joker", "pos": { "x": 0, "y": 4 } }, { "name": "Merry Andy", "pos": { "x": 8, "y": 0 } }, { "name": "Oops! All 6s", "pos": { "x": 5, "y": 6 } }, { "name": "The Idol", "pos": { "x": 6, "y": 7 } }, { "name": "Seeing Double", "pos": { "x": 4, "y": 4 } }, { "name": "Matador", "pos": { "x": 4, "y": 5 } }, { "name": "Hit the Road", "pos": { "x": 8, "y": 5 } }, { "name": "The Duo", "pos": { "x": 5, "y": 4 } }, { "name": "The Trio", "pos": { "x": 6, "y": 4 } }, { "name": "The Family", "pos": { "x": 7, "y": 4 } }, { "name": "The Order", "pos": { "x": 8, "y": 4 } }, { "name": "The Tribe", "pos": { "x": 9, "y": 4 } }, { "name": "Stuntman", "pos": { "x": 8, "y": 6 } }, { "name": "Invisible Joker", "pos": { "x": 1, "y": 7 } }, { "name": "Brainstorm", "pos": { "x": 7, "y": 7 } }, { "name": "Satellite", "pos": { "x": 8, "y": 7 } }, { "name": "Shoot the Moon", "pos": { "x": 2, "y": 6 } }, { "name": "Drivers License", "pos": { "x": 0, "y": 7 } }, { "name": "Cartomancer", "pos": { "x": 7, "y": 3 } }, { "name": "Astronomer", "pos": { "x": 2, "y": 7 } }, { "name": "Burnt Joker", "pos": { "x": 3, "y": 7 } }, { "name": "Bootstraps", "pos": { "x": 9, "y": 8 } }, { "name": "Canio", "pos": { "x": 3, "y": 8 } }, { "name": "Triboulet", "pos": { "x": 4, "y": 8 } }, { "name": "Yorick", "pos": { "x": 5, "y": 8 } }, { "name": "Chicot", "pos": { "x": 6, "y": 8 } }, { "name": "Perkeo", "pos": { "x": 7, "y": 8 } }
] as const;

export const LEGENDARY_JOKERS = [
    "Perkeo",
    "Triboulet",
    "Chicot",
    "Canio",
    "Yorick"
];

export type Legendary = typeof LEGENDARY_JOKERS[number];

export const LAYERED_CARDS = [
    "Canio",
    "Perkeo",
    "Triboulet",
    "Chicot",
    "Yorick",

    "The Soul",
];

export type Joker = typeof JOKERS[number]['name'];

export const CONSUMABLES = [
    { "name": "The Fool", "pos": { "x": 0, "y": 0 } }, { "name": "The Magician", "pos": { "x": 1, "y": 0 } }, { "name": "The High Priestess", "pos": { "x": 2, "y": 0 } }, { "name": "The Empress", "pos": { "x": 3, "y": 0 } }, { "name": "The Emperor", "pos": { "x": 4, "y": 0 } }, { "name": "The Hierophant", "pos": { "x": 5, "y": 0 } }, { "name": "The Lovers", "pos": { "x": 6, "y": 0 } }, { "name": "The Chariot", "pos": { "x": 7, "y": 0 } }, { "name": "Justice", "pos": { "x": 8, "y": 0 } }, { "name": "The Hermit", "pos": { "x": 9, "y": 0 } }, { "name": "The Wheel of Fortune", "pos": { "x": 0, "y": 1 } }, { "name": "Strength", "pos": { "x": 1, "y": 1 } }, { "name": "The Hanged Man", "pos": { "x": 2, "y": 1 } }, { "name": "Death", "pos": { "x": 3, "y": 1 } }, { "name": "Temperance", "pos": { "x": 4, "y": 1 } }, { "name": "The Devil", "pos": { "x": 5, "y": 1 } }, { "name": "The Tower", "pos": { "x": 6, "y": 1 } }, { "name": "The Star", "pos": { "x": 7, "y": 1 } }, { "name": "The Moon", "pos": { "x": 8, "y": 1 } }, { "name": "The Sun", "pos": { "x": 9, "y": 1 } }, { "name": "Judgement", "pos": { "x": 0, "y": 2 } }, { "name": "The World", "pos": { "x": 1, "y": 2 } }, { "name": "Mercury", "pos": { "x": 0, "y": 3 } }, { "name": "Venus", "pos": { "x": 1, "y": 3 } }, { "name": "Earth", "pos": { "x": 2, "y": 3 } }, { "name": "Mars", "pos": { "x": 3, "y": 3 } }, { "name": "Jupiter", "pos": { "x": 4, "y": 3 } }, { "name": "Saturn", "pos": { "x": 5, "y": 3 } }, { "name": "Uranus", "pos": { "x": 6, "y": 3 } }, { "name": "Neptune", "pos": { "x": 7, "y": 3 } }, { "name": "Pluto", "pos": { "x": 8, "y": 3 } }, { "name": "Planet X", "pos": { "x": 9, "y": 2 } }, { "name": "Ceres", "pos": { "x": 8, "y": 2 } }, { "name": "Eris", "pos": { "x": 3, "y": 2 } }, { "name": "Familiar", "pos": { "x": 0, "y": 4 } }, { "name": "Grim", "pos": { "x": 1, "y": 4 } }, { "name": "Incantation", "pos": { "x": 2, "y": 4 } }, { "name": "Talisman", "pos": { "x": 3, "y": 4 } }, { "name": "Aura", "pos": { "x": 4, "y": 4 } }, { "name": "Wraith", "pos": { "x": 5, "y": 4 } }, { "name": "Sigil", "pos": { "x": 6, "y": 4 } }, { "name": "Ouija", "pos": { "x": 7, "y": 4 } }, { "name": "Ectoplasm", "pos": { "x": 8, "y": 4 } }, { "name": "Immolate", "pos": { "x": 9, "y": 4 } }, { "name": "Ankh", "pos": { "x": 0, "y": 5 } }, { "name": "Deja Vu", "pos": { "x": 1, "y": 5 } }, { "name": "Hex", "pos": { "x": 2, "y": 5 } }, { "name": "Trance", "pos": { "x": 3, "y": 5 } }, { "name": "Medium", "pos": { "x": 4, "y": 5 } }, { "name": "Cryptid", "pos": { "x": 5, "y": 5 } }, { "name": "The Soul", "pos": { "x": 2, "y": 2 } }, { "name": "Black Hole", "pos": { "x": 9, "y": 3 } }
] as const;

export type Consumable = typeof CONSUMABLES[number]['name'];

export const TAGS = [
    { "name": "Uncommon Tag", "pos": { "x": 0, "y": 0 } }, { "name": "Rare Tag", "pos": { "x": 1, "y": 0 } }, { "name": "Negative Tag", "pos": { "x": 2, "y": 0 } }, { "name": "Foil Tag", "pos": { "x": 3, "y": 0 } }, { "name": "Holographic Tag", "pos": { "x": 0, "y": 1 } }, { "name": "Polychrome Tag", "pos": { "x": 1, "y": 1 } }, { "name": "Investment Tag", "pos": { "x": 2, "y": 1 } }, { "name": "Voucher Tag", "pos": { "x": 3, "y": 1 } }, { "name": "Boss Tag", "pos": { "x": 0, "y": 2 } }, { "name": "Standard Tag", "pos": { "x": 1, "y": 2 } }, { "name": "Charm Tag", "pos": { "x": 2, "y": 2 } }, { "name": "Meteor Tag", "pos": { "x": 3, "y": 2 } }, { "name": "Buffoon Tag", "pos": { "x": 4, "y": 2 } }, { "name": "Handy Tag", "pos": { "x": 1, "y": 3 } }, { "name": "Garbage Tag", "pos": { "x": 2, "y": 3 } }, { "name": "Ethereal Tag", "pos": { "x": 3, "y": 3 } }, { "name": "Coupon Tag", "pos": { "x": 4, "y": 0 } }, { "name": "Double Tag", "pos": { "x": 5, "y": 0 } }, { "name": "Juggle Tag", "pos": { "x": 5, "y": 1 } }, { "name": "D6 Tag", "pos": { "x": 5, "y": 3 } }, { "name": "Top-up Tag", "pos": { "x": 4, "y": 1 } }, { "name": "Speed Tag", "pos": { "x": 0, "y": 3 } }, { "name": "Orbital Tag", "pos": { "x": 5, "y": 2 } }, { "name": "Economy Tag", "pos": { "x": 4, "y": 3 } }
];

export type Tag = typeof TAGS[number]['name'];

export const VOUCHERS = [
    { "name": "Overstock", "pos": { "x": 0, "y": 0 } }, { "name": "Clearance Sale", "pos": { "x": 3, "y": 0 } }, { "name": "Hone", "pos": { "x": 4, "y": 0 } }, { "name": "Reroll Surplus", "pos": { "x": 0, "y": 2 } }, { "name": "Crystal Ball", "pos": { "x": 2, "y": 2 } }, { "name": "Telescope", "pos": { "x": 3, "y": 2 } }, { "name": "Grabber", "pos": { "x": 5, "y": 0 } }, { "name": "Wasteful", "pos": { "x": 6, "y": 0 } }, { "name": "Tarot Merchant", "pos": { "x": 1, "y": 0 } }, { "name": "Planet Merchant", "pos": { "x": 2, "y": 0 } }, { "name": "Seed Money", "pos": { "x": 1, "y": 2 } }, { "name": "Blank", "pos": { "x": 7, "y": 0 } }, { "name": "Magic Trick", "pos": { "x": 4, "y": 2 } }, { "name": "Hieroglyph", "pos": { "x": 5, "y": 2 } }, { "name": "Director's Cut", "pos": { "x": 6, "y": 2 } }, { "name": "Paint Brush", "pos": { "x": 7, "y": 2 } }, { "name": "Overstock Plus", "pos": { "x": 0, "y": 1 } }, { "name": "Liquidation", "pos": { "x": 3, "y": 1 } }, { "name": "Glow Up", "pos": { "x": 4, "y": 1 } }, { "name": "Reroll Glut", "pos": { "x": 0, "y": 3 } }, { "name": "Omen Globe", "pos": { "x": 2, "y": 3 } }, { "name": "Observatory", "pos": { "x": 3, "y": 3 } }, { "name": "Nacho Tong", "pos": { "x": 5, "y": 1 } }, { "name": "Recyclomancy", "pos": { "x": 6, "y": 1 } }, { "name": "Tarot Tycoon", "pos": { "x": 1, "y": 1 } }, { "name": "Planet Tycoon", "pos": { "x": 2, "y": 1 } }, { "name": "Money Tree", "pos": { "x": 1, "y": 3 } }, { "name": "Antimatter", "pos": { "x": 7, "y": 1 } }, { "name": "Illusion", "pos": { "x": 4, "y": 3 } }, { "name": "Petroglyph", "pos": { "x": 5, "y": 3 } }, { "name": "Retcon", "pos": { "x": 6, "y": 3 } }, { "name": "Palette", "pos": { "x": 7, "y": 3 } }
];

export type Voucher = typeof VOUCHERS[number]['name'];

export const BOSSES = [
    { "name": "Small Blind", "pos": { "x": 0, "y": 0 } }, { "name": "Big Blind", "pos": { "x": 0, "y": 1 } }, { "name": "The Ox", "pos": { "x": 0, "y": 2 } }, { "name": "The Hook", "pos": { "x": 0, "y": 7 } }, { "name": "The Mouth", "pos": { "x": 0, "y": 18 } }, { "name": "The Fish", "pos": { "x": 0, "y": 5 } }, { "name": "The Club", "pos": { "x": 0, "y": 4 } }, { "name": "The Manacle", "pos": { "x": 0, "y": 8 } }, { "name": "The Tooth", "pos": { "x": 0, "y": 22 } }, { "name": "The Wall", "pos": { "x": 0, "y": 9 } }, { "name": "The House", "pos": { "x": 0, "y": 3 } }, { "name": "The Mark", "pos": { "x": 0, "y": 23 } }, { "name": "Cerulean Bell", "pos": { "x": 0, "y": 26 } }, { "name": "The Wheel", "pos": { "x": 0, "y": 10 } }, { "name": "The Arm", "pos": { "x": 0, "y": 11 } }, { "name": "The Psychic", "pos": { "x": 0, "y": 12 } }, { "name": "The Goad", "pos": { "x": 0, "y": 13 } }, { "name": "The Water", "pos": { "x": 0, "y": 14 } }, { "name": "The Eye", "pos": { "x": 0, "y": 17 } }, { "name": "The Plant", "pos": { "x": 0, "y": 19 } }, { "name": "The Needle", "pos": { "x": 0, "y": 20 } }, { "name": "The Head", "pos": { "x": 0, "y": 21 } }, { "name": "Verdant Leaf", "pos": { "x": 0, "y": 28 } }, { "name": "Violet Vessel", "pos": { "x": 0, "y": 29 } }, { "name": "The Window", "pos": { "x": 0, "y": 6 } }, { "name": "The Serpent", "pos": { "x": 0, "y": 15 } }, { "name": "The Pillar", "pos": { "x": 0, "y": 16 } }, { "name": "The Flint", "pos": { "x": 0, "y": 24 } }, { "name": "Amber Acorn", "pos": { "x": 0, "y": 27 } }, { "name": "Crimson Heart", "pos": { "x": 0, "y": 25 } }
];

export type Boss = typeof BOSSES[number]['name'];

export const EDITIONS = {
    "Foil": 1,
    "Holographic": 2,
    "Polychrome": 3,
    "Negative": 4,
} as const;

export type Edition = keyof typeof EDITIONS;

export const STICKERS = {
    "Eternal": { x: 0, y: 0 },
    "Perishable": { x: 0, y: 2 },
    "Rental": { x: 1, y: 2 }
} as const;

export type Sticker = keyof typeof STICKERS;

export const PACKS = [
    "Arcana Pack",
    "Jumbo Arcana Pack",
    "Mega Arcana Pack",
    "Celestial Pack",
    "Jumbo Celestial Pack",
    "Mega Celestial Pack",
    "Standard Pack",
    "Jumbo Standard Pack",
    "Mega Standard Pack",
    "Buffoon Pack",
    "Jumbo Buffoon Pack",
    "Mega Buffoon Pack",
    "Spectral Pack",
    "Jumbo Spectral Pack",
    "Mega Spectral Pack",
] as const;

export type Pack = typeof PACKS[number];

export const SEALS = [
    "Gold Seal",
    "Purple Seal",
    "Red Seal",
    "Blue Seal",
] as const;

export type Seal = typeof SEALS[number];

export const ENHANCEMENTS = [
    "Polychrome",
    "Holographic",
    "Foil"
] as const;

export type Enhancement = typeof ENHANCEMENTS[number];

export const RANKS = [
    "A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"
] as const;

export type Rank = typeof RANKS[number];

export const SUITS = [
    "C", "D", "H", "S"
] as const;

export type Suit = typeof SUITS[number];

export type ShopItem = Exclude<Joker, Legendary> | Consumable;