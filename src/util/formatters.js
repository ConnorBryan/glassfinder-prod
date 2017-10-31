/**
 * @overview Formatters
 * Transform the model string to a different grammatical form.
 */
import S from 'string';

import MODELS from '../models';

/** headshops -> headshop */
export const getModelSingular = plural => (
  MODELS.filter(model => model.plural === plural).map(model => model.singular)[0] || null
)

/** headshop -> headshops */
export const getModelPlural = singular => (
  MODELS.filter(model => model.singular === singular).map(model => model.plural)[0] || null
)

/** headshop -> getHeadshop */
export const getModelGetter = model => `get${S(model).capitalize()}`
