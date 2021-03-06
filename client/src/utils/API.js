import axios from "axios";

export default {
  // Gets all
  getTransactions: function() {
    return axios.get("/api/transactions");
  },
  // Gets w/ specific id
  getTransaction: function(id) {
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
  query: function(conditions) {
    return axios.get("/api/transactions/query", {
      params: {
        startDate: conditions.startDate, 
        endDate: conditions.endDate, 
        customer: conditions.customer
      }
    }); 
  }
};
