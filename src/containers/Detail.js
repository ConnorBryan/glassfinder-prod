import React, { Component } from 'react';
import S from 'string';
import axios from 'axios';
import {
  Segment,
  Label,
  Header,
  Icon,
  Item,
  Menu,
} from 'semantic-ui-react';

import CONSTANTS from '../constants';
import * as Formatters from '../util/formatters';
import Slider from '../components/Slider';

export default class Detail extends Component {
  static defaultProps = {
    model: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      sliders: [],
    };
  }

  componentDidMount() {
    const {
      type,
      model: propsModel,
      location: { pathname },
    } = this.props;
    const {
      [Formatters.getModelPlural(type)]: collection,
      actions: {
        [Formatters.getModelGetter(type)]: getModel,
        setModel
      },
    } = this.props;

    const id = pathname.split('/').pop();
    const model = propsModel || collection.filter(model => model.id === id)[0] || null;

    if (model && (model.id !== id)) return getModel(id);

    if (model) {
      setModel(model);
      this.loadSliders(type, model);
    } else {
      getModel(id);
    }
  }

  /**
   * @method loadSliders
   * @desc Using the associated collections of IDs to other models,
   *       create slider configuration objects.
   * @param {*} type 
   * @param {*} model 
   */
  loadSliders(type, model) {
    const { actions: { setError } } = this.props;

    const sliders = [];
    
    CONSTANTS.ASSOCIATIONS[type].forEach(async association => {
      const plural = Formatters.getModelPlural(association);
      const collection = model[plural] || [];
      const collectionById = collection.reduce((queryParam, id, i) => queryParam + `${i > 0 ? ',' : ''}${id}`, '');
      
      try {
        const { data } = await axios.get(`${CONSTANTS.API_ROOT}/${plural}ById?collection=${collectionById}`);

        sliders.push({
          type: association,
          collection: data,
        });

        this.setState({ sliders });
      } catch (e) {
        setError({
          error: e,
          message: `Failed while trying to retrieve sliders for ${type}`,
        });
      }
    });
  }

  render() {
    const { history } = this.props;
    let { type, model } = this.props;
    const { sliders } = this.state;
    
    if (!model) model = {};

    const {
      description,
      email,
      image,
      memberSince,
      name,
      phone,
      rating,
      tagline,
    } = model;

    type = S(type).capitalize().s;

    return [
      <Segment key='main'>
        <Label
          ribbon
          color='blue'
          positon='top left'>
          <Header as='h3'>
            {type}
          </Header>
        </Label>
        <Label position='right'>
            Member since {memberSince}
          </Label>
        <Segment secondary>
          <Item>
            <Item.Image
              size='small'
              src={image} />
            <Item.Header as='h2'>
              {name}
            </Item.Header>
            <Item.Content>
              <Item.Meta>
                <Icon name='announcement' /> {tagline}
              </Item.Meta>
            </Item.Content>
          </Item>
        </Segment>
        <Menu
          borderless
          as={Segment}>
          <Menu.Item>
            <Icon name='star' /> Rating {rating} / 5.00
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item icon='chevron up' />
            <Menu.Item icon='chevron down' />
          </Menu.Menu>
        </Menu>
        <Segment>
          <Label position='left'>
            <Icon name='phone' /> {phone}
          </Label>
          <Label position='right'>
            <Icon name='envelope' /> {email}
          </Label>
        </Segment>
        <Segment>
          <Header as='h3'>
            About
          </Header>
          {description}
        </Segment>
      </Segment>,
      <div key='sliders'>
        {sliders.map(({ type, collection }) => (
          <Slider
            key={type}
            history={history}
            type={type}
            collection={collection} />
        ))}
      </div>
    ];
  }
}