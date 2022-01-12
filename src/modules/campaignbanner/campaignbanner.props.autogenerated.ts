/**
 * Copyright (c) Microsoft Corporation
 * All rights reserved. See License.txt in the project root for license information.
 * ICampaignbanner contentModule Interface Properties
 * THIS FILE IS AUTO-GENERATED - MANUAL MODIFICATIONS WILL BE LOST
 */

import * as Msdyn365 from '@msdyn365-commerce/core';

export interface ICampaignbannerConfig extends Msdyn365.IModuleConfig {
    showText?: string;
}

export interface ICampaignbannerResources {
    resourceKey: string;
}

export interface ICampaignbannerProps<T> extends Msdyn365.IModule<T> {
    resources: ICampaignbannerResources;
    config: ICampaignbannerConfig;
}
