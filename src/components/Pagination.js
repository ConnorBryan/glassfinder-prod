import React from 'react';
import { Segment, Button } from 'semantic-ui-react';


/**
 * @function Pagination
 * @desc A subview presenting controls for paginating through a collection of models.
 * @param {object} props 
 * @returns {Component}
 */
export default function Pagination(props) {
  const { page, lastPage, loadPage } = props;

  return (
    <Segment
      attached='top'
      className='Pagination'
      primary>
      <Button.Group
        compact
        widths={5}>
          <Button
            primary
            disabled={page === 0}
            icon='fast backward'
            onClick={() => loadPage(0)} />
          <Button
            primary
            disabled={page === 0}
            icon='chevron left'
            onClick={() => loadPage(page - 1)} />
          <Button content={`${page + 1}`} />
          <Button
            primary
            disabled={page + 1 >= lastPage}
            icon='chevron right'
            onClick={() => loadPage(page + 1)} />
          <Button
            primary
            disabled={page + 1 >= lastPage}
            icon='fast forward'
            onClick={() => loadPage(lastPage - 1)} />
        </Button.Group>
      </Segment>
  );
}