import { TOKEN, API_URL, USER_ID } from "./api";

class Utils {
  option = (method, object) => {
    return {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: object,
    };
  };

  fetchObjetct = async (endPoint, method, object) => {
    const jsonParse = JSON.stringify(object);

    try {
      const response = await fetch(
        `${API_URL}/${endPoint}`,
        this.option(method, jsonParse)
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export default Utils;
