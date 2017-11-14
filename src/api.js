import axios from 'axios';

import CONSTANTS from './constants';

export default {
    /**
     * @async
     * @func createModel
     * @version v2
     * @param {string} plural
     * @param {object} attributes
     * @returns {object}
     * @desc Retrieve a single model with a given ID.
     */
    v2CreateModel: async (plural, attributes) => {
      const { data: { model } } = await (
        axios.post(`${CONSTANTS.V2_API_ROOT}/${plural}`, attributes)
      );

      return model;
    },

    /**
     * @async
     * @func getModel
     * @version v2
     * @param {string} singular
     * @param {number} id
     * @returns {object}
     * @desc Retrieve a single model with a given ID.
     */
    v2ReadModel: async (singular, id) => {
      const { data: { model } } = await (
        axios.get(`${CONSTANTS.V2_API_ROOT}/${singular}/${id}`)
      );

      return model;
    },

    /**
     * @async
     * @func getAllModels
     * @version v2
     * @param {string} plural
     * @param {Array<number>} some
     * @desc Retrieve all models.
     * @returns {Array<object>}
     */
    v2ReadSomeModels: async (plural, some) => {
      const ids = some.join(',');
      const { data: { models } } = await (
        axios.get(`${CONSTANTS.V2_API_ROOT}/${plural}?ids=${ids}`)
      );

      return models;
    },

    /**
     * @async
     * @func getAllModels
     * @version v2
     * @param {string} plural
     * @returns {object}
     * @desc Retrieve all models.
     */
    v2ReadAllModels: async (plural, page, perPage) => {
      const { data: { models, pageCount } } = await (
        axios.get(`${CONSTANTS.V2_API_ROOT}/${plural}?page=${page}&perPage=${perPage}`)
      );

      return { models, pageCount };
    },

    /**
     * @async
     * @func updateModel
     * @version v2
     * @param {string} singular
     * @param {number} id
     * @param {object} attributes
     * @returns {object}
     * @desc Change a given model's attributes.
     */
    v2UpdateModel: async (singular, id, attributes) => {
      const { data: { model } } = await (
        axios.post(`${CONSTANTS.V2_API_ROOT}/${singular}/${id}`, attributes)
      );

      return model;
    },

    /**
     * @async
     * @func destroyModel
     * @version v2
     * @param {string} singular
     * @param {number} id
     * @returns {number}
     * @desc Delete a single model.
     */
    v2DestroyModel: async (singular, id) => {
      const { data: { model } } = await (
        axios.delete(`${CONSTANTS.V2_API_ROOT}/${singular}/${id}`)
      );

      return model;
    },
};