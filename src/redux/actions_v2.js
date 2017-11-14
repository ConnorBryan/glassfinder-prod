import axios from 'axios';

import CONSTANTS from '../constants';
import { processify } from './actions';

export default {
    /**
     * @func createModel
     * @version v2
     * @param {string} plural
     * @param {object} attributes
     * @desc Retrieve a single model with a given ID.
     */
    v2CreateModel: (plural, attributes) =>
      (dispatch, getState) =>
        processify(dispatch, async () => {
          const { data: { model } } = await (
            axios.post(`${CONSTANTS.V2_API_ROOT}/${plural}`, attributes)
          );

          console.log('Made', model);
    }),

    /**
     * @func getModel
     * @version v2
     * @param {string} singular
     * @param {number} id
     * @desc Retrieve a single model with a given ID.
     */
    v2ReadModel: (singular, id) =>
      (dispatch, getState) =>
        processify(dispatch, async () => {
          const { data: { model } } = await (
            axios.get(`${CONSTANTS.V2_API_ROOT}/${singular}/${id}`)
          );

          console.log('Got', model);
    }),

    /**
     * @func getAllModels
     * @version v2
     * @param {string} plural
     * @param {Array<number>} some
     * @desc Retrieve all models.
     */
    v2ReadSomeModels: (plural, some) =>
      (dispatch, getState) =>
        processify(dispatch, async () => {
          const ids = some.join(',');
          const { data: { models } } = await (
            axios.get(`${CONSTANTS.V2_API_ROOT}/${plural}?ids=${ids}`)
          );

          console.log('Got some', models);
    }),

    /**
     * @func getAllModels
     * @version v2
     * @param {string} plural
     * @desc Retrieve all models.
     */
    v2ReadAllModels: plural =>
      (dispatch, getState) =>
        processify(dispatch, async () => {
          const { data: { models } } = await (
            axios.get(`${CONSTANTS.V2_API_ROOT}/${plural}`)
          );

          console.log('Got all', models);
    }),

    /**
     * @func updateModel
     * @version v2
     * @param {string} singular
     * @param {number} id
     * @param {object} attributes
     * @desc Change a given model's attributes.
     */
    v2UpdateModel: (singular, id, attributes) =>
      (dispatch, getState) =>
        processify(dispatch, async () => {
          const { data: { model } } = await (
            axios.post(`${CONSTANTS.V2_API_ROOT}/${singular}/${id}`, attributes)
          );

          console.log('Updated', model);
    }),

    /**
     * @func destroyModel
     * @version v2
     * @param {string} singular
     * @param {number} id
     * @desc Delete a single model.
     */
    v2DestroyModel: (singular, id) =>
      (dispatch, getState) =>
        processify(dispatch, async () => {
          const { data: { model } } = await (
            axios.delete(`${CONSTANTS.V2_API_ROOT}/${singular}/${id}`)
          );

          console.log('Destroyed', model);
    }),
};