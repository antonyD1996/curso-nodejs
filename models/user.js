import bcrypt from "bcrypt";
import queryer from "../storage/queryer.js";

export default class User {
  constructor(firstName, lastName, email, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  hashPassword = (textPlain) => {
    return bcrypt.hashSync(textPlain, 8);
  };

  values = () => {
    return [
      this.firstName,
      this.lastName,
      this.email,
      this.hashPassword(this.password),
    ];
  };

  save = async () => {
    try {
      const res = await queryer.exec(
        "INSERT INTO anty_user(first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
        ...this.values
      );
      return User.hydrate(res.rows).pop();
    } catch (error) {
      return err;
    }
  };

  static hydrate = (rows) => {
    return rows.map((r) => {
      return {
        id: r.id,
        first_name: r.first_name,
        last_name: r.last_name,
        email: r.email,
        email_verified: r.email_verified,
        modified: r.modified,
        created: r.created,
      };
    });
  };

  static isPassWordValid = async (password, hash) => {
    try {
      const valid = await bcrypt.compare(password, hash);
      return valid;
    } catch (error) {
      return err;
    }
  };

  static findByEmailAndComparePassword = async (email, password) => {
    try {
      const res = queryer.exec(
        "SELECT * FROM anty_user WHERE email = $1",
        email
      );
      if (res.rowCount === 0) return { valid: false, found: false, user: null };
      const valid = this.isPassWordValid(password, res.rows[0].password);
      return { valid: valid, found: true, user: this.hydrate(res.row).pop() };
    } catch (error) {
      return err
    }
  };
}
