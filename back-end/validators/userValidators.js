const validateRequiredFields = (fields) => {
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined || value === null || value.trim() === "") {
      throw new Error(`O campo "${key}" é obrigatório.`);
    }
  }
};

const idValidator = (id) => {
  if (isNaN(id)) {
    throw new Error("ID inválido.");
  }
};

export { validateRequiredFields, idValidator };
