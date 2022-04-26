/*--------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * See License.txt in the project root for license information.
 *--------------------------------------------------------------*/

/* eslint-disable no-duplicate-imports */
import { ArrayExtensions } from '@msdyn365-commerce-modules/retail-actions';
import * as React from 'react';

import { IProductSpecificationViewProps } from './goodness-product-specification';
import IProductSpecificationProductGoodness from './components/goodness-product-specification-goodness-stucture';

export interface IProductGoodnessProps {
    product_goodness: { title: string; subtitle: string; description: string; imgSource: string };
}

const ProductSpecificationView: React.FC<IProductSpecificationViewProps> = props => {
    const { productSpecificationResult, isAccrodion } = props;

    var vProductSpecification: IProductGoodnessProps = {
        product_goodness: {
            title: '',
            subtitle: '',
            description: '',
            imgSource: ''
        }
    };

    const _getTableRow = (row: JSX.Element | null) => {
        if (row?.props.productName === 'Product Goodness') {
            var vProductGoodnessson = JSON.parse(row?.props?.cellData?.props?.dangerouslySetInnerHTML?.__html);
            console.log('--------Goodness Table--------', row);
            vProductSpecification.product_goodness = vProductGoodnessson.product_goodness;
        }
    };

    const _getAccordionRow = (row: JSX.Element | null) => {
        if (row?.props?.children?.props.toggleButtonText === 'Product Goodness') {
            var vProductGoodnessson = JSON.parse(
                row?.props?.children?.props?.children?.props?.children?.props?.dangerouslySetInnerHTML?.__html
            );
            console.log('--------Goodness Accordion--------', row);
            vProductSpecification.product_goodness = vProductGoodnessson.product_goodness;
        }
    };

    productSpecificationResult &&
        ArrayExtensions.hasElements(productSpecificationResult) &&
        productSpecificationResult.filter(row => (isAccrodion ? _getAccordionRow(row) : _getTableRow(row)));

    console.log('Product Goodness>>>', vProductSpecification.product_goodness);

    return vProductSpecification.product_goodness !== undefined && vProductSpecification.product_goodness?.title !== '' ? (
        <IProductSpecificationProductGoodness data={vProductSpecification.product_goodness} />
    ) : null;
};

export default ProductSpecificationView;
