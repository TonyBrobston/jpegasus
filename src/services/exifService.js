const startOfFileMarker = 0xFFD8;
const applicationSegmentOneMarker = 0xFFE1;
const beginOfExifHeaderMarker = 0x45786966;
const byteOrderMarker = 0x4949;
const orientationMarker = 0x0112;
const byteStuffingMarker = 0xFF00;

const determineOrientation = async (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = () => resolve((() => {
            const view = new DataView(reader.result);

            if (view.getUint16(0, false) != startOfFileMarker) {
                return;
            }

            let offset = 2;
            const length = view.byteLength;

            while (offset < length) {
                const marker = view.getUint16(offset, false);
                offset += 2;

                if (marker == applicationSegmentOneMarker) {
                    offset += 2;

                    if (view.getUint32(offset, false) != beginOfExifHeaderMarker) {
                        return;
                    }

                    offset += 6;

                    const little = view.getUint16(offset, false) == byteOrderMarker;

                    offset += view.getUint32(offset + 4, little);

                    const tags = view.getUint16(offset, little);

                    offset += 2;

                    for (var i = 0; i < tags; i++) {
                        if (view.getUint16(offset + (i * 12), little) == orientationMarker) {
                            return view.getUint16(offset + (i * 12) + 8, little);
                        }
                    }
                } else if ((marker & byteStuffingMarker) != byteStuffingMarker) {
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
