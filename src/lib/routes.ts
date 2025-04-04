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
  },
  auth: {
    login: "login",
    register: "register",
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
