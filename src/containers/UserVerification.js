import React, { Component } from 'react';

import withPageHeader from '../components/withPageHeader';

export class UserVerification extends Component {
  static StatusTypes = {
    AWAITING_VERIFICATION: 0,
    VERIFYING: 1,
    DIRECT_NAVIGATION: 2,
    INVALID_USER_ID: 3,
    INVALID_VERIFICATION_CODE: 4,
    REDIRECTING: 5,
  };

  constructor(props) {
    super(props);

    const {
      userId: propsUserId,
      verificationCode: propsVerificationCode,
      location,
    } = this.props;

    const awaitingVerification = !!findQueryParam(location.search, 'awaiting-verification');

    const userId = (
      propsUserId || 
      findQueryParam(location.search, 'userId') ||
      null
    );
    
    const verificationCode = (
      propsVerificationCode ||
      findQueryParam(location.search, 'verificationCode') ||
      null
    );

    let status;

    switch (true) {
      case awaitingVerification:
        status = UserVerification.StatusTypes.AWAITING_VERIFICATION;
        break;
      case (!userId && !verificationCode):
        status = UserVerification.StatusTypes.DIRECT_NAVIGATION;
        break;
      case (!!userId && !!verificationCode):
        status = UserVerification.StatusTypes.VERIFYING;
        break;
      case (!userId):
        status = UserVerification.StatusTypes.INVALID_USER_ID;
        break;
      case (!verificationCode):
        status = UserVerification.StatusTypes.INVALID_VERIFICATION_CODE;
        break;
      default:
        throw Error(`Status in user verification is unstable`);
    }

    this.state = {
      status,
      userId,
      verificationCode,
    };
  }

  componentDidMount() {
    const { history, actions: { verify } } = this.props;
    const { status, userId, verificationCode } = this.state;

    status === UserVerification.StatusTypes.VERIFYING && verify(userId, verificationCode, history);
  }

  render() {
    const { status } = this.state;

    return (
      <div>
        User Verification
        <p>
          {status === UserVerification.StatusTypes.AWAITING_VERIFICATION && (
            `An account has been created, but it must be verified prior to use.
            Please check your email for a validation link.`
          )}
          {status === UserVerification.StatusTypes.DIRECT_NAVIGATION && (
            `Are you sure you're not here by mistake?`
          )}
          {status === UserVerification.StatusTypes.VERIFYING && (
            `Verifying the account now...`
          )}
          {status === UserVerification.StatusTypes.INVALID_USER_ID && (
            `Unfortunately, it seems the user ID in the URL is invalid.`
          )}
          {status === UserVerification.StatusTypes.INVALID_VERIFICATION_CODE && (
            `Unfortunately, it seems the verification code in the URL is invalid.`
          )}
          {status === UserVerification.StatusTypes.REDIRECTING && (
            `Successfully verified! Redirecting.`
          )}
        </p>
      </div>
    );
  }
}

export default withPageHeader(UserVerification);

/* = = = */

function findQueryParam(search, param) {
  try {
    return search
      .split('?')[1]
      .split('&')
      .find(element => element.includes(`${param}=`))
      .split('=')[1] || null;
  } catch (e) {
    return null;
  }
}