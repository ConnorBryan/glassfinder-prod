
/**
 * @func flatten
 * @desc Transform this:
 *  {
 *    description: {
 *      value: 'Foo',
 *      editable: false,
 *    },
 *  }
 * 
 * To this:
 * {
 *    description: 'Foo',
 * }
 * @param {object} object 
 */
export default function flatten(object) {
  return Object
    .keys(object)
    .reduce((acc, cur) => {
      acc[cur] = object[cur].value;
      
      return acc;
    }, {});
}