# Slider Puzzle Lib

Slider Puzzle Lib is a TypeScript library designed to generate slider captcha images on the server-side. Inspired by the idea of [BrianTV98](https://github.com/BrianTV98), this library allows developers to create custom slider puzzles, commonly used in captcha challenges, using TypeScript.

## Features

- Generate slider puzzle images with missing puzzle pieces in a customizable pattern.
- Export the cropped image with a hole where the puzzle piece is removed, and the isolated puzzle piece as base64 strings.
- Easy-to-use API to create slider puzzles with a simple function call.
- Built with TypeScript for improved type safety and code maintainability.

## Installation

To install Slider Puzzle Lib, you can use npm:

```bash
npm install slider-puzzle-lib

```
```
import { SliderPuzzle } from 'slider-puzzle-lib';

async function generatePuzzle(imageBase64: string) {
  const sliderPuzzle = new SliderPuzzle({ imageBase64 });
  const { cropped_puzzle, puzzle_piece, x, y } = await sliderPuzzle.createSliderPuzzle();

  // Use the generated slider puzzle components
  console.log('Cropped Puzzle:', cropped_puzzle);
  console.log('Puzzle Piece:', puzzle_piece);
  console.log('x:', x);
  console.log('y:', y);
}

const imageBase64 = '...'; // Base64 of the image you want to use
generatePuzzle(imageBase64);
```

License
Slider Puzzle Lib is licensed under the MIT License. See the LICENSE file for details.