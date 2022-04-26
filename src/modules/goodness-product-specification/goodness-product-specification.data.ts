/*--------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * See License.txt in the project root for license information.
 *--------------------------------------------------------------*/

/* eslint-disable no-duplicate-imports */
import { AsyncResult, AttributeValue, SimpleProduct } from '@msdyn365-commerce/retail-proxy';

export interface IGoodnessProductSpecificationData {
    product: AsyncResult<SimpleProduct>;
    productSpecificationData: AsyncResult<AttributeValue[]>;
}
