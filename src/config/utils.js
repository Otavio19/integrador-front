class Utils {

    option = (method, object) =>{
      return {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      }
    }
}

export default Utils