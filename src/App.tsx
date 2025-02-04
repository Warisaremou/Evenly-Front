import { AccountLayout, AuthLayout, BoardLayout, DashboardLayout, EventsManagementLayout } from "@/components/layouts";
import AuthProvider from "@/contexts/auth/provider";
import EventsListProvider from "@/contexts/events/provider";
import AuthGuard from "@/guards/auth";
import QueryProvider from "@/lib/providers/query-client-provider";
import { routes } from "@/lib/routes";
import { Home, NotFound } from "@/pages";
import { AccountBooks, AccountFavorites, AccountProfile } from "@/pages/account";
import { Login, Register } from "@/pages/auth";
import { DashboardOrders, DashboardProfile, DashboardTickets } from "@/pages/dashboard";
import { DashboardAddEvent, DashboardAddTickets, DashboardEditEvent, DashboardEvents } from "@/pages/dashboard/events";
import { Event, Events } from "@/pages/events";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import { Toaster } from "sonner";

export default function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <EventsListProvider>
          <Router>
            <Routes>
              {/* Home Routes */}
              <Route
                path={routes.index}
                element={<BoardLayout />}
              >
                <Route
                  index
                  element={<Home />}
                />
                {/* Events Routes */}
                <Route path={routes.events.index}>
                  <Route
                    index
                    element={<Events />}
                  />
                  <Route
                    path={routes.events.eventDetails}
                    element={<Event />}
                  />
                </Route>
                {/* Account Routes */}
                <Route element={<AuthGuard />}>
                  <Route
                    path={routes.account.index}
                    element={<AccountLayout />}
                  >
                    <Route
                      path={routes.account.profile}
                      element={<AccountProfile />}
                    />
                    <Route
                      path={routes.account.books}
                      element={<AccountBooks />}
                    />
                    <Route
                      path={routes.account.favorites}
                      element={<AccountFavorites />}
                    />
                  </Route>
                </Route>
              </Route>
              <Route element={<AuthGuard />}>
                {/* Authentication Routes */}
                <Route element={<AuthLayout />}>
                  <Route
                    path={routes.auth.login}
                    element={<Login />}
                  />
                  <Route
                    path={routes.auth.register}
                    element={<Register />}
                  />
                </Route>
                {/* Dashboard Routes */}
                <Route
                  path={routes.dashboard.index}
                  element={<DashboardLayout />}
                >
                  {/* Dashboard Events Routes */}
                  <Route path={routes.dashboard.events.index}>
                    <Route
                      index
                      element={<DashboardEvents />}
                    />
                    <Route element={<EventsManagementLayout />}>
                      <Route
                        path={routes.dashboard.events.addEvent}
                        element={<DashboardAddEvent />}
                      />
                      <Route
                        path={routes.dashboard.events.editEvent}
                        element={<DashboardEditEvent />}
                      />
                      <Route
                        path={routes.dashboard.events.addTickets}
                        element={<DashboardAddTickets />}
                      />
                    </Route>
                  </Route>
                  {/* Dashboard Tickets Routes */}
                  <Route
                    path={routes.dashboard.tickets.index}
                    element={<DashboardTickets />}
                  />
                  {/* Dashboard Orders Routes */}
                  <Route
                    path={routes.dashboard.orders.index}
                    element={<DashboardOrders />}
                  />
                  {/* Dashboard Profile Routes */}
                  <Route
                    path={routes.dashboard.profile.index}
                    element={<DashboardProfile />}
                  />
                </Route>
              </Route>
              <Route
                path="*"
                element={<NotFound />}
              />
            </Routes>
          </Router>
          <Toaster
            richColors
            toastOptions={{
              className: "p-4",
            }}
          />
        </EventsListProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
