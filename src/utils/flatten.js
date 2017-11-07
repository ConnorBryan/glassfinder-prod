
export default function flatten(object) {
  return Object
    .keys(object)
    .reduce((acc, cur) => {
      acc[cur] = object[cur].value;
      
      return acc;
    }, {});
}