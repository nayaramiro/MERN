import {
  createService,
  findAllService,
  countNews,
  topNewsService,
  findByIdService,
  findByTitleService,
  findByUserService,
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
  try {
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
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;
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
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }
};

const topNews = async (req, res) => {
  try {
    const news = await topNewsService();

    if (!news) {
      return res.status(400).send({ message: "There is no registered post" });
    }

    res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user ? news.user.name : null,
        userName: news.user ? news.user.username : null,
        avatar: news.user ? news.user.avatar : null,
      },
    });
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }
};

export const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await findByIdService(id);
    return res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user ? news.user.name : null,
        userName: news.user ? news.user.username : null,
        avatar: news.user ? news.user.avatar : null,
      },
    });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

export const findByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    const news = await findByTitleService(title);
    console.log(news);
    if (news.length === 0) {
      return res.status(400).send({ message: "No news with this search" });
    }

    res.send({
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
  } catch (err) {
    return res.status(400).send({ messages: err.message });
  }
};

export const findByUser = async (req, res) => {
  try {
    // cela vient du middleware
    const id = req.userID;
    console.log(id)
    const news = await findByUserService(id);

    res.send({
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
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

export { create, findAll, topNews };
