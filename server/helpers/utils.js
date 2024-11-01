const emptyOrRows = (result) => {
  if (!result) {
    return result.rows;
  }
};

export { emptyOrRows };
