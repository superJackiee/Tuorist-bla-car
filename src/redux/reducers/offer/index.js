import {
  CREATE_TUTORIAL,
  RETRIEVE_TUTORIALS,
  UPDATE_TUTORIAL,
  DELETE_TUTORIAL,
  DELETE_ALL_TUTORIALS,
} from "../../actions/offer/types";

const initialState = [];

const offerReducer = (offers = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TUTORIAL:
      return [...offers, { id: offers.length, ...payload }];

    // case RETRIEVE_TUTORIALS:
    //   return payload;

    case UPDATE_TUTORIAL:
      const new_offers = offers.map((offer) => {
        if (offer.title === payload.title) {
          return {
            ...offer,
            ...payload,
          };
        } else {
          return offer;
        }
      });

      return new_offers;

    // case DELETE_TUTORIAL:
    //   return offers.filter(({ id }) => id !== payload.id);

    case DELETE_ALL_TUTORIALS:
      return [];

    default:
      return offers;
  }
};

export default offerReducer;
