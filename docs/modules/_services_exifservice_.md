[jpegasus](../README.md) › ["services/exifService"](_services_exifservice_.md)

# External module: "services/exifService"

## Index

### Variables

* [applicationSegmentOneMarker](_services_exifservice_.md#const-applicationsegmentonemarker)
* [beginOfExifHeaderMarker](_services_exifservice_.md#const-beginofexifheadermarker)
* [byteOrderMarker](_services_exifservice_.md#const-byteordermarker)
* [byteStuffingMarker](_services_exifservice_.md#const-bytestuffingmarker)
* [orientationMarker](_services_exifservice_.md#const-orientationmarker)
* [startOfFileMarker](_services_exifservice_.md#const-startoffilemarker)

### Functions

* [determineOrientation](_services_exifservice_.md#const-determineorientation)
* [parseBytes](_services_exifservice_.md#const-parsebytes)

## Variables

### `Const` applicationSegmentOneMarker

• **applicationSegmentOneMarker**: *65505* = 65505

*Defined in [services/exifService.ts:1](https://github.com/TonyBrobston/jpegasus/blob/78e3a3f/src/services/exifService.ts#L1)*

___

### `Const` beginOfExifHeaderMarker

• **beginOfExifHeaderMarker**: *1165519206* = 1165519206

*Defined in [services/exifService.ts:2](https://github.com/TonyBrobston/jpegasus/blob/78e3a3f/src/services/exifService.ts#L2)*

___

### `Const` byteOrderMarker

• **byteOrderMarker**: *18761* = 18761

*Defined in [services/exifService.ts:3](https://github.com/TonyBrobston/jpegasus/blob/78e3a3f/src/services/exifService.ts#L3)*

___

### `Const` byteStuffingMarker

• **byteStuffingMarker**: *65280* = 65280

*Defined in [services/exifService.ts:4](https://github.com/TonyBrobston/jpegasus/blob/78e3a3f/src/services/exifService.ts#L4)*

___

### `Const` orientationMarker

• **orientationMarker**: *274* = 274

*Defined in [services/exifService.ts:5](https://github.com/TonyBrobston/jpegasus/blob/78e3a3f/src/services/exifService.ts#L5)*

___

### `Const` startOfFileMarker

• **startOfFileMarker**: *65496* = 65496

*Defined in [services/exifService.ts:6](https://github.com/TonyBrobston/jpegasus/blob/78e3a3f/src/services/exifService.ts#L6)*

## Functions

### `Const` determineOrientation

▸ **determineOrientation**(`file`: File): *Promise‹number›*

*Defined in [services/exifService.ts:35](https://github.com/TonyBrobston/jpegasus/blob/78e3a3f/src/services/exifService.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`file` | File |

**Returns:** *Promise‹number›*

___

### `Const` parseBytes

▸ **parseBytes**(`dataView`: DataView, `resolve`: function): *void*

*Defined in [services/exifService.ts:8](https://github.com/TonyBrobston/jpegasus/blob/78e3a3f/src/services/exifService.ts#L8)*

**Parameters:**

▪ **dataView**: *DataView*

▪ **resolve**: *function*

▸ (`uint16`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`uint16` | number |

**Returns:** *void*