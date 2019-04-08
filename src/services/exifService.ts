const applicationSegmentOneMarker = 0xFFE1;
const beginOfExifHeaderMarker = 0x45786966;
const byteOrderMarker = 0x4949;
const byteStuffingMarker = 0xFF00;
const orientationMarker = 0x0112;
const startOfFileMarker = 0xFFD8;

function parseBytes(dataView: DataView, resolve) {
    let offset = 2;
    while (offset < dataView.byteLength) {
        const marker = dataView.getUint16(offset, false);
        offset += 2;
        if (marker === applicationSegmentOneMarker
            && dataView.getUint32(offset + 2, false) !== beginOfExifHeaderMarker) {
            resolve(1);
        } else if (marker === applicationSegmentOneMarker) {
            offset += 8;
            const little = dataView.getUint16(offset, false) === byteOrderMarker;
            offset += dataView.getUint32(offset + 4, little);
            const tags = dataView.getUint16(offset, little);
            offset += 2;
            for (let i = 0; i < tags; i ++) {
                if (dataView.getUint16(offset + (i * 12), little) === orientationMarker) {
                    resolve(dataView.getUint16(offset + (i * 12) + 8, little));
                }
            }
        } else if ((marker & byteStuffingMarker) !== byteStuffingMarker) {
            resolve(1);
        } else {
            offset += dataView.getUint16(offset, false);
        }
    }
}

const determineOrientation = async (file: File):Promise<number> => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
            const dataView = new DataView(reader.result as SharedArrayBuffer | ArrayBuffer);
            if (dataView.getUint16(0, false) !== startOfFileMarker) {
                resolve(1);
            }
            parseBytes(dataView, resolve);
        };
        reader.readAsArrayBuffer(new Blob([file]).slice(0, 64 * 1024));
    });
};

export default {
    determineOrientation,
};
