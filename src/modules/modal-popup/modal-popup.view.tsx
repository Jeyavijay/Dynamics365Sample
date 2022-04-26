/*!
 * Copyright (c) Microsoft Corporation.
 * All rights reserved. See LICENSE in the project root for license information.
 */

import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { IModalPopupViewProps } from './modal-popup';

export default (props: IModalPopupViewProps) => {
    const [zipcode, setZipCode] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [validEmail, setValidEmail] = useState<string>('');
    const [phone_no, setPhoneNo] = useState<string>('');
    const [subscription, setSubscription] = useState<boolean>(false);
    const [validPhone, setValidPhone] = useState<string>('');
    const [statusMessage, setStatusMessage] = useState<string>('');
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const [availabilityCheck, setAvailabilityCheck] = useState<boolean>(true);
    const [availabilityCheckStatus, setAvailabilityCheckStatus] = useState<string>('');

    const cCustomerAccount = props.context.request.user.customerAccountNumber;
    const cCustomerEmailAddress = props.context.request.user.emailAddress;
    const cGeoLocationZip = props.context.request.geoLocation?.zipCode;
    const cGeoLookUpConnector = props.context.request.connectors?.geoLookupConnector;
    const cRetailURL = props.context.request.apiSettings.baseUrl;
    const cRetailOUN = props.context.request.apiSettings.oun ? props.context.request.apiSettings.oun : '';

    const availabilityCheckSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.context.request.cookies.set('my_zipcode', zipcode);
        var vMyZip = props.context.request.cookies.get('my_zipcode');
        alert(vMyZip);

        const cAPIURL = `${cRetailURL}Commerce/TCPLGetDeliveryAvailablility?api-version=7.3`;
        // let lAPIURL = new URL(cAPIURL);
        // lAPIURL.searchParams.set('api-version', '7.3');

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            try {
                setAvailabilityCheck(false);
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log('STATUS>>>>', xhr.status);
                        console.log('RESPONSE>>>>', xhr.responseText);
                    } else {
                        console.log('STATUS>>>>', xhr.status);
                        console.log('RESPONSE>>>>', xhr.responseText);
                        setAvailabilityCheckStatus('error-msg');
                    }
                }
            } catch (Exception) {
                console.log('Error Exception>>>>', Exception);
            }
        };

        var data = {
            zipcode: zipcode
        };

        xhr.open('POST', cAPIURL, true);
        xhr.setRequestHeader('OUN', cRetailOUN);
        xhr.setRequestHeader('Authorization', 'Bearer null');
        xhr.send(JSON.stringify(data));
    };

    const notifySubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (email === '') {
            setValidEmail('sff_error-message');
            return;
        } else {
            setValidEmail('');
        }

        if (phone_no === '') {
            setValidPhone('sff_error-message');
            return;
        } else {
            setValidPhone('');
        }

        const cNotifyMeRetailURL = `${cRetailURL}Commerce/TCPLCreateNotifyMeSubscription?api-version=7.3`;
        // let lAPIURL = new URL(cNotifyMeRetailURL);
        // lAPIURL.searchParams.set('api-version', '7.3');
        alert(
            `Customer Number:
                ${cCustomerAccount}
                \nCustomer Email:
                ${cCustomerEmailAddress}
                \nZipcode:
                ${cGeoLocationZip}
                \nGeo Lookup Connector:
                ${cGeoLookUpConnector}`
        );

        // const cNotifyMeRetailURL = 'https://reqbin.com/echo/get/json';

        var xhr = new XMLHttpRequest();
        xhr.open('POST', cNotifyMeRetailURL, true);

        xhr.setRequestHeader('OUN', cRetailOUN);
        xhr.setRequestHeader('Authorization', 'Bearer null');
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        xhr.onload = () => {
            try {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const result = JSON.parse(xhr.responseText);
                        setStatusMessage(result.success);
                        setPhoneNo('');
                        setOpen(false);
                        console.log('STATUS>>>>', xhr.status);
                        console.log('RESPONSE>>>>', xhr.responseText);
                    } else {
                        setStatusMessage('false');
                        setOpen(false);
                        console.log('STATUS>>>>', xhr.status);
                        console.log('RESPONSE>>>>', xhr.responseText);
                    }
                }
            } catch (Exception) {
                console.log('Error Exception>>>>', Exception);
            }
        };

        var data = {
            custAccount: `${cCustomerAccount}`,
            email: `${email}`,
            itemid: '0004',
            phone: `${phone_no}`
        };

        // var data = {
        //     'custAccount': '004005',
        //     'email': 'crm@tataconsumer.com',
        //     'itemid': '0004',
        //     'phone': '9964972999'
        // };

        xhr.send(JSON.stringify(data));
    };

    return (
        <React.Fragment>
            <div className='row'>
                <div className='col-6'>
                    {availabilityCheck === false && (
                        <div className='sff_availability-check-link'>
                            <div className={`sff_availability-check-msg ${availabilityCheckStatus}`}>
                                {availabilityCheckStatus === ''
                                    ? 'Woohoo! This goodness ships your way.'
                                    : 'Please check with correct pincode'}
                                <span onClick={() => setAvailabilityCheck(true)}>Check another pincode</span>
                            </div>
                        </div>
                    )}
                    {availabilityCheck === true && (
                        <div className='sff_modal'>
                            <div className='sff_content'>
                                <form onSubmit={availabilityCheckSubmitForm}>
                                    <div className='sff_msv-title-availability-check'>Check Availability In Your Area:</div>
                                    <div className='sff_msv-input-availability-check'>
                                        <input
                                            type='text'
                                            name='zip_code'
                                            value={zipcode}
                                            onChange={e => setZipCode(e.target.value)}
                                            placeholder='Enter Your Pincode'
                                        />
                                    </div>
                                    <div className='sff_msv-button-availability-check'>
                                        <button>Check</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {statusMessage !== '' && (
                <div className='sff_alert-message'>
                    {statusMessage === 'true' && <div className='alert alert-success'>Success</div>}
                    {statusMessage === 'false' && <div className='alert alert-danger'>Failure</div>}
                </div>
            )}
            <button className='sff_msv-notify-me-button' onClick={() => setOpen(o => !o)}>
                Notify Me When Available
            </button>
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <div className='sff_modal sff_notify-me-modal'>
                    <div className='sff_header'>
                        <p className='sff_header-title'>Notify me when available</p>
                        <span className='sff_header-close' onClick={closeModal}>
                            &times;
                        </span>
                    </div>
                    <div className='sff_content'>
                        <p>Subscribe to this product to receive a notification once it becomes available.</p>
                        <form onSubmit={notifySubmitForm}>
                            <div className='sff_msv-row-email'>
                                <input
                                    type='email'
                                    name='email'
                                    value={cCustomerEmailAddress}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder='Email'
                                    className={`${validEmail}`}
                                />
                            </div>
                            <div className='sff_msv-row-phone'>
                                <select name='dial_code'>
                                    <option value='+91'>India (+91)</option>
                                </select>
                                <input
                                    type='text'
                                    name='phone_no'
                                    value={phone_no}
                                    onChange={e => setPhoneNo(e.target.value)}
                                    placeholder='Phone No'
                                    className={`sff_has-margin-left ${validPhone}`}
                                />
                            </div>
                            <div className='sff_msv-row-checkbox'>
                                <label htmlFor='subscription' className='sff_checkbox-label'>
                                    <input
                                        id='subscription'
                                        type='checkbox'
                                        name='subscription'
                                        value={`${subscription}`}
                                        onChange={e => setSubscription(e.target.checked)}
                                    />
                                    <span>Subscribe me our mailing list</span>
                                </label>
                            </div>
                            <button className='button' type='submit'>
                                Notify me when available
                            </button>
                        </form>
                    </div>
                    <div className='sff_footer'></div>
                </div>
            </Popup>
            <Popup
                trigger={() => <button className='msc-add-to-cart'>Availability Check</button>}
                position='bottom left'
                closeOnDocumentClick
                className='sff_popup-availabilty-check'
            >
                {availabilityCheck === false && (
                    <div className='sff_availability-check-link'>
                        <div className={`sff_availability-check-msg ${availabilityCheckStatus}`}>
                            {availabilityCheckStatus === '' ? 'Woohoo! This goodness ships your way.' : 'Please check with correct pincode'}
                            <span onClick={() => setAvailabilityCheck(true)}>Check another pincode</span>
                        </div>
                    </div>
                )}
                {availabilityCheck === true && (
                    <div className='sff_modal'>
                        <div className='sff_content'>
                            <form onSubmit={availabilityCheckSubmitForm}>
                                <div className='sff_msv-title-availability-check'>Check Availability In Your Area:</div>
                                <div className='sff_msv-input-availability-check'>
                                    <input
                                        type='text'
                                        name='zip_code'
                                        value={zipcode}
                                        onChange={e => setZipCode(e.target.value)}
                                        placeholder='Enter Your Pincode'
                                    />
                                </div>
                                <div className='sff_msv-button-availability-check'>
                                    <button>Check</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </Popup>
        </React.Fragment>
    );
};
