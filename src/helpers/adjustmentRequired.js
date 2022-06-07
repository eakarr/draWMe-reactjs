// If the type selected either line or rectangle then adjustment is required.
const adjustmentRequired = (type) => {
  return ["line", "rectangle"].includes(type);
};

export default adjustmentRequired;
