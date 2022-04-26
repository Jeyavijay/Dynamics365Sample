import * as React from 'react';

export interface ITastySection {
    data: {
        topBanner: string;
        bottomBanner: string;
        parentClassName: string;
        categoryClassName: string;
        title: string;
        subtitle: string;
        children: { iconImg: string; title: string; description: string }[];
    };
}

const IProductSpecificationTastySection: React.FC<ITastySection> = ({ data }) => {
    return (
        <div className={`sff_soulfull-usp-columns ${data.parentClassName}`}>
            <div className='sff_section-banner-top'>
                <img alt='Soulfull patch' className='sff_product-banner-top sff_img-lazyload sff_js sff_lazyloaded' src={data.topBanner} />
            </div>

            <div className='sff_msv-section sff_js-section__home-inline' id='sff_msv-section-cereal-text-columns'>
                <section className={`sff_section sff_section--cereal-text-columns sff_section--mb-s ${data.categoryClassName}`}>
                    <div className='sff_container'>
                        <div className='sff_section__title sff_section__title--center sff_js-sr-loaded'>
                            <h2 className='sff_section__title-text'>
                                <span className='sff_section__subtitle-text'>{data.title}</span> {data.subtitle}
                            </h2>
                        </div>
                    </div>

                    <div className='sff_mad-card-wrapper sff_container'>
                        <div className='sff_home-inline sff_home-inline--center'>
                            <div className='sff_home-inline__items'>
                                <div className='sff_o-layout sff_o-layout--center sff_mad-carousel'>
                                    {data?.children?.length > 0 &&
                                        data?.children?.map((content: any, index: number) => (
                                            <div className='sff_o-layout__item sff_u-1/1 sff_u-1/1 sff_u-1/3@tab' key={index}>
                                                <div className='sff_home-inline__item sff_js-sr-loaded'>
                                                    <div className='sff_home-inline__media'>
                                                        <img
                                                            alt=''
                                                            className='sff_home-inline__media-img sff_img-lazyload sff_js sff_lazyautosizes sff_lazyloaded'
                                                            sizes='112px'
                                                            src={content.iconImg}
                                                        />
                                                    </div>

                                                    <div className='sff_home-inline__text'>
                                                        <h3 className='sff_home-inline__title sff_h4'>{content.title}</h3>
                                                        <div className='sff_home-inline__desc'>
                                                            <div className='sff_rte'>
                                                                <p>{content.description}</p>
                                                            </div>
                                                        </div>
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

            <div className='sff_section-banner-bottom'>
                <img
                    alt='Soulfull patch'
                    className='sff_product-banner-bottom sff_img-lazyload sff_js sff_lazyloaded'
                    src={data.bottomBanner}
                />
            </div>
        </div>
    );
};

export default IProductSpecificationTastySection;
