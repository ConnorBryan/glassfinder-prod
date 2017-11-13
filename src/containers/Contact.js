import React from 'react';

import withPageHeader from '../components/withPageHeader';

/**
 * @func Contact
 * @desc The contact screen provides avenues for getting in touch.
 * @param {object} props 
 * @returns {Component}
 */
export function Contact(props) {
  return (
    <div>
      Contact
    </div>
  );
}

Contact.propTypes = {};

export default withPageHeader(Contact);