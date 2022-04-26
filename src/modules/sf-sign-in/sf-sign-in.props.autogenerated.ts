/**
 * Copyright (c) Microsoft Corporation
 * All rights reserved. See License.txt in the project root for license information.
 * ISfSignIn contentModule Interface Properties
 * THIS FILE IS AUTO-GENERATED - MANUAL MODIFICATIONS WILL BE LOST
 */

import * as Msdyn365 from '@msdyn365-commerce/core';

export interface ISfSignInConfig extends Msdyn365.IModuleConfig {
    signInHeading: ISignInHeadingData;
    signUpHeading: ISignUpHeadingData;
    signInDisclaimer?: Msdyn365.RichText;
    facebookIcon?: Msdyn365.IImageData;
    microsoftIcon?: Msdyn365.IImageData;
    googleIcon?: Msdyn365.IImageData;
    className?: string;
}

export interface ISfSignInResources {
    signUpDescriptionText: string;
    facebookButtonText: string;
    facebookButtonAriaLabel: string;
    microsoftButtonText: string;
    microsoftButtonAriaLabel: string;
    googleButtonText: string;
    googleButtonAriaLabel: string;
    emailAddressLabelText: string;
    emailAddressAriaLabel: string;
    passwordLabelText: string;
    loginButtonText: string;
    loginButtonAriaLabel: string;
    signUpButtonText: string;
    signUpButtonAriaLabel: string;
    forgotPasswordButtonText: string;
    forgotPasswordButtonAriaLabel: string;
    requriedEmailError: string;
    requriedPasswordError: string;
    invalidEmailError: string;
    invalidPasswordError: string;
    unknownError: string;
    loadingMessage: string;
}

export const enum SignInHeadingTag {
    h1 = 'h1',
    h2 = 'h2',
    h3 = 'h3',
    h4 = 'h4',
    h5 = 'h5',
    h6 = 'h6'
}

export interface ISignInHeadingData {
    text: string;
    tag?: SignInHeadingTag;
}

export const enum SignUpHeadingTag {
    h1 = 'h1',
    h2 = 'h2',
    h3 = 'h3',
    h4 = 'h4',
    h5 = 'h5',
    h6 = 'h6'
}

export interface ISignUpHeadingData {
    text: string;
    tag?: SignUpHeadingTag;
}

export interface ISfSignInProps<T> extends Msdyn365.IModule<T> {
    resources: ISfSignInResources;
    config: ISfSignInConfig;
}
