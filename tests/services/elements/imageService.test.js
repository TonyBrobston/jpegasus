import Chance from 'chance';

import imageService from '../../../src/services/elements/imageService';

const chance = new Chance();

describe('imageService', () => {
    const blob = chance.string();
    const filename = chance.string();
    const file = new File([blob], filename);
    let image;

    beforeAll(async () => {
        image = await imageService.create(file);
    });

    it('should create an image', () => {
        expect(image).toBe({});
    });
});