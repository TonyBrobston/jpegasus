import * as piexif from 'piexifjs';
import fileService from './fileService';
import windowService from './windowService';
const applicationSegmentOneMarker = 0xFFE1;
const beginOfExifHeaderMarker = 0x45786966;
const byteOrderMarker = 0x4949;
const byteStuffingMarker = 0xFF00;
const orientationMarker = 0x0112;
const startOfFileMarker = 0xFFD8;

const parseBytes = (dataView: DataView, resolve: (uint16: number) => void): void => {
    let offset = 2;
    while (offset < dataView.byteLength) {
        const marker = dataView.getUint16(offset, false);
        offset += 2;
        if (marker === applicationSegmentOneMarker
            && dataView.getUint32(offset + 2, false) !== beginOfExifHeaderMarker) {
            resolve(-1);
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
            resolve(-1);
        } else {
            offset += dataView.getUint16(offset, false);
        }
    }
    resolve(-1);
};

const determineOrientation = async (file: File|Blob): Promise<number> => {
    return new Promise((resolve: (orientation: number) => void): void => {
        try {
            const reader = new FileReader();
            reader.onload = (): void => {
                const dataView = new DataView(reader.result as SharedArrayBuffer | ArrayBuffer);
                if (dataView.getUint16(0, false) !== startOfFileMarker) {
                    resolve(-1);
                }
                parseBytes(dataView, resolve);
            };
            reader.readAsArrayBuffer(new Blob([file]).slice(0, 64 * 1024));
        } catch (error) {
            resolve(1);
        }
    });
};


const insertOrientation = async (file: File|Blob, orientation: number): Promise<File> => {
    return new Promise((resolve: (fileWithOrientation: File) => void, reject: () => void): void => {
        const reader = new FileReader();
        reader.onload = (): void => {
            try {
                const zeroth = {
                    [piexif.ImageIFD.Orientation]: orientation,
                };
                const exif = {};
                const gps = {};
                const exifObj = {'0th':zeroth, 'Exif':exif, 'GPS':gps};
                const exifBytes = piexif.dump(exifObj);
                const base64 = piexif.insert(exifBytes, reader.result);
                const uint8ArrayOfArrays = windowService.toByteArray(base64.split(',')[1]);
                const type = 'image/jpeg';
                resolve(fileService.create(uint8ArrayOfArrays, type, file.name));
            } catch (error) {
                console.log(error);
                reject();
            }
        };
        reader.onerror = (error: ProgressEvent<FileReader>): void => {
            console.log(error);
            reject()
        };
        reader.readAsDataURL(file);
    });

};

export default {
    determineOrientation,
    insertOrientation
};
