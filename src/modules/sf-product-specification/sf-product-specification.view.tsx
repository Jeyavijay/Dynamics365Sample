/*--------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * See License.txt in the project root for license information.
 *--------------------------------------------------------------*/

/* eslint-disable no-duplicate-imports */
import { ArrayExtensions, ObjectExtensions } from '@msdyn365-commerce-modules/retail-actions';
// import { Module, Node } from '@msdyn365-commerce-modules/utilities';
import * as React from 'react';

import { IProductSpecificationViewProps } from './sf-product-specification';
import ProductSpecificationIngredient from './components/sf-product-specification-ingredient';
import ProductSpecificationNutrition from './components/sf-product-specification-nutrition';
import ProductSpecificationNutritionBox from './components/sf-product-specification-nutrition-box';

export interface iJSON {
    Ingredient: string;
    Nutrition: { title: { label: string }[]; content: { data: { label: string }[] }[] };
    Nutrition_Box: { backgroundColor: string; children: { title: string; subtitle: string; backgroundColor: string }[] };
}

const ProductSpecificationView: React.FC<IProductSpecificationViewProps> = props => {
    const { productSpecificationResult } = props;

    var vProductJson: iJSON = {
        Ingredient: '',
        Nutrition: {
            title: [],
            content: []
        },
        Nutrition_Box: {
            backgroundColor: '',
            children: []
        }
    };

    const rowdata =
        productSpecificationResult &&
        ArrayExtensions.hasElements(productSpecificationResult) &&
        productSpecificationResult.filter(row => !ObjectExtensions.isNullOrUndefined(row));

    productSpecificationResult
        ? productSpecificationResult.filter(function(item) {
              console.log('-------item?.props.productName-------', item?.props.productName);
              //   if (item?.props.productName === 'Ingredients') {
              //       var json1 = item?.props.cellData.props.dangerouslySetInnerHTML.__html;
              //       vProductJson.Ingredient = json1;
              //   }

              //   if (item?.props.productName === 'Nutrition') {
              //       var json2 = JSON.parse(item?.props.cellData.props.dangerouslySetInnerHTML.__html);
              //       vProductJson.Nutrition = json2.Nutrition;
              //   }

              // if (item?.props.productName === 'Nutrition_Box') {

              // }
              return item?.props.productName === 'Nutritio';
          })
        : undefined;
    console.log('...............', rowdata);

    var json3 = {
        Nutrition_Box: {
            backgroundColor: '#ef4836',
            children: [
                {
                    title: '320mg',
                    subtitle: 'Calcium',
                    backgroundColor: '#fbc572'
                },
                {
                    title: '7.1g',
                    subtitle: 'Protein',
                    backgroundColor: '#8b9d57'
                },
                {
                    title: '6.1g',
                    subtitle: 'Dietary Fiber',
                    backgroundColor: '#bf393e'
                },
                {
                    title: '0',
                    subtitle: 'Trans Fat',
                    backgroundColor: '#4db9ec'
                },
                {
                    title: '0',
                    subtitle: 'Maida',
                    backgroundColor: '#dd7fd7'
                }
            ]
        }
    };
    vProductJson.Nutrition_Box = json3.Nutrition_Box;

    return (
        <>
            {vProductJson.Ingredient !== '' && <ProductSpecificationIngredient data={vProductJson.Ingredient} />}
            {vProductJson.Nutrition.content.length > 0 && <ProductSpecificationNutrition data={vProductJson.Nutrition} />}
            {vProductJson.Nutrition_Box.children.length > 0 && <ProductSpecificationNutritionBox data={vProductJson.Nutrition_Box} />}
        </>
    );
};

export default ProductSpecificationView;
