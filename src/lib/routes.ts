export const routes = {
  index: "/",
  events: {
    index: "events",
    eventDetails: ":id_event",
  },
  account: {
    index: "account/",
    profile: "profile",
    books: "books",
    favorites: "favorites",
    security: "security",
  },
  auth: {
    login: "login",
    register: "register",
    validateOtp: "validateOtp/:id_user",
  },
  dashboard: {
    index: "dashboard/",
    events: {
      index: "events",
      addEvent: "add-event",
      editEvent: ":id_event/edit",
      addTickets: ":id_event/add-tickets",
    },
    tickets: {
      index: "tickets",
    },
    orders: {
      index: "orders",
    },
    profile: {
      index: "profile",
    },
  },
};
