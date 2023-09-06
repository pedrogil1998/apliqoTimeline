import { getDateFromObj } from "../utils/utils";
import {
  child,
  get,
  ref,
  push,
  set,
  remove,
} from "firebase/database";
import { db } from "../../firebase";


export const getCardList = async (setItems) => {
  const dbRef = ref(db);
  get(child(dbRef, `events`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let data = snapshot.val();
        for (const key in data) {
          data[key].index = key;
        }

        setItems(
          Object.values(data)?.sort(
            (a, b) =>
              Date.parse(getDateFromObj(a)) - Date.parse(getDateFromObj(b))
          )
        );
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const postNewCard = async (newItem, setItems) => {
  const dbRef = ref(db, "events");
  const postRef = push(dbRef);

  set(postRef, newItem)
    .then(function (response) {
      getCardList(setItems);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const deleteCard = async (id, setItems) => {
  const dbRef = ref(db, "events/" + id);
  remove(dbRef)
    .then(function (response) {
      getCardList(setItems);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const updateCard = async (id, newItem, setItems) => {
  deleteCard(id, setItems);
  postNewCard(newItem, setItems);
};