**jpegasus**

> [Globals](../README.md) / "services/canvasService"

# Module: "services/canvasService"

## Index

### Functions

* [correctExifRotation](_services_canvasservice_.md#correctexifrotation)
* [create](_services_canvasservice_.md#create)
* [setCanvasDimensions](_services_canvasservice_.md#setcanvasdimensions)

## Functions

### correctExifRotation

▸ `Const`**correctExifRotation**(`context`: CanvasTransform, `orientation`: number, `height`: number, `width`: number): void

*Defined in [services/canvasService.ts:20](https://github.com/TonyBrobston/jpegasus/blob/ba960ee/src/services/canvasService.ts#L20)*

#### Parameters:

Name | Type |
------ | ------ |
`context` | CanvasTransform |
`orientation` | number |
`height` | number |
`width` | number |

**Returns:** void

___

### create

▸ `Const`**create**(`file`: File, `image`: HTMLImageElement, `scale`: number, `__namedParameters`: { fixImageOrientation: boolean ; transparencyFillColor: string  }): Promise\<HTMLCanvasElement>

*Defined in [services/canvasService.ts:48](https://github.com/TonyBrobston/jpegasus/blob/ba960ee/src/services/canvasService.ts#L48)*

#### Parameters:

Name | Type |
------ | ------ |
`file` | File |
`image` | HTMLImageElement |
`scale` | number |
`__namedParameters` | { fixImageOrientation: boolean ; transparencyFillColor: string  } |

**Returns:** Promise\<HTMLCanvasElement>

___

### setCanvasDimensions

▸ `Const`**setCanvasDimensions**(`canvas`: HTMLCanvasElement, `orientation`: number, `fixImageOrientation`: boolean, `scaledHeight`: number, `scaledWidth`: number): void

*Defined in [services/canvasService.ts:4](https://github.com/TonyBrobston/jpegasus/blob/ba960ee/src/services/canvasService.ts#L4)*

#### Parameters:

Name | Type |
------ | ------ |
`canvas` | HTMLCanvasElement |
`orientation` | number |
`fixImageOrientation` | boolean |
`scaledHeight` | number |
`scaledWidth` | number |

**Returns:** void
