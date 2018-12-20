import compressor from '../src/compressor';

describe('file compression', async () => {
    document.createElement = jest.fn();
    const canvas = jest.fn();
    canvas.getContext = canvas;
    document.createElement.mockReturnValue(canvas.getContext);
    const file = new File([], '');

    compressor.compress(file);

    it('should have created a canvas', () => {
        expect(document.createElement).toHaveBeenCalledTimes(1);
        expect(document.createElement).toHaveBeenCalledWith('canvas');
    });

    it('should have created a canvas context', () => {
        expect(canvas.getContext).toHaveBeenCalledTimes(1);
        expect(canvas.getContext).toHaveBeenCalledWith('2d');
    });

    // it('should have built an image', () => {
    //
    // });
});
