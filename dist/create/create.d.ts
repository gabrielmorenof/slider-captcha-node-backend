export declare class SliderPuzzle {
    cropped_imageBase64: string;
    puzzle_pieceBase64: string;
    x: number;
    y: number;
    constructor(croppedImageBase64: string, puzzlePieceBase64: string, x: number, y: number);
    static randomPosition(maxX: number, maxY: number): {
        x: number;
        y: number;
    };
    static new(imagePath: string): Promise<SliderPuzzle>;
}
