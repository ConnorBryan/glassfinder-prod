import React from 'react';
import PropTypes from 'prop-types';
import { Header, Icon, Segment } from 'semantic-ui-react';

export function PageHeader(props) {
  const { icon, title, description } = props;

  return (
    <Segment>
      <Header
        as='h2'
        className='fancy'>
        {icon && (
          <Icon name={icon} />
        )}
        {title}
      </Header>
      {description && (
        <div className='nested'>
          <p>{description}</p>
        </div>
      )}
    </Segment>
  );
}

PageHeader.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
}

/**
 * @func withPageHeader
 * @desc [Higher-Order-Component]
 *       Provider a generic, standardized header to place on each page.
 * @param {Component} WrappedComponent 
 * @returns {Component}
 */
export const withPageHeader = WrappedComponent => props => {
  const {
    pageHeader: {
      icon,
      title,
      description,
    },
  } = props;

  return [
    <PageHeader
      key='header'
      icon={icon}
      title={title}
      description={description} />,
    <WrappedComponent
      key='component'
      {...props} />
  ];
}

export default withPageHeader;
