// --------------- QUERY & MUTATION KEYS --------------- //
export const eventsKeys = {
  events: ["events"],
  event: (id: string) => ["events", id],
  addEvent: ["addEvent"],
  updateEvent: (id: string) => ["updateEvent", id],
  cancelEvent: (id: string) => ["cancelEvent", id],
};
