[jpegasus](../README.md) › ["services/canvasService"](_services_canvasservice_.md)

# Module: "services/canvasService"

## Index

### Functions

* [correctExifRotation](_services_canvasservice_.md#const-correctexifrotation)
* [create](_services_canvasservice_.md#const-create)
* [setCanvasDimensions](_services_canvasservice_.md#const-setcanvasdimensions)

## Functions

### `Const` correctExifRotation

▸ **correctExifRotation**(`context`: CanvasTransform, `orientation`: number, `height`: number, `width`: number): *void*

*Defined in [services/canvasService.ts:20](https://github.com/TonyBrobston/jpegasus/blob/ebe9fe6/src/services/canvasService.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | CanvasTransform |
`orientation` | number |
`height` | number |
`width` | number |

**Returns:** *void*

___

### `Const` create

▸ **create**(`file`: File, `image`: HTMLImageElement, `scale`: number, `__namedParameters`: object): *Promise‹HTMLCanvasElement›*

*Defined in [services/canvasService.ts:48](https://github.com/TonyBrobston/jpegasus/blob/ebe9fe6/src/services/canvasService.ts#L48)*

**Parameters:**

▪ **file**: *File*

▪ **image**: *HTMLImageElement*

▪ **scale**: *number*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`fixImageOrientation` | boolean |

**Returns:** *Promise‹HTMLCanvasElement›*

___

### `Const` setCanvasDimensions

▸ **setCanvasDimensions**(`canvas`: HTMLCanvasElement, `orientation`: number, `fixImageOrientation`: boolean, `scaledHeight`: number, `scaledWidth`: number): *void*

*Defined in [services/canvasService.ts:4](https://github.com/TonyBrobston/jpegasus/blob/ebe9fe6/src/services/canvasService.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`canvas` | HTMLCanvasElement |
`orientation` | number |
`fixImageOrientation` | boolean |
`scaledHeight` | number |
`scaledWidth` | number |

**Returns:** *void*
