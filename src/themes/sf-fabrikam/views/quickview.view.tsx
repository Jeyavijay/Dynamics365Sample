/*--------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * See License.txt in the project root for license information.
 *--------------------------------------------------------------*/

import { Module, Node } from '@msdyn365-commerce-modules/utilities';
import * as React from 'react';

import {
    IBuyboxAddToCartViewProps,
    IBuyboxAddToWishlistViewProps,
    IBuyboxKeyInPriceViewProps,
    IBuyboxProductConfigureDropdownViewProps,
    IBuyboxProductConfigureViewProps,
    IBuyboxProductQuantityViewProps
} from '@msdyn365-commerce-modules/buybox/src/modules/quickview/../../common';
import { IQuickviewViewProps } from '@msdyn365-commerce-modules/buybox/src/modules/quickview/./quickview';

const _renderAddToCart = (addToCart: IBuyboxAddToCartViewProps): JSX.Element => {
    const { ContainerProps, errorBlock, button } = addToCart;

    return (
        <Node {...ContainerProps}>
            {errorBlock}
            {button}
        </Node>
    );
};

const _renderAddToWishlist = (addToWishlist: IBuyboxAddToWishlistViewProps): JSX.Element => {
    const { ContainerProps, errorBlock, button } = addToWishlist;

    return (
        <Node {...ContainerProps}>
            {errorBlock}
            {button}
        </Node>
    );
};

const _renderConfigureDropdown = (dropdown: IBuyboxProductConfigureDropdownViewProps): JSX.Element => {
    const { ContainerProps, LabelContainerProps, heading, errors, select } = dropdown;

    return (
        <Node {...ContainerProps}>
            <Node {...LabelContainerProps}>
                {heading}
                {errors}
            </Node>
            {select}
        </Node>
    );
};

const _renderQuickViewPopup = (props: IQuickviewViewProps): JSX.Element => {
    const {
        ModalContainer,
        ModalHeaderContainer,
        ModalFooterContainer,
        ModalHeaderContent,
        ModalBodyContainer,
        addToWishlist,
        addToCart,
        cartContainerProps
    } = props;

    return (
        <Module {...ModalContainer}>
            <Node {...ModalHeaderContainer}>{ModalHeaderContent}</Node>
            <Node {...ModalBodyContainer}>{_renderBodyContent(props)}</Node>
            <Node {...ModalFooterContainer}>
                <Node {...cartContainerProps}>
                    {addToCart && _renderAddToCart(addToCart)}
                    {addToWishlist && _renderAddToWishlist(addToWishlist)}
                </Node>
            </Node>
        </Module>
    );
};

const _renderQuantity = (quantity: IBuyboxProductQuantityViewProps, quantityLimitsMessages: React.ReactNode): JSX.Element => {
    const { ContainerProps, LabelContainerProps, heading, input, errors } = quantity;

    return (
        <Node {...ContainerProps}>
            <Node {...LabelContainerProps}>
                {heading}
                {errors}
            </Node>
            {input}
            {quantityLimitsMessages}
        </Node>
    );
};

const _renderKeyInPrice = (keyInPrice: IBuyboxKeyInPriceViewProps): JSX.Element => {
    const { ContainerProps, LabelContainerProps, heading, input } = keyInPrice;

    return (
        <Node {...ContainerProps}>
            <Node {...LabelContainerProps}>{heading}</Node>
            {input}
        </Node>
    );
};

const _renderConfigure = (configure: IBuyboxProductConfigureViewProps): JSX.Element => {
    const { ContainerProps, dropdowns } = configure;

    return <Node {...ContainerProps}>{dropdowns.map(_renderConfigureDropdown)}</Node>;
};

const _renderBodyContent = (props: IQuickviewViewProps): JSX.Element => {
    const {
        title,
        price,
        rating,
        keyInPrice,
        quantity,
        configure,
        inventoryLabel,
        quantityLimitsMessages,
        seeDetailsbutton,
        loading,
        ProductInfoContainerProps,
        MediaGalleryContainerProps,
        CarouselProps,
        unitOfMeasure
    } = props;
    if (loading) {
        return <>{loading}</>;
    }
    return (
        <>
            <Node {...MediaGalleryContainerProps}>
                <Node {...CarouselProps} />
            </Node>
            <Node {...ProductInfoContainerProps}>
                {title}
                {price}
                {unitOfMeasure}
                {rating}
                {configure && _renderConfigure(configure)}
                {keyInPrice && _renderKeyInPrice(keyInPrice)}
                {quantity && _renderQuantity(quantity, quantityLimitsMessages)}
                {seeDetailsbutton}
                {inventoryLabel}
            </Node>
        </>
    );
};

/**
 * Functional component which renders quick view button and popup based by the given props file.
 * @param {IQuickviewViewProps} props - Configuration for the quick view component.
 * @returns {React.FC<IQuickviewViewProps>} - Functional component of the quick view.
 */
export const QuickViewFunctionalComponent: React.FC<IQuickviewViewProps> = (props: IQuickviewViewProps) => {
    const { quickView, quickViewButton, isModalOpen, isMobileDevice } = props;
    return (
        <Module {...quickView}>
            {!isMobileDevice && quickViewButton}
            {isModalOpen && _renderQuickViewPopup(props)}
        </Module>
    );
};

export default QuickViewFunctionalComponent;
