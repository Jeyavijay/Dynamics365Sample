/**
 * Copyright (c) Microsoft Corporation
 * All rights reserved. See License.txt in the project root for license information.
 * ISuperProductCollection containerModule Interface Properties
 * THIS FILE IS AUTO-GENERATED - MANUAL MODIFICATIONS WILL BE LOST
 */

import * as Msdyn365 from '@msdyn365-commerce/core';
import * as React from 'react';

export const enum layout {
    carousel = 'carousel',
    grid = 'grid'
}

export interface ISuperProductCollectionConfig extends Msdyn365.IModuleConfig {
    productCollection: Msdyn365.IProductList;
    heading?: IHeadingData;
    layout?: layout;
    allowBackNavigation?: boolean;
    imageSettings?: Msdyn365.IImageSettings;
    clientRender?: boolean;
    enableAffiliationBasedPricing?: boolean;
    className?: string;
}

export interface ISuperProductCollectionResources {
    priceFree: string;
    priceRangeSeparator: string;
    ratingAriaLabel: string;
    flipperNext: string;
    flipperPrevious: string;
    originalPriceText: string;
    currentPriceText: string;
    ratingCountAriaLabel: string;
    ratingCountAriaLabelSingleUser: string;
}

export const enum HeadingTag {
    h1 = 'h1',
    h2 = 'h2',
    h3 = 'h3',
    h4 = 'h4',
    h5 = 'h5',
    h6 = 'h6'
}

export interface IHeadingData {
    text: string;
    tag?: HeadingTag;
}

export interface ISuperProductCollectionProps<T> extends Msdyn365.IModule<T> {
    resources: ISuperProductCollectionResources;
    config: ISuperProductCollectionConfig;
    slots: {
        quickview: React.ReactNode[];
    };
}
