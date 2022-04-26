/*--------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * See License.txt in the project root for license information.
 *--------------------------------------------------------------*/

/* eslint-disable no-duplicate-imports */
import { ArrayExtensions } from '@msdyn365-commerce-modules/retail-actions';
import * as React from 'react';

import { IProductSpecificationViewProps } from './tasty-product-specification';
import IProductSpecificationTastySection from './components/tasty-product-specification-tasty-stucture';

export interface IProductGoodnessProps {
    tasty_and_healthy: {
        topBanner: string;
        bottomBanner: string;
        parentClassName: string;
        categoryClassName: string;
        title: string;
        subtitle: string;
        children: { iconImg: string; title: string; description: string }[];
    };
}

const ProductSpecificationView: React.FC<IProductSpecificationViewProps> = props => {
    const { productSpecificationResult, isAccrodion } = props;

    var vProductSpecification: IProductGoodnessProps = {
        tasty_and_healthy: {
            topBanner: '',
            bottomBanner: '',
            parentClassName: '',
            categoryClassName: '',
            title: '',
            subtitle: '',
            children: []
        }
    };

    const _getTableRow = (row: JSX.Element | null) => {
        if (row?.props.productName === 'Tasty and Healthy') {
            console.log('-----Tasty and Healthy Table---------', row);
            var vProductGoodnessson = JSON.parse(row?.props?.cellData?.props?.dangerouslySetInnerHTML?.__html);
            vProductSpecification.tasty_and_healthy = vProductGoodnessson.tasty_and_healthy;
        }
    };

    const _getAccordionRow = (row: JSX.Element | null) => {
        if (row?.props?.children?.props.toggleButtonText === 'Tasty and Healthy') {
            console.log('---------Tasty and Healthy Accordion-----------', row);
            var vProductGoodnessson = JSON.parse(
                row?.props?.children?.props?.children?.props?.children?.props?.dangerouslySetInnerHTML?.__html
            );
            vProductSpecification.tasty_and_healthy = vProductGoodnessson.tasty_and_healthy;
        }
    };

    productSpecificationResult &&
        ArrayExtensions.hasElements(productSpecificationResult) &&
        productSpecificationResult.filter(row => (isAccrodion ? _getAccordionRow(row) : _getTableRow(row)));

    console.log('Tasty and Healthy>>>', vProductSpecification.tasty_and_healthy);

    return vProductSpecification.tasty_and_healthy !== undefined && vProductSpecification.tasty_and_healthy?.children?.length > 0 ? (
        <IProductSpecificationTastySection data={vProductSpecification.tasty_and_healthy} />
    ) : null;
};

export default ProductSpecificationView;
