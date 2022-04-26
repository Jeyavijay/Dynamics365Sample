/**
 * Copyright (c) Microsoft Corporation
 * All rights reserved. See License.txt in the project root for license information.
 * ISfPaymentMethod contentModule Interface Properties
 * THIS FILE IS AUTO-GENERATED - MANUAL MODIFICATIONS WILL BE LOST
 */

import * as Msdyn365 from '@msdyn365-commerce/core';

export interface ISfPaymentMethodConfig extends Msdyn365.IModuleConfig {
    showText?: string;
}

export interface ISfPaymentMethodResources {
    resourceKey: string;
}

export interface ISfPaymentMethodProps<T> extends Msdyn365.IModule<T> {
    resources: ISfPaymentMethodResources;
    config: ISfPaymentMethodConfig;
}
