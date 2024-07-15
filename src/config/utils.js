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
    console.log("Objeto: ", object);
    const jsonParse = JSON.stringify(object);
    try {
      const response = await fetch(
        `${API_URL}/${endPoint}`,
        this.option(method, jsonParse)
      );

      if (!response.ok) {
        throw new Error(`Erro na requisição. EndPoint: ${API_URL}/${endPoint}`);
      }

      if (method == "POST" || method == "PUT") {
        return true;
      }

      return await response.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export default Utils;
