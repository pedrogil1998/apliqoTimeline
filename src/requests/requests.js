import axios from "axios";
import { getDateFromObj } from "../utils/utils";
import {
  child,
  get,
  getDatabase,
  ref,
  push,
  set,
  remove,
  update,
} from "firebase/database";
import { db } from "../../firebase";

// export const getCardList = async (setItems) => {
//   await axios
//     .get("/events")
//     .then((res) =>
//       setItems(
//         res.data.sort(
//           (a, b) =>
//             Date.parse(getDateFromObj(a)) -
//             Date.parse(getDateFromObj(b))
//         )
//       )
//     )
//     .catch((err) => console.log(err));
// };

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

// export const postNewCard = async (newItem, setItems) => {
//   await axios
//     .post("/events", newItem)
//     .then(function (response) {
//       console.log(response);
//       getCardList(setItems);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

export const postNewCard = async (newItem, setItems) => {
  const dbRef = ref(db, "events");
  const postRef = push(dbRef);

  set(postRef, newItem)
    .then(function (response) {
      console.log(response);
      getCardList(setItems);
    })
    .catch(function (error) {
      console.log(error);
    });
};

// export const deleteCard = async (id, setItems) => {
//   await axios
//     .delete("/events/" + id)
//     .then((response) => {
//       console.log(response);
//       getCardList(setItems);
//     })
//     .catch((error) => {
//       console.error("There was an error!", error);
//     });
// };

export const deleteCard = async (id, setItems) => {
  const dbRef = ref(db, "events/" + id);
  remove(dbRef)
    .then(function (response) {
      console.log(response);
      getCardList(setItems);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const updateCard = async (id, newItem, setItems) => {
  // // const dbRef = ref(db);
  deleteCard(id, setItems);
  postNewCard(newItem, setItems);

  // update(dbRef, newItem)
  //   .then(function (response) {
  //     console.log(response);
  //     getCardList(setItems);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  // // Get a key for a new Post.

  // Write the new post's data simultaneously in the posts list and the user's post list.
  // const updates = {};
  // updates["/events/" + id] = newItem;

  // return update(dbRef, updates);
};

// export const updateCard = async (id, newItem, setItems) => {
//   await axios
//     .put("/events/" + id, newItem)
//     .then((response) => {
//       console.log(response);
//       getCardList(setItems);
//     })
//     .catch((error) => {
//       console.error("There was an error!", error);
//     });
// };
