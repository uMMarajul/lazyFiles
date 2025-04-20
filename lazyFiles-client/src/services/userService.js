import axios from "../api/axios";

export const loginWithGoogle = async (token) => {
    try{
        const res = await axios.post("/users/login", { token });
        return res.data;
    }catch(err){
        return err;
    }
};

export const logout = async () => {
    try{
        const res = await axios.post("/users/logout");
        return res.data;
    }catch(err){
        return err;
    }
};

export const getProfile = async () => {
    try{
        const res = await axios.get("/users/me");
        return res.data;
    }catch(err){
        return err;
    }
}