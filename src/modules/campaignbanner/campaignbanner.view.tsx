/*!
 * Copyright (c) Microsoft Corporation.
 * All rights reserved. See LICENSE in the project root for license information.
 */

import * as React from 'react';
import { ICampaignbannerViewProps } from './campaignbanner';

export default (props: ICampaignbannerViewProps) => {
    return (
        <div className='row'>
            <h2>Config Valhhhhue: {props.config.showText}</h2>
            <h2>Resource Value: {props.resources.resourceKey}</h2>
        </div>
    );
};
