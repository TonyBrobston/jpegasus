**jpegasus**

> [Globals](../README.md) / "services/exifService"

# Module: "services/exifService"

## Index

### Variables

* [applicationSegmentOneMarker](_services_exifservice_.md#applicationsegmentonemarker)
* [beginOfExifHeaderMarker](_services_exifservice_.md#beginofexifheadermarker)
* [byteOrderMarker](_services_exifservice_.md#byteordermarker)
* [byteStuffingMarker](_services_exifservice_.md#bytestuffingmarker)
* [orientationMarker](_services_exifservice_.md#orientationmarker)
* [startOfFileMarker](_services_exifservice_.md#startoffilemarker)

### Functions

* [determineOrientation](_services_exifservice_.md#determineorientation)
* [parseBytes](_services_exifservice_.md#parsebytes)

## Variables

### applicationSegmentOneMarker

• `Const` **applicationSegmentOneMarker**: 65505 = 65505

*Defined in [services/exifService.ts:1](https://github.com/TonyBrobston/jpegasus/blob/faa1275/src/services/exifService.ts#L1)*

___

### beginOfExifHeaderMarker

• `Const` **beginOfExifHeaderMarker**: 1165519206 = 1165519206

*Defined in [services/exifService.ts:2](https://github.com/TonyBrobston/jpegasus/blob/faa1275/src/services/exifService.ts#L2)*

___

### byteOrderMarker

• `Const` **byteOrderMarker**: 18761 = 18761

*Defined in [services/exifService.ts:3](https://github.com/TonyBrobston/jpegasus/blob/faa1275/src/services/exifService.ts#L3)*

___

### byteStuffingMarker

• `Const` **byteStuffingMarker**: 65280 = 65280

*Defined in [services/exifService.ts:4](https://github.com/TonyBrobston/jpegasus/blob/faa1275/src/services/exifService.ts#L4)*

___

### orientationMarker

• `Const` **orientationMarker**: 274 = 274

*Defined in [services/exifService.ts:5](https://github.com/TonyBrobston/jpegasus/blob/faa1275/src/services/exifService.ts#L5)*

___

### startOfFileMarker

• `Const` **startOfFileMarker**: 65496 = 65496

*Defined in [services/exifService.ts:6](https://github.com/TonyBrobston/jpegasus/blob/faa1275/src/services/exifService.ts#L6)*

## Functions

### determineOrientation

▸ `Const`**determineOrientation**(`file`: File \| Blob): Promise\<number>

*Defined in [services/exifService.ts:36](https://github.com/TonyBrobston/jpegasus/blob/faa1275/src/services/exifService.ts#L36)*

#### Parameters:

Name | Type |
------ | ------ |
`file` | File \| Blob |

**Returns:** Promise\<number>

___

### parseBytes

▸ `Const`**parseBytes**(`dataView`: DataView, `resolve`: (uint16: number) => void): void

*Defined in [services/exifService.ts:8](https://github.com/TonyBrobston/jpegasus/blob/faa1275/src/services/exifService.ts#L8)*

#### Parameters:

Name | Type |
------ | ------ |
`dataView` | DataView |
`resolve` | (uint16: number) => void |

**Returns:** void
