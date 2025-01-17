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
    events: {
      index: "dashboard/events",
      addEvent: "dashboard/events/add-event",
      addTicket: "dashboard/events/add-tickets",
    },
    tickets: {
      index: "dashboard/tickets",
    },
    orders: {
      index: "dashboard/orders",
    },
    profile: {
      index: "dashboard/profile",
    },
  },
};
