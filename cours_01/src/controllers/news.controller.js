import {
  createService,
  findAllService,
  countNews,
} from "../services/news.service.js";

const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;

    if (!title || !text || !banner) {
      res.status(400).send({
        message: "Submit all fields for registration",
      });
    }

    console.log("req.userID avant createService:", req.userID); 

    await createService({
      title,
      text,
      banner,
      user: req.userID,
    });
    res.status(201).send({
      message: "Created new news",
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  let { limit, offset } = req.query;
  // nous devons tronsfomrer limit et offet en un nombre car tout ce qui vient de query est un string de base
  limit = Number(limit);
  offset = Number(offset);

  if (!limit) {
    limit = 5;
  }
  if (!offset) {
    offset = 0;
  }

  const news = await findAllService(limit, offset);

  const total = await countNews();
  const currentUrl = req.baseUrl;

  const next = offset + limit;
  const nextUrl =
    next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

  const previous = offset - limit < 0 ? null : offset - limit;
  const previousUrl =
    previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;
  if (news.length === 0) {
    return res.status(400).send({
      message: "There are no registered news",
    });
  }
  res.send({
    nextUrl,
    previousUrl,
    limit,
    offset,
    total,
    results: news.map((item) => {
      console.log(item);

      return {
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user ? item.user.name : null,
        userName: item.user ? item.user.username : null,
        avatar: item.user ? item.user.avatar : null,
      };
    }),
  });
  
};

export { create, findAll };
