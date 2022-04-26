/*!
 * Copyright (c) Microsoft Corporation.
 * All rights reserved. See LICENSE in the project root for license information.
 */

import * as React from 'react';
import { IOrderTrackingViewProps } from './order-tracking';

export default (props: IOrderTrackingViewProps) => {
    const [trackingId, setTrackingId] = React.useState<string>('');
    const [isValid, setIsValid] = React.useState<boolean>(true);

    const orderTracking = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (typeof trackingId === undefined || trackingId === '') {
            setIsValid(false);
            return;
        }

        window.open(`https://tatasoulfull.shiprocket.co/tracking/${trackingId}`);
    };

    return (
        <React.Fragment>
            <section className='sff_section sff_section--page sff_page'>
                <div className='sff_container sff_container--tiny'>
                    <div className='sff_section__title sff_section__title--center sff_js-sr-loaded'>
                        <h1 className='sff_section__title-text sff_h2'>Order Tracking</h1>
                    </div>
                    <div className='sff_page__content sff_rte'>
                        <div id='sff_srOrderTracking'>
                            <form onSubmit={orderTracking}>
                                <div className='sff_post-ship-box-wrp'>
                                    <div className='sff_track-img'>
                                        <img src='https://images-us-prod.cms.commerce.dynamics.com/cms/api/qppnpfbwnj/imageFileData/MA1ARB?pubver=0' />
                                    </div>
                                    <p className='sff_post-ship-message'>Please allow us upto 7 days to get your order delivered.</p>
                                    <div className='sff_search-by-txt'>
                                        <input
                                            type='text'
                                            name='tracking_id'
                                            placeholder='Enter AWB Number'
                                            value={trackingId}
                                            onChange={e => setTrackingId(e.target.value)}
                                            onBlur={e => setIsValid(true)}
                                        />
                                        {isValid === false && <div className='sff_err-text sff_active'>Please Enter Awb Number</div>}
                                    </div>
                                    <div className='sff_search-button-wrp'>
                                        <button
                                            type='submit'
                                            className='sff_post-ship-btn sff_post-ship-submit sff_c-btn sff_c-btn--full sff_c-btn--primary'
                                        >
                                            Submit
                                        </button>
                                    </div>
                                    <span className='sff_close-post-ship-popup'>
                                        (Please track via email link for orders from South India)
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};
