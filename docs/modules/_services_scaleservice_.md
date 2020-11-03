**jpegasus**

> [Globals](../README.md) / "services/scaleService"

# Module: "services/scaleService"

## Index

### Functions

* [determineScale](_services_scaleservice_.md#determinescale)
* [toCanvas](_services_scaleservice_.md#tocanvas)

## Functions

### determineScale

▸ `Const`**determineScale**(`__namedParameters`: { height: number ; width: number  }, `__namedParameters`: { maxHeight: undefined \| number ; maxWidth: undefined \| number ; scaleImageBy: number  }): number

*Defined in [services/scaleService.ts:5](https://github.com/TonyBrobston/jpegasus/blob/faa1275/src/services/scaleService.ts#L5)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { height: number ; width: number  } |
`__namedParameters` | { maxHeight: undefined \| number ; maxWidth: undefined \| number ; scaleImageBy: number  } |

**Returns:** number

___

### toCanvas

▸ `Const`**toCanvas**(`file`: File, `options`: [Options](../interfaces/_types_options_.options.md)): Promise\<HTMLCanvasElement>

*Defined in [services/scaleService.ts:19](https://github.com/TonyBrobston/jpegasus/blob/faa1275/src/services/scaleService.ts#L19)*

#### Parameters:

Name | Type |
------ | ------ |
`file` | File |
`options` | [Options](../interfaces/_types_options_.options.md) |

**Returns:** Promise\<HTMLCanvasElement>
