import * as React from 'react';

export interface IProductSpecificationIngredient {
    data: string;
}

const ProductSpecificationIngredient: React.FC<IProductSpecificationIngredient> = ({ data }) => {
    return (
        <div className='sff_product-specification-ingredient-content'>
            <div className='sff_product-specification-ingredient-content'>
                <h4 className='sff_product-specification-ingredient-title'>Ingredients</h4>
            </div>
            <div>{data}</div>
        </div>
    );
};

export default ProductSpecificationIngredient;
