import queryer from "../storage/queryer.js";

export default class Post {
  constructor(title, body, userId) {
    this.title = title;
    this.body = body;
    this.userId = userId;
  }

  values = () => {
    return [this.title, this.body, this.userId];
  };

  save = async () => {
    try {
      const res = await queryer.exec(
        "INSERT INTO post (title, body, user_id) VALUES($1, $2, $3) RETURNING * ",
        ...this.values()
      );
      return Post.hydrate(res.rows).pop();
    } catch (error) {
      return err;
    }
  };

  static find = async () => {
    try {
      const res = await queryer.exec("SELECT * FROM post");
      if (res.rowCount == 0) return [];
      return this.hydrate(res.rows);
    } catch (error) {
      return;
    }
  };

  static findById = async (id) => {
    try {
      const res = await queryer.exec("SELECT * FROM post WHERE id=$1", id);
      if (res.rowCount === 0) return [];
      return this.hydrate(res.rows).pop();
    } catch (error) {
      return;
    }
  };

  static hydrate = (rows) => {
    return rows.map((r) => {
      return {
        id: r.id,
        title: r.title,
        body: r.body,
        modified: r.modified,
        created: r.created,
      };
    });
  };
}
