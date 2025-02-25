// --------------- QUERY & MUTATION KEYS --------------- //
export const ticketsKeys = {
  organizerTickets: ["organizerTickets"],
  eventTickets: (id: string) => ["eventTickets", id],
  ticketTypes: ["ticketTypes"],
  addTicket: ["addTicket"],
  updateTicket: (id: string) => ["updateTicket", id],
  removeTicket: (id: string) => ["removeTicket", id],
};
