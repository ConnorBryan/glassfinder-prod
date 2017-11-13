import React from 'react';

import withPageHeader from '../components/withPageHeader';

/**
 * @func Help
 * @desc The help screen provides advice as to how to utilize the application.
 * @param {object} props 
 * @returns {Component}
 */
export function Help(props) {
  return (
    <div>
      Help
    </div>
  );
}

Help.propTypes = {};

export default withPageHeader(Help);