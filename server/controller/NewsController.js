import NewsModel from "../model/NewsModel.js";

export const create = async (req, res) => {
  try {
    const newsData = await NewsModel(req.body);
    res.status(200).json(newsData);
   
  } catch (error) {
    res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
};

export const fetch = async (req, res) => {
  try {
    return res.json("Hello World");
  } catch (error) {
    res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
};
