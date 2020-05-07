import {
  GET_TRANSACTIONS,
  GET_TRANSACTION,
  UPDATE_TRANSACTION,
  CREATE_TRANSACTION,
} from "../_constants";
import { API, setAuthToken } from "../config/API";

export const getTransactions = (data, level) => {
  return {
    type: GET_TRANSACTIONS,
    payload: async () => {
      try {
        setAuthToken(localStorage.getItem("token"));
        let transcs = {};
        if (level === "owner") {
          transcs = await API.get(`/orders${data ? data : ""}`);
        } else {
          transcs = await API.get(`/transactions${data ? data : ""}`);
        }
        return transcs.data;
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export const getTransaction = (id) => {
  return {
    type: GET_TRANSACTION,
    payload: async () => {
      try {
        setAuthToken(localStorage.getItem("token"));
        const transc = await API.get(`/transaction/${id}`);
        return transc.data;
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export const updateTransaction = (id, status) => {
  return {
    type: UPDATE_TRANSACTION,
    payload: async () => {
      try {
        setAuthToken(localStorage.getItem("token"));
        const transc = await API.patch(`/transaction/${id}`, {
          status,
        });
        return transc.data;
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export const createTransaction = (data) => {
  return {
    type: CREATE_TRANSACTION,
    payload: async () => {
      try {
        setAuthToken(localStorage.getItem("token"));
        const transc = await API.post("/transaction", data);
        return transc.data;
      } catch (error) {
        console.log(error);
      }
    },
  };
};
