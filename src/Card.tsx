import { useEffect, useRef } from 'react';

import { JOKERS, CONSUMABLES, EDITIONS, STICKERS, type Edition, type Sticker, type CardType, LAYERED_JOKERS } from './Data';

function maskToCanvas(canvas: HTMLCanvasElement, itemName: string, type: CardType, itemModifiers: Edition[], itemStickers: Sticker[]) {
    let itemData;
    let imgSrc;
    let gridWidth;
    let gridHeight;

    if (type === 'joker') {
        itemData = JOKERS.find(j => j.name === itemName);
        imgSrc = 'images/Jokers.png';
        gridWidth = 10;
        gridHeight = 16;
    } else if (type === 'tarot' || type === 'planet') {
        itemData = CONSUMABLES.find(t => t.name === itemName);
        imgSrc = 'images/Tarots.png';
        gridWidth = 10;
        gridHeight = 6;
    } else {
        throw new Error(`Unexpected type: ${type}`);
    }

    if (!itemData) {
        console.error(`${type.charAt(0).toUpperCase() + type.slice(1)} not found:`, itemName);
        return;
    }

    const imageWidth = imgSrc.includes('Jokers.png') ? 710 : 710; // Width of your images
    const imageHeight = imgSrc.includes('Jokers.png') ? 1520 : 570; // Height of your images

    const itemWidth = imageWidth / gridWidth;
    const itemHeight = imageHeight / gridHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("Unable to retrieve 2D Rendering context from Canvas");

    const img = new Image();
    img.src = imgSrc;
    img.onload = function () {
        ctx.drawImage(
            img,
            itemData.pos.x * itemWidth,
            itemData.pos.y * itemHeight,
            itemWidth,
            itemHeight,
            0,
            0,
            canvas.width,
            canvas.height
        );

        if(LAYERED_JOKERS.includes(itemName)){
            overlayCard(ctx, canvas, itemName);
        }
        
        const overlayModifier = itemModifiers.find(mod => (["Foil", "Holographic", "Polychrome"]).includes(mod));
        if (overlayModifier) {
            overlayEdition(ctx, canvas, EDITIONS[overlayModifier]);
        }

        itemStickers.forEach(stick => {
            if (STICKERS[stick]) {
                overlaySticker(ctx, canvas, STICKERS[stick]);
            }
        });

        if (itemModifiers.includes("Negative")) {
            canvas.style.filter = 'invert(0.8)';
        }
    };
}


function overlaySticker(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, position: { x: number, y: number }) {
    const stickerImg = new Image();
    stickerImg.src = 'images/stickers.png';
    stickerImg.onload = function () {
        const stickerWidth = stickerImg.width / 5;
        const stickerHeight = stickerImg.height / 3;

        ctx.drawImage(
            stickerImg,
            position.x * stickerWidth,
            position.y * stickerHeight,
            stickerWidth,
            stickerHeight,
            0,
            0,
            canvas.width,
            canvas.height
        );
    };
}

function overlayCard(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, cardName: string) {
    if(!LAYERED_JOKERS.includes(cardName)) {
        throw new Error(`overlayCard called with a non-overlayable card name: ${cardName}`);
    }

    const joker = JOKERS.find(j => j.name === cardName);
    if(joker) {
        const overlayImg = new Image();
        overlayImg.src = 'images/Jokers.png';
        overlayImg.onload = function() {
            const overlayWidth = overlayImg.width / 10;
            const overlayHeight = overlayImg.height / 16;

            ctx.drawImage(
                overlayImg,
                joker.pos.x * overlayWidth,
                (joker.pos.y + 1) * overlayHeight,
                overlayWidth,
                overlayHeight,
                0,
                0,
                canvas.width,
                canvas.height
            );
        }
    }
}

function overlayEdition(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, index: number) {
    const editionImg = new Image();
    editionImg.src = 'images/Editions.png';
    editionImg.onload = function () {
        const editionWidth = editionImg.width / 5;
        const editionHeight = editionImg.height;

        ctx.drawImage(
            editionImg,
            index * editionWidth,
            0,
            editionWidth,
            editionHeight,
            0,
            0,
            canvas.width,
            canvas.height
        );
    };
}

export interface CardComponentProps {
    name: string,
    type: CardType,
};

function Card({ name, type }: CardComponentProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Pass the canvas to your function
        maskToCanvas(canvas, name, type, [], []);

        // Optional: clean up
        return () => {
            // Any teardown logic
        };
    }, [name, type]);

    return (
        <div className="card">
            <canvas
                ref={canvasRef}
                style={{ border: "1px solid black" }}
            />
        </div>
    );
    return (
        <div className="card">
            <canvas></canvas>
        </div>
    );
};

export default Card;