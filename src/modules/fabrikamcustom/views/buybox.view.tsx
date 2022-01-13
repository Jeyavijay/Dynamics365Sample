/*--------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * See License.txt in the project root for license information.
 *--------------------------------------------------------------*/

/* eslint-disable no-duplicate-imports */
import {
    IBuyboxAddToCartViewProps,
    IBuyboxAddToOrderTemplateViewProps,
    IBuyboxAddToWishlistViewProps,
    IBuyboxCallbacks,
    IBuyboxData,
    IBuyboxFindInStoreViewProps,
    IBuyboxKeyInPriceViewProps,
    IBuyboxProductConfigureDropdownViewProps,
    IBuyboxProductConfigureViewProps,
    IBuyboxProductQuantityViewProps,
    IBuyboxProps,
    IBuyboxShopSimilarLookViewProps,
    IBuyboxState,
    IBuyboxViewProps
} from '@msdyn365-commerce-modules/buybox';
import { IncrementalQuantity, ITelemetryContent, Module, Node } from '@msdyn365-commerce-modules/utilities';
import * as React from 'react';

import { IBuyboxProps as IBuyboxExtentionProps, IBuyboxResources as IBuyboxExtentionResources } from '../definition-extensions/buybox.ext.props.autogenerated';

const BuyboxView: React.FC<IBuyboxViewProps & IBuyboxExtentionProps<IBuyboxData>> = props => {
    const { ModuleProps, MediaGalleryContainerProps, ProductInfoContainerProps,
        addToCart, addToOrderTemplate, addToWishlist,
        telemetryContent, configure, description, findInStore,
        quantity, price, title, rating, callbacks, state, resources, inventoryLabel, shopSimilarLook, keyInPrice,
        quantityLimitsMessages, max, shopSimilarDescription, unitOfMeasure } = props;

    return (
        <Module {...ModuleProps}>
            <Node {...MediaGalleryContainerProps}>
                {props.mediaGallery}
            </Node>
            <Node {...ProductInfoContainerProps}>
                {title}
                {price}
                {unitOfMeasure}
                {props.bulkPurchaseLink}
                {description}
                { _renderTextBlock(props.slots.textBlocks)}
                {rating}
                {configure && _renderConfigure(configure)}
                {keyInPrice && _renderKeyInPrice(keyInPrice)}
                {quantity && _renderQuantity(quantity, callbacks, props, state, resources, quantityLimitsMessages, max, telemetryContent)}
                {inventoryLabel}
                { _renderCartAndActions(addToCart, addToOrderTemplate, addToWishlist)}
                {findInStore && _renderFindInStore(findInStore)}
                { _renderSocialShare(props.slots && props.slots.socialShare)}
                {shopSimilarLook && _renderShopSimilarItem(shopSimilarLook)}
                {shopSimilarDescription && _renderShopSimilarItem(shopSimilarDescription)}
            </Node>
        </Module>
    );
};

const _renderTextBlock = (textBlocks: React.ReactNode[]): JSX.Element | undefined => {
    if (!textBlocks || textBlocks.length === 0) {
        return undefined;
    }

    return (
        <>
            {textBlocks[0]}
        </>
    );
};

const _renderSocialShare = (socialShare: React.ReactNode[]): JSX.Element | undefined => {
    if (!socialShare || socialShare.length === 0) {
        return undefined;
    }

    return (
        <>
            {socialShare[0]}
        </>
    );
};

const _renderCartAndActions = (
    addToCart?: IBuyboxAddToCartViewProps,
    addToOrderTemplate?: IBuyboxAddToOrderTemplateViewProps,
    addToWishlist?: IBuyboxAddToWishlistViewProps): JSX.Element | undefined => {
    if (!addToCart && !addToWishlist) {
        return undefined;
    }

    return (
        <div className='product-add-to-cart'>
            {addToCart && addToCart.errorBlock}
            {addToOrderTemplate && addToOrderTemplate.errorBlock}
            {addToWishlist && addToWishlist.errorBlock}
            <div className='buttons'>
                {addToCart && addToCart.button}
                {addToOrderTemplate && addToOrderTemplate.button}
                {addToWishlist && addToWishlist.button}
            </div>
        </div>
    );
};

const _renderConfigure = (configure: IBuyboxProductConfigureViewProps): JSX.Element => {
    const { ContainerProps, dropdowns } = configure;

    return (
        <Node {...ContainerProps}>
            {dropdowns.map(_renderConfigureDropdown)}
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

const _renderFindInStore = (findInStore: IBuyboxFindInStoreViewProps): JSX.Element => {
    const { ContainerProps, storeSelector, heading, description, errors, button, modal, productPickupOptionList } = findInStore;

    return (
        <Node {...ContainerProps}>
            {storeSelector}
            {heading}
            {productPickupOptionList}
            {description}
            {errors}
            {button}
            {modal}
        </Node>
    );
};

/**
 * On Change function.
 * @param callbacks -Callbacks.
 * @returns Update quantity.
 */
const onChangeHandler = (callbacks: IBuyboxCallbacks) => (newValue: number): boolean => {
    if (callbacks.updateQuantity) {
        return callbacks.updateQuantity(newValue);
    }
    return true;
};

const _renderQuantity = (
    quantityComponent: IBuyboxProductQuantityViewProps,
    callbacks: IBuyboxCallbacks,
    props: IBuyboxProps<IBuyboxData>,
    state: IBuyboxState,
    extentionResources: IBuyboxExtentionResources,
    quantityLimitsMessages: React.ReactNode,
    max: number | undefined,
    telemetryContent?: ITelemetryContent): JSX.Element => {
    const { ContainerProps, LabelContainerProps, heading, errors } = quantityComponent;

    const {
        resources
    } = props;

    const
        {
            quantity
        } = state;

    return (
        <Node {...ContainerProps}>
            <Node {...LabelContainerProps}>
                {heading}
                {errors}
            </Node>

            <IncrementalQuantity
                id='ms-buybox__product-quantity-input'
                max={max}
                currentCount={quantity}
                onChange={onChangeHandler(callbacks)}
                inputQuantityAriaLabel={resources.inputQuantityAriaLabel}
                decrementButtonAriaLabel={extentionResources.decrementButtonAriaLabel}
                incrementButtonAriaLabel={extentionResources.incrementButtonAriaLabel}
                minQuantityText={extentionResources.minQuantityText}
                maxQuantityText={extentionResources.maxQuantityText}
                telemetryContent={telemetryContent}
            />
            {quantityLimitsMessages}
        </Node>
    );
};

const _renderKeyInPrice = (keyInPrice: IBuyboxKeyInPriceViewProps): JSX.Element => {
    const { ContainerProps, LabelContainerProps, heading, input } = keyInPrice;

    return (
        <Node {...ContainerProps}>
            <Node {...LabelContainerProps}>
                {heading}
            </Node>
            {input}
        </Node>

    );
};

const _renderShopSimilarItem = (shopSimilarItem: IBuyboxShopSimilarLookViewProps): JSX.Element => {
    const { ContainerProps, errors, input } = shopSimilarItem;

    return (
        <Node {...ContainerProps}>
            {errors}
            {input}
        </Node>
    );
};

export default BuyboxView;
