/**
 * Copyright (c) Microsoft Corporation
 * All rights reserved. See License.txt in the project root for license information.
 * ICustomProductSpecification contentModule Interface Properties
 * THIS FILE IS AUTO-GENERATED - MANUAL MODIFICATIONS WILL BE LOST
 */

import * as Msdyn365 from '@msdyn365-commerce/core';

export const enum displayStyle {
    accordion = 'accordion',
    table = 'table'
}

export interface ICustomProductSpecificationConfig extends Msdyn365.IModuleConfig {
    heading?: IHeadingData;
    displayStyle?: displayStyle;
    className?: string;
}

export interface ICustomProductSpecificationResources {
    trueValueText: string;
    falseValueText: string;
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

export interface ICustomProductSpecificationProps<T> extends Msdyn365.IModule<T> {
    resources: ICustomProductSpecificationResources;
    config: ICustomProductSpecificationConfig;
}
