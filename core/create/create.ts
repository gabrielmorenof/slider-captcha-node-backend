import { Image } from 'image-js';
import { randomInt } from 'crypto';

export class SliderPuzzle {
  public cropped_imageBase64: string;
  public puzzle_pieceBase64: string;
  public x: number;
  public y: number;

  constructor(croppedImageBase64: string, puzzlePieceBase64: string, x: number, y: number) {
    this.cropped_imageBase64 = croppedImageBase64;
    this.puzzle_pieceBase64 = puzzlePieceBase64;
    this.x = x;
    this.y = y;
  }

  static randomPosition(maxX: number, maxY: number): { x: number; y: number } {
    return {
      x: randomInt(0, maxX),
      y: randomInt(0, maxY),
    };
  }

  static async new(imagePath: string): Promise<SliderPuzzle> {
    try {
      const input_image = await Image.load(imagePath);
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
      const puzzlePieceBase64 = await puzzle_piece.toDataURL('image/png');

      // Gerar a imagem recortada com um buraco em base64
      const croppedImageWithHole = cropped_image.clone();
      for (let iy = y; iy < y + pieceHeight; iy++) {
        for (let ix = x; ix < x + pieceWidth; ix++) {
          const index = iy * croppedImageWithHole.width + ix;
          croppedImageWithHole.setPixel(index, [0, 0, 0, 0]); // Cor branca para o buraco
        }
      }
      const croppedImageBase64 = await croppedImageWithHole.toDataURL('image/png');

      return new SliderPuzzle(croppedImageBase64, puzzlePieceBase64, x, y);
    } catch (error) {
      throw new Error(`Erro ao criar o quebra-cabeça: ${error}`);
    }
  }
}
