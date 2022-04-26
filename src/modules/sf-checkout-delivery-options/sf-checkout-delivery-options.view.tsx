/*--------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * See License.txt in the project root for license information.
 *--------------------------------------------------------------*/

/* eslint-disable no-duplicate-imports */
import { Module, Node } from '@msdyn365-commerce-modules/utilities';
import * as React from 'react';

import {
    ICheckoutDeliveryOption,
    ICheckoutDeliveryOptionEdit,
    ICheckoutDeliveryOptionsError,
    ICheckoutDeliveryOptionsList,
    ICheckoutDeliveryOptionsViewProps
} from './sf-checkout-delivery-options';

const DeliveryOptionList: React.FC<ICheckoutDeliveryOptionsList> = ({ DeliveryOptionsList, list }) => {
    if (!list || list.length === 0) {
        return null;
    }

    return (
        <Node {...DeliveryOptionsList}>
            {list.map((deliveryOption: ICheckoutDeliveryOptionEdit) => {
                return (
                    <Node {...deliveryOption.DeliveryOption} key={deliveryOption.code} aria-label='Please select a delivery option.'>
                        {deliveryOption.radioButton}
                        {deliveryOption.description}
                        {deliveryOption.price}
                    </Node>
                );
            })}
        </Node>
    );
};

const DeliveryOptionSelected: React.FC<ICheckoutDeliveryOption> = ({ DeliveryOption, description, price }) => {
    return (
        <Node {...DeliveryOption}>
            {description}
            {price}
        </Node>
    );
};

const ErrorMessage: React.FC<ICheckoutDeliveryOptionsError> = ({ Error, title, message }) => {
    return (
        <Node {...Error}>
            {title}
            {message}
        </Node>
    );
};

const CheckoutDeliveryOptionsView: React.FC<ICheckoutDeliveryOptionsViewProps> = props => {
    const {
        CheckoutDeliveryOptions,
        viewState,
        deliveryOptions,
        deliveryOptionSelected,
        errorMessage,
        waiting,
        saveButton,
        editButton,
        cancelButton
    } = props;

    return (
        // TODO: All wrapper div should be provided by viewProps. Once SDK provide the sln, update markup.
        <Module {...CheckoutDeliveryOptions}>
            <div
                id='iLoadingOverlay'
                className='sff_cod-loading-overlay'
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    opacity: 1,
                    zIndex: 9,
                    margin: 0,
                    width: '100%',
                    height: '100%',
                    background: '#ffffff',
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <img
                    src='https://images-us-prod.cms.commerce.dynamics.com/cms/api/qppnpfbwnj/imageFileData/MA3jvZ?pubver=1'
                    style={{ textAlign: 'center' }}
                />
            </div>
            {viewState.isLoading && waiting}
            {viewState.isError && errorMessage && <ErrorMessage {...errorMessage} />}
            {viewState.isShowList && deliveryOptions && <DeliveryOptionList {...deliveryOptions} />}
            {viewState.isShowSelected && deliveryOptionSelected && <DeliveryOptionSelected {...deliveryOptionSelected} />}
            {viewState.isShowSaveButton && saveButton}
            {viewState.isShowEditButton && editButton}
            {viewState.isShowCancelButton && cancelButton}
        </Module>
    );
};

export default CheckoutDeliveryOptionsView;
