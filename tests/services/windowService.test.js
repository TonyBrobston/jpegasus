import windowService from '../../src/services/windowService';

describe('asdf', () => {
    it('asdfa', () => {
        const base64 = 'dGVzdA==';

        const byteArray = windowService.toByteArray(base64);

        expect(byteArray).toEqual([Uint8Array.from([116, 101, 115, 116])]);
    });
});
