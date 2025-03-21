/*!
 * Copyright (c) Microsoft Corporation.
 * All rights reserved. See LICENSE in the project root for license information.
 */

import { buildMockModuleProps } from '@msdyn365-commerce/core-internal';
/// <reference types="jest" />

import * as React from 'react';
import * as renderer from 'react-test-renderer';

import OrderTracking from '../order-tracking';
import { IOrderTrackingData } from '../order-tracking.data';
import { IOrderTrackingConfig, IOrderTrackingProps } from '../order-tracking.props.autogenerated';

const mockData: IOrderTrackingData = {
    actionResponse: {
        text: 'Sample Response Data'
    }
};

const mockConfig: IOrderTrackingConfig = {
    showText: 'order-tracking'
};

const mockActions = {};

describe('OrderTracking', () => {
    let moduleProps: IOrderTrackingProps<IOrderTrackingData>;
    beforeAll(() => {
        moduleProps = buildMockModuleProps(mockData, mockActions, mockConfig) as IOrderTrackingProps<IOrderTrackingData>;
    });
    it('renders correctly', () => {
        const component: renderer.ReactTestRenderer = renderer.create(<OrderTracking {...moduleProps} />);
        const tree: renderer.ReactTestRendererJSON | renderer.ReactTestRendererJSON[] | null = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
