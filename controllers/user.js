import User from "../models/user.js";

export const getUser = (req, res)=>{
    
};
export const updateUser = (req, res)=>{

};
export const deleteUser = (req, res)=>{
try {
    const deleteUser = User.deleteById(req.params.id)

    return res.send({status: "success", deletedUser:deleteUser})
} catch (error) {
    return res
      .status(500)
      .send({ status: "error", message: "Something went wrong" });
}
};

export default {getUser, updateUser, deleteUser}