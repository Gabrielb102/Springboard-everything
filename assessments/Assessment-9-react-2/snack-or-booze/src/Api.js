import axios from "axios";

const BASE_API_URL = "http://localhost:5000";

/* 
  json-server will give you CRUD endpoints on snacks and drinks.
  Here we've provided you with a single action to get all drinks.

  You'll need to add to this class as you build features for the app.
*/

class SnackOrBoozeApi {

  static async getMenu() {
    const snacks = await axios.get(`${BASE_API_URL}/snacks`);
    const drinks = await axios.get(`${BASE_API_URL}/drinks`);
    return {snacks: snacks.data, drinks: drinks.data};
  }

  static async postNewItem(item, category) {
    try {
      if (category.toLowerCase() === "snacks") {
        console.log("snacks worked, item object: ", item);
        const newSnack = await axios.post(`${BASE_API_URL}/snacks`, {...item});
        return newSnack.data;
      }
      if (category.toLowerCase() === "drinks") {
        const newDrink = await axios.post(`${BASE_API_URL}/drinks`, {...item});
        return newDrink.data;
      }
    } catch (err) {
      console.error("it didn't work Gabriel :(((((((((", err);
    }
  }

}

export default SnackOrBoozeApi;
