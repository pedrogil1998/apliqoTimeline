import axios from "axios";

export const getCardList = async (setItems) => {
  await axios
    .get("/events")
    .then((res) => setItems(res.data))
    .catch((err) => console.log(err));
};

export const postNewCard = async (newItem, setItems) => {
  await axios
    .post("/events", newItem)
    .then(function (response) {
      console.log(response);
      getCardList(setItems);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const deleteCard = async (id, setItems) => {
  await axios
    .delete("/events/" + id)
    .then((response) => {
      console.log(response);
      getCardList(setItems);
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
};

export const updateCard = async (id, newItem, setItems) => {
  await axios
    .put("/events/" + id, newItem)
    .then((response) => {
      console.log(response);
      getCardList(setItems);
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
};
