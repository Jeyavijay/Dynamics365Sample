/**
 * Copyright (c) Microsoft Corporation
 * All rights reserved. See License.txt in the project root for license information.
 * IOrderTracking contentModule Interface Properties
 * THIS FILE IS AUTO-GENERATED - MANUAL MODIFICATIONS WILL BE LOST
 */

import * as Msdyn365 from '@msdyn365-commerce/core';

export interface IOrderTrackingConfig extends Msdyn365.IModuleConfig {
    showText?: string;
}

export interface IOrderTrackingResources {
    resourceKey: string;
}

export interface IOrderTrackingProps<T> extends Msdyn365.IModule<T> {
    resources: IOrderTrackingResources;
    config: IOrderTrackingConfig;
}
