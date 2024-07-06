const service = require("../service");

const get = async (req, res, next) => {
  try {
    const results = await service.getAllContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: results,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await service.getContactById(id);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: {
          contact: result,
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not found",
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const create = async (req, res, next) => {
  const { title, text } = req.body;
  try {
    const result = await service.createContact({ title, text });
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        contact: result,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { title, text } = req.body;
  try {
    const result = await service.updateContact(id, { title, text });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: {
          contact: result,
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not found",
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const favorite = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  try {
    const result = await service.favorite(contactId, favorite);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: {
          contact: result,
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: "Not found",
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await service.deleteContact(id);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: {
          contact: result,
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not found",
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  get,
  getById,
  create,
  update,
  favorite,
  remove,
};
