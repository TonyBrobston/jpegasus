[jpegasus](../README.md) › ["services/canvasService"](_services_canvasservice_.md)

# External module: "services/canvasService"

## Index

### Functions

* [correctExifRotation](_services_canvasservice_.md#const-correctexifrotation)
* [create](_services_canvasservice_.md#const-create)
* [setCanvasDimensions](_services_canvasservice_.md#const-setcanvasdimensions)

## Functions

### `Const` correctExifRotation

▸ **correctExifRotation**(`context`: CanvasTransform, `orientation`: IOrientationInfo, `height`: number, `width`: number): *void*

*Defined in [services/canvasService.ts:18](https://github.com/TonyBrobston/jpegasus/blob/3e8440e/src/services/canvasService.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | CanvasTransform |
`orientation` | IOrientationInfo |
`height` | number |
`width` | number |

**Returns:** *void*

___

### `Const` create

▸ **create**(`file`: File, `image`: HTMLImageElement, `scale`: number): *Promise‹HTMLCanvasElement›*

*Defined in [services/canvasService.ts:41](https://github.com/TonyBrobston/jpegasus/blob/3e8440e/src/services/canvasService.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`file` | File |
`image` | HTMLImageElement |
`scale` | number |

**Returns:** *Promise‹HTMLCanvasElement›*

___

### `Const` setCanvasDimensions

▸ **setCanvasDimensions**(`canvas`: HTMLCanvasElement, `orientation`: IOrientationInfo, `scaledHeight`: number, `scaledWidth`: number): *void*

*Defined in [services/canvasService.ts:3](https://github.com/TonyBrobston/jpegasus/blob/3e8440e/src/services/canvasService.ts#L3)*

**Parameters:**

Name | Type |
------ | ------ |
`canvas` | HTMLCanvasElement |
`orientation` | IOrientationInfo |
`scaledHeight` | number |
`scaledWidth` | number |

**Returns:** *void*
