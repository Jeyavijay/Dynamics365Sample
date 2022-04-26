import * as React from 'react';

export interface IProductGoodness {
    data: { title: string; subtitle: string; description: string; imgSource: string };
}

const IProductSpecificationProductGoodness: React.FC<IProductGoodness> = ({ data }) => {
    return (
        <div className='sff_soulfull-product-usps'>
            <div className='sff_msv-section js-section__home-slider' id='sff_msv-section-ragi-image-grid'>
                <section>
                    <div className='sff_ingredients-item' data-slide-id='0'>
                        <div className='sff_ingredients-copy'>
                            <h2 className='sff_ingredients-title sff_section__title-text'>
                                {data.title}
                                <span className='sff_section__subtitle-text'>{data.subtitle}</span>
                            </h2>

                            <p className='sff_ingredients-description'>{data.description}</p>
                        </div>

                        <div className='sff_ingredients-img'>
                            <img className='sff_img-lazyload sff_js sff_lazyautosizes sff_lazyloaded' src={data.imgSource} />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default IProductSpecificationProductGoodness;
