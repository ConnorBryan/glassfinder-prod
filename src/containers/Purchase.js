import React from 'react';

import withPageHeader from '../components/withPageHeader';

/**
 * @func Purchase
 * @desc The purchase screen provides a way to order a given piece.
 * @param {object} props 
 * @returns {Component}
 */
export function Purchase(props) {
  return (
    <div>
      Purchase
    </div>
  );
}

Purchase.propTypes = {};

export default withPageHeader(Purchase);