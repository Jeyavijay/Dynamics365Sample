/*!
 * Copyright (c) Microsoft Corporation.
 * All rights reserved. See LICENSE in the project root for license information.
 */

import * as React from 'react';
import { ICashOnDeliveryViewProps } from './cash-on-delivery';

export default (props: ICashOnDeliveryViewProps) => {
    var qsResponse = props.context.request.query?.response;

    return (
        <section className='sff_section sff_section--page sff_page'>
            <div className='sff_container sff_container--tiny'>
                <div className='sff_section__title sff_section__title--center sff_js-sr-loaded'>
                    <h1 className='sff_section__title-text sff_h2'>Cash On Delivery</h1>
                </div>
                <div className='sff_page__content sff_rte'>
                    <div id='sff_srCashOnDelivery'>
                        <div className='sff_post-ship-box-wrp'>
                            <div className='sff_track-img'>
                                <img src='https://images-us-prod.cms.commerce.dynamics.com/cms/api/qppnpfbwnj/imageFileData/MA1ARB?pubver=0' />
                            </div>
                            {/* <h3 className='sff_center'>Thank You for Your Order, We will reach you through Mail.</h3> */}
                            {qsResponse === 'success' && (
                                <p className='sff_post-ship-message sff_center'>
                                    Thank You for Your Order, We will reach you through Mail.
                                </p>
                            )}
                            {qsResponse === 'failure' && (
                                <p className='sff_post-ship-message sff_center'>
                                    There was an issue with the order processing. Please try again.
                                </p>
                            )}
                            {qsResponse === 'error' && (
                                <p className='sff_post-ship-message sff_center'>
                                    There was an error with the order processing. Please try again.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
