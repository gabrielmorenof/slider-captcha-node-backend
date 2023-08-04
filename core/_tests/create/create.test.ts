import { SliderPuzzle } from '../../create/create';
import * as path from 'path';

(async () => {
    try {
      const imageFileName = 'image1.jpg'; 
      const imagePath = path.join(__dirname, imageFileName);
      const slider_puzzle = await SliderPuzzle.new(imagePath);
  
      console.log('SOLUTION:' + JSON.stringify(slider_puzzle));
      console.log('x:', slider_puzzle.x);
      console.log('y:', slider_puzzle.y);
  
  
    } catch (error) {
      console.error('Erro durante o teste:', error);
    }
})();