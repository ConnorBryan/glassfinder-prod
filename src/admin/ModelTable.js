import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Icon,
  Loader,
  Menu,
  Segment,
  Table,
} from 'semantic-ui-react';

export function ModelTable(props) {
  const {
    collection,
    page,
    pageCount,
    setPage,
    previous,
    reset,
    next,
  } = props;

  if (collection.length === 0) return null;

  const exampleModel = collection[0];
  const headerRow = Object.keys(exampleModel);
  const orderedCollection = collection.map(model => headerRow.map(key => model[key]));

  return (
    <Table
      celled
      selectable
      structured>
      <Table.Header>
        <Table.Row>
        {headerRow.map((columnHeader, index) => (
          <Table.HeaderCell key={index}>
            <p>
              {columnHeader}
            </p>
          </Table.HeaderCell>
        ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {orderedCollection.map((modelRow, index) => (
          <Table.Row key={index}>
            {modelRow.map((value, index) => (
              <Table.Cell key={index}>
                <p>
                  {value}
                </p>
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan={headerRow.length}>
            <Menu floated='right'>
              <Menu.Item
                as='a'
                disabled={page <= 0}
                icon
                onClick={() => setPage(0)}>
                <Icon name='left chevron' />
                <Icon name='left chevron' />
              </Menu.Item>
              <Menu.Item
                as='a'
                disabled={page <= 0}
                icon
                onClick={previous}>
                <Icon name='left chevron' />
              </Menu.Item>
              <Menu.Item
                as='a'
                icon
                onClick={reset}>
                <Icon name='refresh' />
              </Menu.Item>
              <Menu.Item
                as='a'
                disabled={page >= pageCount}
                icon
                onClick={next}>
                <Icon name='right chevron' />
              </Menu.Item>
              <Menu.Item
                as='a'
                disabled={page >= pageCount}
                icon
                onClick={() => setPage(pageCount)}>
                <Icon name='right chevron' />
                <Icon name='right chevron' />
              </Menu.Item>
            </Menu>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
}

ModelTable.propTypes = {
  collection: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  previous: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};

ModelTable.defaultProps = {
  collection: [],
  page: 0,
  pageCount: 0,
  setPage: () => {},
  previous: () => {},
  reset: () => {},
  next: () => {},
};

export default ModelTable;