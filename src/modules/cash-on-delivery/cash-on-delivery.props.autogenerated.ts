/**
 * Copyright (c) Microsoft Corporation
 * All rights reserved. See License.txt in the project root for license information.
 * ICashOnDelivery contentModule Interface Properties
 * THIS FILE IS AUTO-GENERATED - MANUAL MODIFICATIONS WILL BE LOST
 */

import * as Msdyn365 from '@msdyn365-commerce/core';

export interface ICashOnDeliveryConfig extends Msdyn365.IModuleConfig {
    showText?: string;
}

export interface ICashOnDeliveryResources {
    resourceKey: string;
}

export interface ICashOnDeliveryProps<T> extends Msdyn365.IModule<T> {
    resources: ICashOnDeliveryResources;
    config: ICashOnDeliveryConfig;
}
