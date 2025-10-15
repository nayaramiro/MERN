import News from "../models/News.js";

const createService = (body) => News.create(body);
// on find dans la db de manière décroissante p/r au id et skip pour skipper de combien et limiter par 5 par ex
//populate sert à faire la jointure entre l'id et mon user pour savoir qui a créé la news
const findAllService = (limit, offset) =>
  News.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate("user", "name username avatar");

//compte combien de document nous avons dans cette table
const countNews = () => News.countDocuments();

export { createService, findAllService, countNews };
