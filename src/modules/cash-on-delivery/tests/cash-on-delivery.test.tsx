/*!
 * Copyright (c) Microsoft Corporation.
 * All rights reserved. See LICENSE in the project root for license information.
 */

import { buildMockModuleProps } from '@msdyn365-commerce/core-internal';
/// <reference types="jest" />

import * as React from 'react';
import * as renderer from 'react-test-renderer';

import CashOnDelivery from '../cash-on-delivery';
import { ICashOnDeliveryData } from '../cash-on-delivery.data';
import { ICashOnDeliveryConfig, ICashOnDeliveryProps } from '../cash-on-delivery.props.autogenerated';

const mockData: ICashOnDeliveryData = {
    actionResponse: {
        text: 'Sample Response Data'
    }
};

const mockConfig: ICashOnDeliveryConfig = {
    showText: 'cash-on-delivery'
};

const mockActions = {};

describe('CashOnDelivery', () => {
    let moduleProps: ICashOnDeliveryProps<ICashOnDeliveryData>;
    beforeAll(() => {
        moduleProps = buildMockModuleProps(mockData, mockActions, mockConfig) as ICashOnDeliveryProps<ICashOnDeliveryData>;
    });
    it('renders correctly', () => {
        const component: renderer.ReactTestRenderer = renderer.create(<CashOnDelivery {...moduleProps} />);
        const tree: renderer.ReactTestRendererJSON | renderer.ReactTestRendererJSON[] | null = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
