export const routes = {
  index: "/",
  events: {
    index: "events",
    eventDetails: ":id_event",
  },
  account: {
    index: "profile",
    books: "profile/books",
    favorites: "profile/favorites",
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
