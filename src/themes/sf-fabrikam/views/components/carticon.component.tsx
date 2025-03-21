/*--------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * See License.txt in the project root for license information.
 *--------------------------------------------------------------*/

import { getUrlSync, IComponent, IComponentProps, msdyn365Commerce } from '@msdyn365-commerce/core';
import { ICartState } from '@msdyn365-commerce/global-state';
import { format, getPayloadObject, getTelemetryAttributes, ITelemetryContent, onTelemetryClick } from '@msdyn365-commerce-modules/utilities';
import { observer } from 'mobx-react';
import * as React from 'react';

export interface ICartIconData {
    cart?: ICartState;
}

export interface ICartIconComponentProps extends IComponentProps<ICartIconData> {
    className?: string;
    cartLabel: string;
    cartQtyLabel: string;
    telemetryContent?: ITelemetryContent;
}

export interface ICartIconComponent extends IComponent<ICartIconComponentProps> {
}

const CartIconComponentActions = {};

/**
 *
 * CartIcon component.
 * @extends {React.FC<ICartIconComponentProps>}
 */
const CartIcon: React.FC<ICartIconComponentProps> = observer((props: ICartIconComponentProps) => {
    const { cartLabel, cartQtyLabel, data: { cart } } = props;
    const cartLink = getUrlSync('cart', props.context.actionContext);

    // If there are invoice lines, don't update mini cart item quantity
    const cartItem = cart ? cart.totalItemsInCart : 0;
    const qtyLabel = format(cartQtyLabel, cartItem);
    const label = format(cartLabel, cartItem);

    // Construct telemetry attribute to render
    const payLoad = getPayloadObject('click', props.telemetryContent!, 'cart-icon', '');
    const attributes = getTelemetryAttributes(props.telemetryContent!, payLoad);
    const style: React.CSSProperties = {
        visibility: cart ? 'visible' : 'hidden'
    };
    return (
        <>
            <a
                title={label}
                className='msc-cart-icon msc-btn'
                href={cartLink}
                aria-label={label}
                {...attributes}
                onClick={onTelemetryClick(props.telemetryContent!, payLoad, 'cart-icon')}
            ></a>
            <div className='msc-cart-icon__count' aria-hidden style={style}>
                {qtyLabel}
            </div>
        </>
    );
});

// @ts-expect-error
export const CartIconComponent: React.FunctionComponent<ICartIconComponentProps> = msdyn365Commerce.createComponentOverride<ICartIconComponent>(
    'CartIcon',
    { component: CartIcon, ...CartIconComponentActions }
);


export default CartIconComponent;