import axios from 'axios';
import S from 'string';

import CONSTANTS from '../constants';

/**
 * @function generateReduxConfigFromModels
 * @desc Abstracts over the Redux boilerplate process for common themes across models.
 * @param {Array<object>} MODELS 
 * @param {object} ACTION_TYPES 
 * @param {object} ACTIONS 
 * @param {object} INITIAL_STATE 
 * @param {object} HANDLERS 
 */
export default function generateReduxConfigFromModels(MODELS, ACTION_TYPES, ACTIONS, INITIAL_STATE, HANDLERS) {
    MODELS.forEach(model => {
      const { singular, plural } = model;

      const capitalizedSingular = S(singular).capitalize();
      const capitalizedPlural = S(plural).capitalize();
      const uppercasePlural = capitalizedPlural.toUpperCase();

      const SET_MODELS = `SET_${uppercasePlural}`;
      const SET_MODEL = 'SET_MODEL';
      const getModels = `get${capitalizedPlural}`;
      const setModels = `set${capitalizedPlural}`;
      const getModel = `get${capitalizedSingular}`;
      const setModel = `set${capitalizedSingular}`;
      
      INITIAL_STATE[plural] = [];
      ACTION_TYPES[SET_MODELS] = SET_MODELS;
      ACTIONS[setModels] = data => ({ type: ACTION_TYPES[SET_MODELS], [plural]: data });
      ACTIONS[setModel] = data => ({ type: ACTION_TYPES[SET_MODEL], model: data });
      ACTIONS[getModels] = (sort, reversed) => async (dispatch, getState) => {
        dispatch(ACTIONS.setLoading(true));

        const { page } = getState();

        try {
          let path = `${CONSTANTS.API_ROOT}/${plural}?`;

          path += `page=${page}&`;

          if (sort) path += `sort=${sort}&`;
          if (reversed) path += `reversed=${reversed}`;
          console.log('path', path)
          const { data: { collection, collectionSize } } = await axios.get(path);
          
          dispatch(ACTIONS[setModels](collection));
          dispatch(ACTIONS.setModelType(plural));
          dispatch(ACTIONS.setCollectionSize(collectionSize));
        } catch (e) {
          dispatch(ACTIONS.setError({
            error: e,
            message: `Unable to fetch ${plural}`,
          }));
        } finally {
          dispatch(ACTIONS.setLoading(false));
        }
      };
      ACTIONS[getModel] = id => async (dispatch, getState) => {
        dispatch(ACTIONS.setLoading(true));

        try {
          const { data } = await axios.get(`${CONSTANTS.API_ROOT}/${singular}/${id}`);

          dispatch(ACTIONS[setModel](data));
          dispatch(ACTIONS.setModelType(singular));
        } catch (e) {
          dispatch(ACTIONS.setError({
            error: e,
            message: `Unable to fetch ${singular} with ID ${id}`,
          }));          
        } finally {
          dispatch(ACTIONS.setLoading(false));        
        }
      };
      HANDLERS[SET_MODELS] = (state, { [plural]: data }) => ({ ...state, [plural]: data });      
    });
}