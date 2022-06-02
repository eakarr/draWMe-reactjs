// distance function allows us to calculate the differences between the x,y values.
const distance = (a, b) =>
  Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

  export default distance;