export class SliderCaptchaDTO {
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
}