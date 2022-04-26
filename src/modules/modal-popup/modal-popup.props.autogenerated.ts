/**
 * Copyright (c) Microsoft Corporation
 * All rights reserved. See License.txt in the project root for license information.
 * IModalPopup contentModule Interface Properties
 * THIS FILE IS AUTO-GENERATED - MANUAL MODIFICATIONS WILL BE LOST
 */

import * as Msdyn365 from '@msdyn365-commerce/core';

export interface IModalPopupConfig extends Msdyn365.IModuleConfig {
    showText?: string;
}

export interface IModalPopupResources {
    resourceKey: string;
}

export interface IModalPopupProps<T> extends Msdyn365.IModule<T> {
    resources: IModalPopupResources;
    config: IModalPopupConfig;
}
