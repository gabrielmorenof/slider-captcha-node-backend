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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliderPuzzle = void 0;
var image_js_1 = require("image-js");
var crypto_1 = require("crypto");
var SliderPuzzle = /** @class */ (function () {
    function SliderPuzzle(croppedImageBase64, puzzlePieceBase64, x, y) {
        this.cropped_imageBase64 = croppedImageBase64;
        this.puzzle_pieceBase64 = puzzlePieceBase64;
        this.x = x;
        this.y = y;
    }
    SliderPuzzle.randomPosition = function (maxX, maxY) {
        return {
            x: (0, crypto_1.randomInt)(0, maxX),
            y: (0, crypto_1.randomInt)(0, maxY),
        };
    };
    SliderPuzzle.new = function (imagePath) {
        return __awaiter(this, void 0, void 0, function () {
            var input_image, width, height, pieceWidth, pieceHeight, _a, x, y, puzzle_piece, cropped_image, puzzlePieceBase64, croppedImageWithHole, iy, ix, index, croppedImageBase64, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, image_js_1.Image.load(imagePath)];
                    case 1:
                        input_image = _b.sent();
                        width = input_image.width, height = input_image.height;
                        pieceWidth = Math.floor(width / 5);
                        pieceHeight = Math.floor(height / 5);
                        _a = SliderPuzzle.randomPosition(width - pieceWidth, height - pieceHeight), x = _a.x, y = _a.y;
                        puzzle_piece = input_image.crop({ x: x, y: y, width: pieceWidth, height: pieceHeight });
                        cropped_image = input_image.clone();
                        return [4 /*yield*/, puzzle_piece.toDataURL('image/png')];
                    case 2:
                        puzzlePieceBase64 = _b.sent();
                        croppedImageWithHole = cropped_image.clone();
                        for (iy = y; iy < y + pieceHeight; iy++) {
                            for (ix = x; ix < x + pieceWidth; ix++) {
                                index = iy * croppedImageWithHole.width + ix;
                                croppedImageWithHole.setPixel(index, [0, 0, 0, 0]); // Cor branca para o buraco
                            }
                        }
                        return [4 /*yield*/, croppedImageWithHole.toDataURL('image/png')];
                    case 3:
                        croppedImageBase64 = _b.sent();
                        return [2 /*return*/, new SliderPuzzle(croppedImageBase64, puzzlePieceBase64, x, y)];
                    case 4:
                        error_1 = _b.sent();
                        throw new Error("Erro ao criar o quebra-cabe\u00E7a: ".concat(error_1));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return SliderPuzzle;
}());
exports.SliderPuzzle = SliderPuzzle;
