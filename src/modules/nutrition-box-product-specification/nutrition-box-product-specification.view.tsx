/*--------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * See License.txt in the project root for license information.
 *--------------------------------------------------------------*/

/* eslint-disable no-duplicate-imports */
import { ArrayExtensions } from '@msdyn365-commerce-modules/retail-actions';
import * as React from 'react';

import { IProductSpecificationViewProps } from './nutrition-box-product-specification';
import IProductSpecificationNutritionBox from './components/nutrition-box-product-specification-box-structure';

export interface INutritionBoxProps {
    Nutrition_Box: { backgroundColor: string; children: { title: string; subtitle: string; backgroundColor: string }[] };
}

const ProductSpecificationView: React.FC<IProductSpecificationViewProps> = props => {
    const { productSpecificationResult, isAccrodion } = props;

    var vProductSpecification: INutritionBoxProps = {
        Nutrition_Box: {
            backgroundColor: '',
            children: []
        }
    };

    const _getTableRow = (row: JSX.Element | null) => {
        if (row?.props.productName === 'Nutrition Box') {
            var vNutritionBoxJson = JSON.parse(row?.props?.cellData?.props?.dangerouslySetInnerHTML?.__html);
            console.log('--------Nutrition Box Table--------', row);
            vProductSpecification.Nutrition_Box = vNutritionBoxJson.Nutrition_Box;
        }
    };

    const _getAccordionRow = (row: JSX.Element | null) => {
        if (row?.props?.children?.props.toggleButtonText === 'Nutrition Box') {
            var vNutritionBoxJson = JSON.parse(
                row?.props?.children?.props?.children?.props?.children?.props?.dangerouslySetInnerHTML?.__html
            );
            console.log('--------Nutrition Box Accordion--------', row);
            vProductSpecification.Nutrition_Box = vNutritionBoxJson.Nutrition_Box;
        }
    };

    productSpecificationResult &&
        ArrayExtensions.hasElements(productSpecificationResult) &&
        productSpecificationResult.filter(row => (isAccrodion ? _getAccordionRow(row) : _getTableRow(row)));

    console.log('Nutrition Box>>>', vProductSpecification.Nutrition_Box);

    return vProductSpecification.Nutrition_Box !== undefined && vProductSpecification.Nutrition_Box?.children?.length > 0 ? (
        <IProductSpecificationNutritionBox data={vProductSpecification.Nutrition_Box} />
    ) : null;
};

export default ProductSpecificationView;
