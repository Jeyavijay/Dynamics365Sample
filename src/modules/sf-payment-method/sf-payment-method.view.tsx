/*!
 * Copyright (c) Microsoft Corporation.
 * All rights reserved. See LICENSE in the project root for license information.
 */

import * as React from 'react';
import { ISfPaymentMethodViewProps } from './sf-payment-method';

export default (props: ISfPaymentMethodViewProps) => {
    const [paymentType, setPaymentType] = React.useState('');
    const cRetailURL = props.context.request.apiSettings.baseUrl;
    const cCustomerEmailAddress = props.context.request.user.emailAddress;
    const cartId = props.context.request.cookies.getCartCookie;

    /* var vStandardPaymentMethod = document.getElementById('standard_method');
    var vCodmentMethod = document.getElementById('cod_method');
    if (vStandardPaymentMethod) {
        vStandardPaymentMethod.addEventListener('click', function() {}, false);
    }

    if (vCodmentMethod) {
        vCodmentMethod.addEventListener(
            'click',
            function() {
                if (confirm('Do you want to continue with COD option?')) {
                    const cCashOnDeliveryURL = `${cRetailURL}Commerce/Carts(${cartId})/TCPLCheckOutWithCOD?api-version=7.3`;

                    // create a JSON object
                    const json = {
                        receiptEmail: cCustomerEmailAddress
                    };

                    // request options
                    const options = {
                        method: 'POST',
                        body: JSON.stringify(json),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    };

                    // send post request
                    fetch(cCashOnDeliveryURL, options)
                        .then(response => response.json())
                        .then(result => {
                            console.log('Result>>>', result);
                            if (result.orderNumber !== undefined && result.orderNumber !== '') {
                                window.open(`/cash-on-delivery/thank-you?response=success&orderId=${result.orderNumber}`);
                            } else {
                                window.open(`/cash-on-delivery/thank-you?response=failure`);
                            }
                        })
                        .catch(error => {
                            window.open(`/cash-on-delivery/thank-you?response=error&errorText=${error}`);
                        });
                }
            },
            false
        );
    } */

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        var vPaymentType = event.target.value;
        setPaymentType(vPaymentType);
        if (vPaymentType === 'COD') {
            if (confirm('Do you want to continue with COD option?')) {
                const cCashOnDeliveryURL = `${cRetailURL}Commerce/Carts(${cartId})/TCPLCheckOutWithCOD?api-version=7.3`;

                // create a JSON object
                const json = {
                    receiptEmail: cCustomerEmailAddress
                };

                // request options
                const options = {
                    method: 'POST',
                    body: JSON.stringify(json),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                // send post request
                fetch(cCashOnDeliveryURL, options)
                    .then(response => response.json())
                    .then(result => {
                        console.log('Result>>>', result);
                        if (result.orderNumber !== undefined && result.orderNumber !== '') {
                            window.open(`/cash-on-delivery/thank-you?response=success&orderId=${result.orderNumber}`);
                        } else {
                            window.open(`/cash-on-delivery/thank-you?response=failure`);
                        }
                    })
                    .catch(error => {
                        window.open(`/cash-on-delivery/thank-you?response=error&errorText=${error}`);
                    });
            }
        } else {
            if (confirm('Do you want to continue with Paytm option?')) {
                window.open(`https://www.paytm.com`);
            }
        }

        console.log('vPaymentType>>>', vPaymentType);
        console.log('after>>>', paymentType);
    };

    const handleClickStandard = () => {
        var vCodMethod = document.getElementById('sff_payment-method-container');
        if (vCodMethod) {
            vCodMethod.style.display = 'none';
        }
    };

    const handleClickCOD = () => {
        var vCodMethod = document.getElementById('sff_payment-method-container');
        if (vCodMethod) {
            vCodMethod.style.display = 'block';
        }
    };

    return (
        <React.Fragment>
            <div id='sff_standard-payment-method-container'>
                <label htmlFor='standard_method'>
                    <input type='radio' value='standard' id='standard_method' name='payment_method' onClick={handleClickStandard} />{' '}
                    Standard Method
                </label>
                <label htmlFor='cod_method'>
                    <input type='radio' value='cod' id='cod_method' name='payment_method' onClick={handleClickCOD} /> COD
                </label>
            </div>
            <div onChange={handleChange} id='sff_payment-method-container'>
                <label htmlFor='payment_method_cod'>
                    <input type='radio' value='COD' id='payment_method_cod' name='sf_payment_method' checked={paymentType === 'COD'} /> COD
                </label>
                <label htmlFor='payment_method_paytm'>
                    <input
                        type='radio'
                        value='Paytm'
                        id='payment_method_paytm'
                        name='sf_payment_method'
                        checked={paymentType === 'Paytm'}
                    />{' '}
                    Paytm
                </label>
            </div>
        </React.Fragment>
    );
};
