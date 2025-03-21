/*--------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * See License.txt in the project root for license information.
 *--------------------------------------------------------------*/

/* eslint-disable no-duplicate-imports */
import CheckoutPaymentInstrument from './sf-checkout-payment-instrument';
import CheckoutPaymentInstrumentView from './sf-checkout-payment-instrument.view';

export * from './actions/get-card-payment-accept-point';
export * from './sf-checkout-payment-instrument';
export * from './sf-checkout-payment-instrument.data';
export {
    ISfCheckoutPaymentInstrumentConfig,
    ISfCheckoutPaymentInstrumentProps,
    ISfCheckoutPaymentInstrumentResources
} from './sf-checkout-payment-instrument.props.autogenerated';
export * from './sf-checkout-payment-instrument.view';
export * from './components';

export { CheckoutPaymentInstrument, CheckoutPaymentInstrumentView };
