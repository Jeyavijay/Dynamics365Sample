import * as React from 'react';

export interface IProductSpecificationNutritionBox {
    data: { backgroundColor: string; children: { title: string; subtitle: string; backgroundColor: string }[] };
}

const ProductSpecificationNutritionBox: React.FC<IProductSpecificationNutritionBox> = ({ data }) => {
    return (
        <div className='sff_product-specification-nutitionbox-container'>
            <div className='sff_soulfull-nutrition'>
                <div className='sff_msv-section sff_js-section__home-inline' id='sff_msv-section-ragi-nutrition-list'>
                    <section className='sff_section sff_section--ragi-nutrition-list sff_section--mb-s sff_soulfull-nutrition'>
                        <div
                            className='sff_home-logo-list__bg sff_mad-nutri-list__bg'
                            style={{ backgroundColor: data.backgroundColor }}
                        ></div>
                        <div className='sff_container sff_container--large'>
                            <div className='sff_home-inline sff_home-inline--center'>
                                <div className='sff_home-inline__items sff_mad-nutri-items'>
                                    <div className='sff_o-layout sff_o-layout--center'>
                                        {data.children.map((nutrition_info: any, index: number) => (
                                            <div
                                                className='sff_o-layout__item sff_u-1/1 sff_u-1/1 sff_u-1/3@tab'
                                                id='sff_nutri-info'
                                                key={index}
                                            >
                                                <div className='sff_home-inline__item sff_js-sr-loaded'>
                                                    <div className='sff_home-inline__text sff_home-inline__text--full'>
                                                        <h2 className='sff_home-inline__title sff_h1 sff_nutri-head-title'>
                                                            {nutrition_info.title}
                                                        </h2>

                                                        <h3
                                                            className='sff_home-inline__sub-title sff_h3 sff_nutri-head-subtitle'
                                                            style={{ backgroundColor: nutrition_info.backgroundColor }}
                                                        >
                                                            {nutrition_info.subtitle}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <span className='sff_nutrition-disclaimer'>*These figures are for 100g servings</span>
            </div>
        </div>
    );
};

export default ProductSpecificationNutritionBox;
