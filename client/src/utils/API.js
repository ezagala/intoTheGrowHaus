import axios from "axios";

export default {
  // Gets all
  getTransaction: function() {
    return axios.get("/api/transactions");
  },
  // Gets w/ specific id
  getTransactions: function(id) {
    return axios.get("/api/transactions/" + id);
  },
  // Deletes w/ specific id 
  deleteTrangetTransaction: function(id) {
    return axios.delete("/api/transactions/" + id);
  },
  // Saves to the DB 
  saveTrangetTransaction: function(transactionData) {
    return axios.post("/api/transactions", transactionData);
  },
  // Creats new user 
  postUser: function(userData) {
    return axios.post("/api/transactions/users", userData); 
  }
};
