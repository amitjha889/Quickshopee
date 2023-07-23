import axios from "axios";
const serverURL = "http://localhost:5000";

const postdata = async (url,body) => {
  try {
    var response = await axios.post(`${serverURL}/${url}`,body);
    var result = await response.data;
    return result;
  } catch (e) {
    return null;
  }
};

const getdata = async (url) => {
  try {
    var response = await axios.get(`${serverURL}/${url}`);
    var result = await response.data;
    return result;
  } catch (e) {
    return null;
  }
};

export { serverURL, postdata, getdata };
