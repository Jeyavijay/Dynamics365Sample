/*--------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * See License.txt in the project root for license information.
 *--------------------------------------------------------------*/

/* eslint-disable no-duplicate-imports */
import { ArrayExtensions, ObjectExtensions } from '@msdyn365-commerce-modules/retail-actions';
import { Module, Node } from '@msdyn365-commerce-modules/utilities';
import * as React from 'react';

import { IProductSpecificationViewProps } from './custom-product-specification';

const ProductSpecificationView: React.FC<IProductSpecificationViewProps> = props => {
    const {
        ProductSpecification,
        ProductSpecificationTableProps,
        ProductSpecificationTableBodyProps,
        productSpecificationResult,
        isAccrodion
    } = props;
    const rowdata =
        productSpecificationResult &&
        ArrayExtensions.hasElements(productSpecificationResult) &&
        productSpecificationResult.filter(row => !ObjectExtensions.isNullOrUndefined(row));
    console.log(rowdata);

    var data: JSX.Element[] = [];

    const _getTableRow = (row: JSX.Element | null) => {
        if (
            row?.props.productName === 'Nutrition Box' ||
            row?.props.productName === 'Tasty and Healthy' ||
            row?.props.productName === 'Product Goodness' ||
            row?.props.productName === 'Item Stock' ||
            row?.props.productName === 'Stock Check' ||
            row?.props.productName === 'Video' ||
            row?.props.productName === undefined
        ) {
            console.log(row?.props.productName);
        } else {
            data.push(row);
        }
    };

    const _getAccordionRow = (row: JSX.Element | null) => {
        if (
            row?.props?.children?.props.toggleButtonText === 'Nutrition Box' ||
            row?.props?.children?.props.toggleButtonText === 'Tasty and Healthy' ||
            row?.props?.children?.props.toggleButtonText === 'Product Goodness' ||
            row?.props?.children?.props.toggleButtonText === 'Item Stock' ||
            row?.props?.children?.props.toggleButtonText === 'Stock Check' ||
            row?.props?.children?.props.toggleButtonText === 'Video' ||
            row?.props?.children?.props.toggleButtonText === undefined
        ) {
            console.log(row?.props?.children?.props.toggleButtonText);
        } else {
            data.push(row);
        }
    };

    ArrayExtensions.hasElements(productSpecificationResult) &&
        productSpecificationResult.filter(row => {
            isAccrodion ? _getAccordionRow(row) : _getTableRow(row);
        });

    return data && ArrayExtensions.hasElements(data) ? (
        <Module {...ProductSpecification}>
            {props.title}
            <Node {...ProductSpecificationTableProps}>
                <Node {...ProductSpecificationTableBodyProps}>{data}</Node>
            </Node>
        </Module>
    ) : null;
};

export default ProductSpecificationView;
