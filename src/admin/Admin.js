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

import API from '../api';
import ModelTable from './ModelTable';
import './Admin.css';

export default class Admin extends Component {
  state = {
    page: 0,
    pageCount: 0,
    perPage: 10,
    plural: 'users',
    collection: [],
    loading: false,
  };

  componentDidMount() {
    this.loadModels();
  }

  componentDidUpdate(nextProps, nextState) {
    const { page: currentPage } = this.state;
    const { page: nextPage } = nextState;

    nextPage !== currentPage && this.loadModels();
  }

  setPage = page => this.setState({ page });
  setPerPage = perPage => this.setState({ perPage });

  previousPage = () => this.setPage(this.state.page - 1);
  resetPage = () => this.setPage(0);
  nextPage = () => this.setPage(this.state.page + 1);

  startLoading = () => this.setState({ loading: true });
  stopLoading = () => this.setState({ loading: false });

  /**
   * @async
   * @method loadModels
   * @param {string} plural
   * @desc Load a type of model into the collection array to be displayed.
   */
  loadModels = async () => {
    try {      
      const { plural, page, perPage } = this.state;

      this.startLoading();      

      const {
        models: collection,
        pageCount,
      } = await API.v2ReadAllModels(plural, page, perPage);

      this.setState({ collection, pageCount });
    } catch (e) {
      console.error(e);
    } finally {
      this.stopLoading();
    }
  }

  render() {
    const { collection, loading, page } = this.state;

    return (
      <Container
        className='Admin'
        fluid>
        <Segment
          attached='top'
          className='a' />
        <Segment
          attached='bottom'
          className='b'>
          <Loader active={loading} />
          {collection.length > 0 && (
            <ModelTable
              setPage={this.setPage}
              previous={this.previousPage}
              reset={this.resetPage}
              next={this.nextPage}
              {...this.state} />
          )}
        </Segment>
        <Segment
          attached='bottom'
          className='c' />
      </Container>
    );
  }
}
