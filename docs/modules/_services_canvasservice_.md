---
id: "_services_canvasservice_"
title: "services/canvasService"
sidebar_label: "services/canvasService"
---

[jpegasus](../index.md) › ["services/canvasService"](_services_canvasservice_.md)

## Index

### Functions

* [correctExifRotation](_services_canvasservice_.md#const-correctexifrotation)
* [create](_services_canvasservice_.md#const-create)
* [setCanvasDimensions](_services_canvasservice_.md#const-setcanvasdimensions)

## Functions

### `Const` correctExifRotation

▸ **correctExifRotation**(`context`: CanvasTransform, `orientation`: number, `height`: number, `width`: number): *void*

*Defined in [services/canvasService.ts:14](https://github.com/TonyBrobston/jpegasus/blob/418125c/src/services/canvasService.ts#L14)*

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

▸ **create**(`file`: File, `image`: HTMLImageElement, `scale`: number): *Promise‹HTMLCanvasElement›*

*Defined in [services/canvasService.ts:42](https://github.com/TonyBrobston/jpegasus/blob/418125c/src/services/canvasService.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`file` | File |
`image` | HTMLImageElement |
`scale` | number |

**Returns:** *Promise‹HTMLCanvasElement›*

___

### `Const` setCanvasDimensions

▸ **setCanvasDimensions**(`canvas`: HTMLCanvasElement, `orientation`: number, `scaledHeight`: number, `scaledWidth`: number): *void*

*Defined in [services/canvasService.ts:3](https://github.com/TonyBrobston/jpegasus/blob/418125c/src/services/canvasService.ts#L3)*

**Parameters:**

Name | Type |
------ | ------ |
`canvas` | HTMLCanvasElement |
`orientation` | number |
`scaledHeight` | number |
`scaledWidth` | number |

**Returns:** *void*
