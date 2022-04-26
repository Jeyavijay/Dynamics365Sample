/*--------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * See License.txt in the project root for license information.
 *--------------------------------------------------------------*/

import { Module, Node } from '@msdyn365-commerce-modules/utilities';
import * as React from 'react';
import { ICoreContext } from '@msdyn365-commerce/core';

import {
    IAddContactInfo,
    ICheckoutGuestProfileViewProps,
    IShowContactInfo
} from '@msdyn365-commerce-modules/checkout/src/modules/checkout-guest-profile/./checkout-guest-profile';

function fnSetCookie(name: string, value: any, days: number) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

export const ShowContactInfo: React.FC<IShowContactInfo> = ({ showInfoProps, email, editButton }) => (
    <Node {...showInfoProps}>
        {email}
        {editButton}
    </Node>
);

export const AddContactInfo: React.FC<IAddContactInfo> = ({
    addFormProps,
    submitButton,
    cancelButton,
    inputGroupProps,
    label,
    error,
    input
}) => (
    <Node {...addFormProps}>
        <Node {...inputGroupProps}>
            {label}
            {error}
            {input}
        </Node>
        {submitButton}
        {cancelButton}
    </Node>
);

const CheckoutGuestProfileView: React.FC<ICheckoutGuestProfileViewProps & ICoreContext> = ({
    moduleProps,
    showContactInfo,
    addContactInfo,
    request,
    email
}) => {
    if (email !== undefined) {
        fnSetCookie('_msdyn365___guest_email', email, 30);
    }
    // console.log('---------Guest EMail---------', email);

    return (
        <Module {...moduleProps}>
            {showContactInfo && <ShowContactInfo {...showContactInfo} />}
            {addContactInfo && <AddContactInfo {...addContactInfo} />}
        </Module>
    );
};

export default CheckoutGuestProfileView;
