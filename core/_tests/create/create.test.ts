import { SliderPuzzle } from '../../create/create';
import * as path from 'path';

(async () => {
    try {
      const imageFileName = 'image1.jpg'; 
      const imagePath = path.join(__dirname, imageFileName);
      const slider_puzzle = await SliderPuzzle.new(imagePath);
  
      console.log('SOLUTION:' + JSON.stringify(slider_puzzle));
  
  
    } catch (error) {
      console.error('Erro durante o teste:', error);
    }
})();