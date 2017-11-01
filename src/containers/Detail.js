import React, { Component } from 'react';
import {
  Button,
  Card,
  Header,
  Icon,
  Image,
  Label,
  Menu,
  Segment,  
} from 'semantic-ui-react';
import axios from 'axios';

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
    const { history, type } = this.props;
    let { model } = this.props;
    const { sliders } = this.state;
    
    if (!model) model = {};

    const {
      address,
      description,
      email,
      image,
      memberSince,
      name,
      phone,
      rating,
      tagline,
    } = model;

    const iconName = CONSTANTS.ICONS[type];

    return [
      <Card
        color='blue'
        fluid
        key='derp'>
        <Card.Content extra>
          <Label
            ribbon
            color='blue'
            positon='top right'>
            <Header
              as='h3'
              className='fancy'>
              {type}
            </Header>
          </Label>
        </Card.Content>
        
        <Card.Content extra>
          <Label
            icon={iconName}
            color='blue'
            corner='right' />
        </Card.Content>
        
        <Image src={image} />
        
        <Card.Content>
          <Card.Header
            className='fancy'>
            {name}
          </Card.Header>
          <Card.Meta>
            <Icon name='calendar' /> Member since {memberSince}
          </Card.Meta>
        </Card.Content>
        
        <Card.Content extra>
          <Card.Description as={Menu}>
              <Menu.Item>
                <Icon name='star' /> Rating {rating} / 5.00
              </Menu.Item>
              <Menu.Menu position='right'>
                <Menu.Item
                  icon='chevron up'
                  onClick={() => {}} />
                <Menu.Item
                  icon='chevron down'
                  onClick={() => {}} />
              </Menu.Menu>
            </Card.Description>
        </Card.Content>
        
        <Card.Content extra>
          <Card.Description>
            <Icon name='announcement' /> {tagline}
          </Card.Description>
        </Card.Content>
        
        <Card.Content extra>
          <Card.Description>
            <Icon name='phone' /> {phone}
          </Card.Description>
        </Card.Content>

        <Card.Content extra>
          <Card.Description>
            <Icon name='envelope' /> {email}
          </Card.Description>
        </Card.Content>

        {address && (
          <Card.Content extra>
            <Card.Description>
              <Icon name='map pin' /> {address.city}, {address.state}
            </Card.Description>
          </Card.Content>
        )}

        <Card.Content extra>
          <Card.Description>
              <Button
                basic
                fluid>
                 View on map <Icon name='chevron right' />
              </Button>
            </Card.Description>
        </Card.Content>

        <Card.Content extra>
          <Card.Description>
              <Button
                basic
                fluid>
                 View more images <Icon name='chevron right' />
              </Button>
            </Card.Description>
        </Card.Content>
      </Card>,
      <Segment key='about'>
        <Header
          as='h3'
          className='fancy'>
          About
        </Header>
        {description}
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