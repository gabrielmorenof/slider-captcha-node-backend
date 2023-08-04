"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliderPuzzle = void 0;
const image_js_1 = require("image-js");
const crypto_1 = require("crypto");
class SliderPuzzle {
    constructor(croppedImageBase64, puzzlePieceBase64, x, y) {
        this.cropped_imageBase64 = croppedImageBase64;
        this.puzzle_pieceBase64 = puzzlePieceBase64;
        this.x = x;
        this.y = y;
    }
    static randomPosition(maxX, maxY) {
        return {
            x: (0, crypto_1.randomInt)(0, maxX),
            y: (0, crypto_1.randomInt)(0, maxY),
        };
    }
    static new(imagePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input_image = yield image_js_1.Image.load(imagePath);
                const { width, height } = input_image;
                // Define o tamanho da peça do quebra-cabeça
                const pieceWidth = Math.floor(width / 5);
                const pieceHeight = Math.floor(height / 5);
                // Escolhe uma posição aleatória para a peça do quebra-cabeça
                const { x, y } = SliderPuzzle.randomPosition(width - pieceWidth, height - pieceHeight);
                // Cria a imagem da peça do quebra-cabeça
                const puzzle_piece = input_image.crop({ x, y, width: pieceWidth, height: pieceHeight });
                // Cria a imagem recortada sem a peça do quebra-cabeça
                const cropped_image = input_image.clone();
                // Salvar imagem da peça do quebra-cabeça em base64
                const puzzlePieceBase64 = yield puzzle_piece.toDataURL('image/png');
                // Gerar a imagem recortada com um buraco em base64
                const croppedImageWithHole = cropped_image.clone();
                for (let iy = y; iy < y + pieceHeight; iy++) {
                    for (let ix = x; ix < x + pieceWidth; ix++) {
                        const index = iy * croppedImageWithHole.width + ix;
                        croppedImageWithHole.setPixel(index, [0, 0, 0, 0]); // Cor branca para o buraco
                    }
                }
                const croppedImageBase64 = yield croppedImageWithHole.toDataURL('image/png');
                return new SliderPuzzle(croppedImageBase64, puzzlePieceBase64, x, y);
            }
            catch (error) {
                throw new Error(`Erro ao criar o quebra-cabeça: ${error}`);
            }
        });
    }
}
exports.SliderPuzzle = SliderPuzzle;
