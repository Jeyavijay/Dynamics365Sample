/*--------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * See License.txt in the project root for license information.
 *--------------------------------------------------------------*/

/* eslint-disable no-duplicate-imports */
import { AsyncResult } from '@msdyn365-commerce/core';
import { Customer } from '@msdyn365-commerce/retail-proxy';
import { IHeaderViewProps } from '@msdyn365-commerce-modules/header';
import { Collapse, Drawer, Module, Node } from '@msdyn365-commerce-modules/utilities';
import classnames from 'classnames';
import * as React from 'react';
import Popup from 'reactjs-popup';
import { default as IndiaPincode } from '../sf-data/india-pincode.json';

export interface IIndiaPincode {
    p: number;
    s: string;
}

export interface IIndiaPincodeObject {
    pincode: IIndiaPincode[];
}

const headerView: React.FC<IHeaderViewProps> = props => {
    const { HeaderTag, HeaderContainer, HeaderTopBarContainer, Divider } = props;

    /* Context Variables */
    const cRetailURL = props.context.request.apiSettings.baseUrl;
    const cRetailOUN = props.context.request.apiSettings.oun ? props.context.request.apiSettings.oun : '';
    const cCustomerZipCode = props.context.request.cookies.get('_msdyn365___zipcode_')?.value
        ? props.context.request.cookies.get('_msdyn365___zipcode_')?.value
        : '';
    const cCustomerAvailabilityCheck = props.context.request.cookies.get('_msdyn365___zipcode_check')?.value
        ? props.context.request.cookies.get('_msdyn365___zipcode_check')?.value
        : 'true';
    const cCustomerResponseStatus = props.context.request.cookies.get('_msdyn365___zipcode_res_status')?.value
        ? props.context.request.cookies.get('_msdyn365___zipcode_res_status')?.value
        : '';

    /* Availability Check */
    const [zipcode, setZipCode] = React.useState<string>(String(cCustomerZipCode));
    const [availableZipcode] = React.useState<string>(String(cCustomerZipCode));
    const [availabilityCheck, setAvailabilityCheck] = React.useState<string>(String(cCustomerAvailabilityCheck));
    const [availabilityCheckStatus, setAvailabilityCheckStatus] = React.useState<string>(String(cCustomerResponseStatus));

    var vIndiaPincode: IIndiaPincodeObject = {
        pincode: []
    };

    const availabilityCheckSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (zipcode === '' || zipcode.length !== 6) {
            return;
        }

        const cAvailabilityCheckRetailURL = `${cRetailURL}Commerce/TCPLGetDeliveryAvailablility?api-version=7.3`;

        var data = JSON.stringify({
            zipCode: zipcode
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener('readystatechange', function() {
            try {
                if (this.readyState === 4) {
                    setAvailabilityCheck('false');
                    props.context.request.cookies.set('_msdyn365___zipcode_', zipcode);
                    vIndiaPincode.pincode = IndiaPincode.pincode;
                    var vVerified = vIndiaPincode.pincode.filter(pincode => pincode.p == parseInt(zipcode));

                    if (vVerified.length > 0) {
                        props.context.request.cookies.set('_msdyn365___state_', vVerified[0].s);
                    } else {
                        props.context.request.cookies.set('_msdyn365___state_', '');
                    }

                    props.context.request.cookies.set('_msdyn365___zipcode_check', 'false');
                    if (xhr.status === 200) {
                        var vAvailabilityCheckResult = JSON.parse(xhr.responseText);
                        if (vAvailabilityCheckResult.value === true) {
                            setAvailabilityCheckStatus('');
                            props.context.request.cookies.set('_msdyn365___zipcode_res_status', '');
                        } else {
                            setAvailabilityCheckStatus('error-msg');
                            props.context.request.cookies.set('_msdyn365___zipcode_res_status', 'error-msg');
                        }
                    } else {
                        setAvailabilityCheckStatus('error-msg');
                        props.context.request.cookies.set('_msdyn365___zipcode_res_status', 'error-msg');
                        console.log('STATUS>>>>', xhr.status);
                        console.log('RESPONSE>>>>', xhr.responseText);
                    }
                    window.location.reload();
                }
            } catch (Exception) {
                console.log('Pincode Exception>>>>', Exception);
            }
        });

        xhr.open('POST', cAvailabilityCheckRetailURL);
        xhr.setRequestHeader('OUN', cRetailOUN);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Accept', 'application/json');

        xhr.send(data);
    };

    /*Homepage Modal Popup */
    const [open, setOpen] = React.useState(false);
    const closeModal = () => setOpen(false);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(true);
        }, 300000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Module {...HeaderTag}>
            <Node {...HeaderContainer}>
                <Node {...HeaderTopBarContainer}>
                    {props.navIcon}
                    {props.logo}
                    {/* {props.MobileMenuHeader && _renderReactFragment(props.menuBar)} */}
                    {_renderReactFragment(props.menuBar)}
                    {/* {props.preferredStore} */}
                    <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                        <div className='sff_modal sff_header-modal'>
                            <div className='sff_content'>
                                <span className='sff_header-close' onClick={closeModal}>
                                    &times;
                                </span>
                                <img src='https://images-us-prod.cms.commerce.dynamics.com/cms/api/qppnpfbwnj/imageFileData/MA396Z?pubver=1' />
                            </div>
                        </div>
                    </Popup>
                    <Popup
                        trigger={() => (
                            <div className='ms-header__preferred-store-container'>
                                <button className='ms-header__preferred-store-btn msc-btn' color='secondary' aria-label='Store locator'>
                                    <span className='ms-header__preferred-store-text'>{availableZipcode}</span>
                                </button>
                            </div>
                        )}
                        position='bottom right'
                        closeOnDocumentClick
                        className='sff_popup-availabilty-check'
                    >
                        {availabilityCheck === 'false' && (
                            <div className='sff_availability-check-link'>
                                <div className={`sff_availability-check-msg ${availabilityCheckStatus}`}>
                                    {availabilityCheckStatus === ''
                                        ? 'Woohoo! This goodness ships your way.'
                                        : 'Please check with correct pincode'}
                                    <span
                                        onClick={() => {
                                            setAvailabilityCheck('true');
                                            props.context.request.cookies.set('_msdyn365___zipcode_check', 'true');
                                        }}
                                    >
                                        Check another pincode
                                    </span>
                                </div>
                            </div>
                        )}
                        {availabilityCheck === 'true' && (
                            <div className='sff_modal'>
                                <div className='sff_content'>
                                    <form onSubmit={availabilityCheckSubmitForm}>
                                        <div className='sff_msv-title-availability-check'>Check Availability In Your Area:</div>
                                        <div className='sff_msv-input-availability-check'>
                                            <input
                                                type='number'
                                                name='zip_code'
                                                value={zipcode}
                                                onChange={e => setZipCode(e.target.value)}
                                                min={'100000'}
                                                max={'999999'}
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
                    <Node {...Divider} />
                    {_renderReactFragment(props.search)}
                    <Node {...Divider} />
                    {_renderAccountBlock(props, false)}
                    {/* {props.wishListIconDesktop} */}
                    <Node {...Divider} />
                    <button className='sff_ms-cart-icon'></button>
                    {props.cartIcon}
                    {/* {_renderReactFragment(props.siteOptions)} */}
                </Node>
                {_renderCollapseMenu(props)}
                {/* <Node className='ms-header__desktop-view'>
                    {_renderReactFragment(props.menuBar)}
                </Node> */}
            </Node>
        </Module>
    );
};

function _renderCollapseMenu(props: IHeaderViewProps): JSX.Element | null {
    const { Divider, MobileMenuLinksContainer, mobileMenuCollapsed } = props;

    /* Context Variables */
    const cRetailURL = props.context.request.apiSettings.baseUrl;
    const cRetailOUN = props.context.request.apiSettings.oun ? props.context.request.apiSettings.oun : '';
    const cCustomerZipCode = props.context.request.cookies.get('_msdyn365___zipcode_')?.value
        ? props.context.request.cookies.get('_msdyn365___zipcode_')?.value
        : '';
    const cCustomerAvailabilityCheck = props.context.request.cookies.get('_msdyn365___zipcode_check')?.value
        ? props.context.request.cookies.get('_msdyn365___zipcode_check')?.value
        : 'true';
    const cCustomerResponseStatus = props.context.request.cookies.get('_msdyn365___zipcode_res_status')?.value
        ? props.context.request.cookies.get('_msdyn365___zipcode_res_status')?.value
        : '';

    /* Availability Check */
    const [zipcode, setZipCode] = React.useState<string>(String(cCustomerZipCode));
    const [availableZipcode] = React.useState<string>(String(cCustomerZipCode));
    const [availabilityCheck, setAvailabilityCheck] = React.useState<string>(String(cCustomerAvailabilityCheck));
    const [availabilityCheckStatus, setAvailabilityCheckStatus] = React.useState<string>(String(cCustomerResponseStatus));

    var vIndiaPincode: IIndiaPincodeObject = {
        pincode: []
    };

    const availabilityCheckSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (zipcode === '' || zipcode.length !== 6) {
            return;
        }

        const cAvailabilityCheckRetailURL = `${cRetailURL}Commerce/TCPLGetDeliveryAvailablility?api-version=7.3`;

        var data = JSON.stringify({
            zipCode: zipcode
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener('readystatechange', function() {
            try {
                if (this.readyState === 4) {
                    setAvailabilityCheck('false');
                    props.context.request.cookies.set('_msdyn365___zipcode_', zipcode);
                    vIndiaPincode.pincode = IndiaPincode.pincode;
                    var vVerified = vIndiaPincode.pincode.filter(pincode => pincode.p == parseInt(zipcode));

                    if (vVerified.length > 0) {
                        props.context.request.cookies.set('_msdyn365___state_', vVerified[0].s);
                    } else {
                        props.context.request.cookies.set('_msdyn365___state_', '');
                    }

                    props.context.request.cookies.set('_msdyn365___zipcode_check', 'false');
                    if (xhr.status === 200) {
                        var vAvailabilityCheckResult = JSON.parse(xhr.responseText);
                        if (vAvailabilityCheckResult.value === true) {
                            setAvailabilityCheckStatus('');
                            props.context.request.cookies.set('_msdyn365___zipcode_res_status', '');
                        } else {
                            setAvailabilityCheckStatus('error-msg');
                            props.context.request.cookies.set('_msdyn365___zipcode_res_status', 'error-msg');
                        }
                    } else {
                        setAvailabilityCheckStatus('error-msg');
                        props.context.request.cookies.set('_msdyn365___zipcode_res_status', 'error-msg');
                        console.log('STATUS>>>>', xhr.status);
                        console.log('RESPONSE>>>>', xhr.responseText);
                    }
                    window.location.reload();
                }
            } catch (Exception) {
                console.log('Pincode Exception>>>>', Exception);
            }
        });

        xhr.open('POST', cAvailabilityCheckRetailURL);
        xhr.setRequestHeader('OUN', cRetailOUN);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Accept', 'application/json');

        xhr.send(data);
    };

    return (
        <Collapse className='ms-header__collapsible-hamburger' isOpen={!mobileMenuCollapsed}>
            <Node {...MobileMenuLinksContainer}>
                <Popup
                    trigger={() => (
                        <div className='ms-header__preferred-store-container sff_mob-location-header'>
                            <button className='ms-header__preferred-store-btn msc-btn' color='secondary' aria-label='Store locator'>
                                <span className='ms-header__preferred-store-text'>{availableZipcode}</span>
                            </button>
                        </div>
                    )}
                    position='bottom left'
                    closeOnDocumentClick
                    className='sff_popup-availabilty-check'
                >
                    {availabilityCheck === 'false' && (
                        <div className='sff_availability-check-link'>
                            <div className={`sff_availability-check-msg ${availabilityCheckStatus}`}>
                                {availabilityCheckStatus === ''
                                    ? 'Woohoo! This goodness ships your way.'
                                    : 'Please check with correct pincode'}
                                <span
                                    onClick={() => {
                                        setAvailabilityCheck('true');
                                        props.context.request.cookies.set('_msdyn365___zipcode_check', 'true');
                                    }}
                                >
                                    Check another pincode
                                </span>
                            </div>
                        </div>
                    )}
                    {availabilityCheck === 'true' && (
                        <div className='sff_modal'>
                            <div className='sff_content'>
                                <form onSubmit={availabilityCheckSubmitForm}>
                                    <div className='sff_msv-title-availability-check'>Check Availability In Your Area:</div>
                                    <div className='sff_msv-input-availability-check'>
                                        <input
                                            type='number'
                                            name='zip_code'
                                            value={zipcode}
                                            onChange={e => setZipCode(e.target.value)}
                                            min={'100000'}
                                            max={'999999'}
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
                {/* {_renderReactFragment(props.search)} */}
                {/* {props.wishListIconMobile} */}
                {/* {props.siteOptions} */}
            </Node>
            <Node {...Divider} />
            {_renderReactFragment(props.menuBar)}
            <Node {...MobileMenuLinksContainer}>
                {_renderMobileAccountBlock(props, true)}
            </Node>
        </Collapse>
    );
}

const renderCustomerName = (accountInformation: AsyncResult<Customer>): React.ReactChild => {
    const customer = accountInformation && accountInformation.result;
    return <>{customer ? customer.FirstName || customer.Name : ''}</>;
};

function _renderMobileAccountBlock(props: IHeaderViewProps, renderForMobile: boolean): JSX.Element | null {
    const { AccountInfoDropdownParentContainer, signOutLink, signInLink, data, accountLinks } = props;

    if (AccountInfoDropdownParentContainer) {
        const accountClassName = classnames(
            'ms-header__drawer',
            AccountInfoDropdownParentContainer.className,
            renderForMobile ? 'account-mobile' : 'account-desktop'
        );

        if (accountLinks) {
            return (
                <Drawer
                    className={accountClassName}
                    openGlyph='ms-header__drawer-open'
                    closeGlyph='ms-header__drawer-close'
                    glyphPlacement='end'
                    toggleButtonText={renderCustomerName(data.accountInformation)}
                >
                    <div>
                        {accountLinks ? accountLinks.map((link: React.ReactNode) => link) : false}
                        {signOutLink}
                    </div>
                </Drawer>
            );
        } else if (signInLink) {
            return (
                <Node {...AccountInfoDropdownParentContainer} className={accountClassName}>
                    {signInLink}
                </Node>
            );
        }
    }
    return null;
}

function _renderAccountBlock(props: IHeaderViewProps, renderForMobile: boolean): JSX.Element | null {
    const {
        AccountInfoDropdownParentContainer,
        AccountInfoDropdownPopoverConentContainer,
        accountInfoDropdownButton,
        signOutLink,
        signInLink,
        accountLinks
    } = props;

    if (AccountInfoDropdownParentContainer) {
        const accountClassName = classnames(
            AccountInfoDropdownParentContainer.className,
            renderForMobile ? 'account-mobile' : 'account-desktop'
        );
        if (AccountInfoDropdownPopoverConentContainer) {
            return (
                <Node {...AccountInfoDropdownParentContainer} className={accountClassName}>
                    {accountInfoDropdownButton}
                    <Node {...AccountInfoDropdownPopoverConentContainer}>
                        {accountLinks ? accountLinks.map((link: React.ReactNode) => link) : false}
                        {signOutLink}
                    </Node>
                </Node>
            );
        } else if (signInLink) {
            return (
                <Node {...AccountInfoDropdownParentContainer} className={accountClassName}>
                    {signInLink}
                </Node>
            );
        }
    }

    return null;
}

function _renderReactFragment(items: React.ReactNode[]): JSX.Element | null {
    return (
        <>
            {items && items.length > 0
                ? items.map((slot: React.ReactNode, index: number) => {
                      return <React.Fragment key={index}>{slot}</React.Fragment>;
                  })
                : null}
        </>
    );
}

export default headerView;
