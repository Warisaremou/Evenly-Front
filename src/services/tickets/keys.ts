// --------------- QUERY & MUTATION KEYS --------------- //
export const ticketsKeys = {
  organizerTickets: ["organizerTickets"],
  eventTickets: (id: string) => ["eventTickets", id],
  addTicket: ["addTicket"],
};
