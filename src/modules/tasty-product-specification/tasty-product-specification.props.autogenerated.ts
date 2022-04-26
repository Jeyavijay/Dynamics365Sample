/**
 * Copyright (c) Microsoft Corporation
 * All rights reserved. See License.txt in the project root for license information.
 * ITastyProductSpecification contentModule Interface Properties
 * THIS FILE IS AUTO-GENERATED - MANUAL MODIFICATIONS WILL BE LOST
 */

import * as Msdyn365 from '@msdyn365-commerce/core';

export const enum displayStyle {
    accordion = 'accordion',
    table = 'table'
}

export interface ITastyProductSpecificationConfig extends Msdyn365.IModuleConfig {
    heading?: IHeadingData;
    displayStyle?: displayStyle;
    className?: string;
}

export interface ITastyProductSpecificationResources {
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

export interface ITastyProductSpecificationProps<T> extends Msdyn365.IModule<T> {
    resources: ITastyProductSpecificationResources;
    config: ITastyProductSpecificationConfig;
}
