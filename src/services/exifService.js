import exif from 'exif-js';

const determineOrientation = async (file) => {
    return new Promise(resolve => {
        const reader = new FileReader();

        reader.onload = () => resolve((() => {
            const view = new DataView(reader.result);

            if (view.getUint16(0, false) != 0xFFD8) {
                return;
            }

            const length = view.byteLength;

            let offset = 2;

            while (offset < length) {
                const marker = view.getUint16(offset, false);

                offset += 2;

                if (marker == 0xFFE1) {
                    offset += 2;

                    if (view.getUint32(offset, false) != 0x45786966) {
                        return;
                    }

                    offset += 6;

                    const little = view.getUint16(offset, false) == 0x4949;

                    offset += view.getUint32(offset + 4, little);

                    const tags = view.getUint16(offset, little);

                    offset += 2;

                    for (var i = 0; i < tags; i++) {
                        if (view.getUint16(offset + (i * 12), little) == 0x0112) {
                            return view.getUint16(offset + (i * 12) + 8, little);
                        }
                    }
                } else if ((marker & 0xFF00) != 0xFF00) {
                    break;
                } else {
                    offset += view.getUint16(offset, false);
                }
            }
        })());

        reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
    });
};

export default {
    determineOrientation,
};
