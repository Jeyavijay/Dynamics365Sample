import * as React from 'react';

export interface IProductSpecificationNutrition {
    data: { title: { label: string }[]; content: { data: { label: string }[] }[] };
}

const ProductSpecificationNutrition: React.FC<IProductSpecificationNutrition> = ({ data }) => {
    return (
        <div className='sff_product-specification-nutition-container'>
            <div className='sff_product-specification-nutition-content'>
                <h4 className='sff_product-specification-nutition-title'>Nutrition</h4>
            </div>

            <div>
                <table>
                    <tbody>
                        <tr>
                            {data.title.map((nutrition, index) => (
                                <th key={index}>{nutrition.label}</th>
                            ))}
                        </tr>
                        {data.content.map((nutrition, index) => (
                            <tr key={index}>
                                {nutrition.data.map((info: any, idx: number) => (
                                    <td key={idx}>{info.label}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductSpecificationNutrition;
