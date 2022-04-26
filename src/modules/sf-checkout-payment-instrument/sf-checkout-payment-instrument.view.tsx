/*--------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * See License.txt in the project root for license information.
 *--------------------------------------------------------------*/

/* eslint-disable no-duplicate-imports */
import { Module, Node } from '@msdyn365-commerce-modules/utilities';
import * as React from 'react';

import { ICheckoutPaymentInstrumentViewProps, ICheckoutPaymentOverlayModal } from './sf-checkout-payment-instrument';

const OverlayModal: React.FC<ICheckoutPaymentOverlayModal> = ({ modal }) => {
    return <Node {...modal} />;
};

const CheckoutPaymentInstrumentView: React.FC<ICheckoutPaymentInstrumentViewProps> = ({
    checkoutPaymentInstrument,
    className,
    id,
    waiting,
    alert,
    paymentInformation,
    addPaymentForm,
    overlayModal,
    ...restProps
}) => (
    <Module {...checkoutPaymentInstrument}>
        {waiting}
        {alert}
        {paymentInformation}
        {addPaymentForm}
        {overlayModal && <OverlayModal {...overlayModal} />}
    </Module>
);

export default CheckoutPaymentInstrumentView;
