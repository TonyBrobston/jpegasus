---
id: "_services_scaleservice_"
title: "services/scaleService"
sidebar_label: "services/scaleService"
---

[jpegasus](../index.md) › ["services/scaleService"](_services_scaleservice_.md)

## Index

### Functions

* [determineScale](_services_scaleservice_.md#const-determinescale)
* [toCanvas](_services_scaleservice_.md#const-tocanvas)

## Functions

### `Const` determineScale

▸ **determineScale**(`__namedParameters`: object, `__namedParameters`: object): *number*

*Defined in [services/scaleService.ts:5](https://github.com/TonyBrobston/jpegasus/blob/5eb4219/src/services/scaleService.ts#L5)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`height` | number |
`width` | number |

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`maxHeight` | undefined &#124; number |
`maxWidth` | undefined &#124; number |
`scaleImageBy` | number |

**Returns:** *number*

___

### `Const` toCanvas

▸ **toCanvas**(`file`: File, `options`: [Options](../interfaces/_types_options_.options.md)): *Promise‹HTMLCanvasElement›*

*Defined in [services/scaleService.ts:19](https://github.com/TonyBrobston/jpegasus/blob/5eb4219/src/services/scaleService.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`file` | File |
`options` | [Options](../interfaces/_types_options_.options.md) |

**Returns:** *Promise‹HTMLCanvasElement›*
