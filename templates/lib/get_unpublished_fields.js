export default (collection) => {
  const fields = {};
  if (collection.unpublished) {
    collection.unpublished.forEach((field) => {
      fields[field] = 0;
    });
  }
  return {fields};
};
