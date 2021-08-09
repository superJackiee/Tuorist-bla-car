import {
  CREATE_TUTORIAL,
  RETRIEVE_TUTORIALS,
  UPDATE_TUTORIAL,
  DELETE_TUTORIAL,
  DELETE_ALL_TUTORIALS,
} from "./types";

// import TutorialDataService from "../services/TutorialService";
// import { useDispatch, useSelector } from "react-redux";

export const createTutorial = (title, description) => async (dispatch) => {
  try {
    // const res = await TutorialDataService.create({ title, description });

    dispatch({
      type: CREATE_TUTORIAL,
      payload: {
        title,
        description,
      },
    });

    return Promise.resolve({});
  } catch (err) {
    return Promise.reject(err);
  }
};

// export const retrieveTutorials = () => async (dispatch) => {
//   try {
//     const res = await TutorialDataService.getAll();

//     dispatch({
//       type: RETRIEVE_TUTORIALS,
//       payload: res.data,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const updateTutorial = (id, data) => async (dispatch) => {
//   try {
//     const res = await TutorialDataService.update(id, data);

//     dispatch({
//       type: UPDATE_TUTORIAL,
//       payload: data,
//     });

//     return Promise.resolve(res.data);
//   } catch (err) {
//     return Promise.reject(err);
//   }
// };

// export const deleteTutorial = (id) => async (dispatch) => {
//   try {
//     await TutorialDataService.remove(id);

//     dispatch({
//       type: DELETE_TUTORIAL,
//       payload: { id },
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

export const deleteAllTutorials = () => async (dispatch) => {
  try {
    // const res = await TutorialDataService.removeAll();

    dispatch({
      type: DELETE_ALL_TUTORIALS,
      payload: {},
    });

    return Promise.resolve({});
  } catch (err) {
    return Promise.reject(err);
  }
};

// export const findTutorialsByTitle = (title) => {
// try {
// const res = await TutorialDataService.findByTitle(title);
// dispatch({
//   type: RETRIEVE_TUTORIALS,
//   payload: { title },
// });

// const tutorials = useSelector((state) => state.tutorials);
// for (const tutorial of tutorials) {
//   if (tutorial.title === title) {
//     return tutorial.description;
//   }
// }
// return null;
// } catch (err) {
//   console.log(err);
//   // }
// };

export const updateTutorialsByTitle =
  (title, description) => async (dispatch) => {
    try {
      // const res = await TutorialDataService.findByTitle(title);
      dispatch({
        type: UPDATE_TUTORIAL,
        payload: { title, description },
      });
    } catch (err) {
      console.log(err);
    }
  };
