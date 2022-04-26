/*!
 * Copyright (c) Microsoft Corporation.
 * All rights reserved. See LICENSE in the project root for license information.
 */

import { buildMockModuleProps } from '@msdyn365-commerce/core-internal';
/// <reference types="jest" />

import * as React from 'react';
import * as renderer from 'react-test-renderer';

import SfPaymentMethod from '../sf-payment-method';
import { ISfPaymentMethodData } from '../sf-payment-method.data';
import { ISfPaymentMethodConfig, ISfPaymentMethodProps } from '../sf-payment-method.props.autogenerated';

const mockData: ISfPaymentMethodData = {
    actionResponse: {
        text: 'Sample Response Data'
    }
};

const mockConfig: ISfPaymentMethodConfig = {
    showText: 'sf-payment-method'
};

const mockActions = {};

describe('SfPaymentMethod', () => {
    let moduleProps: ISfPaymentMethodProps<ISfPaymentMethodData>;
    beforeAll(() => {
        moduleProps = buildMockModuleProps(mockData, mockActions, mockConfig) as ISfPaymentMethodProps<ISfPaymentMethodData>;
    });
    it('renders correctly', () => {
        const component: renderer.ReactTestRenderer = renderer.create(<SfPaymentMethod {...moduleProps} />);
        const tree: renderer.ReactTestRendererJSON | renderer.ReactTestRendererJSON[] | null = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
