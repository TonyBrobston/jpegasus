import Chance from 'chance';
import base64toblob from 'base64toblob';

import compressor from '../src/compressor';
import image from '../src/image';
import file from '../src/file';

jest.mock('base64toblob');
jest.mock('../src/image');
jest.mock('../src/file');

const chance = new Chance();

//todo: compare first and second file to determine if the second is actually smaller than the first
describe('file compression', async () => {
    const filename = chance.string();
    const imageFile = new File([chance.integer({min: 0})], filename);
    const expectedCompressedFile = new File([chance.integer({min: 0})], chance.string());
    let actualCompressedFile;
    const img = {
        height: chance.integer({min: 0}),
        width: chance.integer({min: 0})
    };
    const base64CanvasPrefix = chance.string();
    const base64CanvasSuffix = chance.string();
    const base64Canvas = `${base64CanvasPrefix},${base64CanvasSuffix}`;
    const canvasAsBlob = chance.string();

    document.createElement = jest.fn();
    const canvas = {
        toDataURL: jest.fn(),
        getContext: jest.fn(),
    };
    const context = {
        drawImage: jest.fn()
    };

    document.createElement.mockReturnValue(canvas);
    canvas.getContext.mockReturnValue(context);
    image.create.mockResolvedValue(img);
    canvas.toDataURL.mockReturnValue(base64Canvas);
    base64toblob.mockReturnValue(canvasAsBlob);
    file.create.mockReturnValue(expectedCompressedFile);

    beforeAll(async () => {
        actualCompressedFile = await compressor.compress(imageFile);
    });

    it('should create a canvas', () => {
        expect(document.createElement).toHaveBeenCalledTimes(1);
        expect(document.createElement).toHaveBeenCalledWith('canvas');
    });

    it('should create a canvas context', () => {
        expect(canvas.getContext).toHaveBeenCalledTimes(1);
        expect(canvas.getContext).toHaveBeenCalledWith('2d');
    });

    it('should build an img', () => {
        expect(image.create).toHaveBeenCalledTimes(1);
        expect(image.create).toHaveBeenCalledWith(imageFile);
    });

    it('should draw the img on the context of the canvas', () => {
        expect(context.drawImage).toHaveBeenCalledTimes(1);
        const scaledWidth = img.width * 0.29;
        const scaledHeight = img.height * 0.29;
        expect(context.drawImage).toHaveBeenCalledWith(img, 0, 0, scaledWidth, scaledHeight);
    });

    it('should convert canvas to data url', () => {
        expect(canvas.toDataURL).toHaveBeenCalledTimes(1);
        expect(canvas.toDataURL).toHaveBeenCalledWith('image/jpeg', 0.5);
    });

    it('should convert canvas base64 to blob', () => {
        expect(base64toblob).toHaveBeenCalledTimes(1);
        expect(base64toblob).toHaveBeenCalledWith(base64CanvasSuffix, 'image/jpeg');
    });

    it('should create a new file', () => {
        expect(file.create).toHaveBeenCalledTimes(1);
        expect(file.create).toHaveBeenCalledWith(canvasAsBlob, filename);
    });

    it('should return a compressed file', () => {
        expect(actualCompressedFile).toBe(expectedCompressedFile);
    });
});
