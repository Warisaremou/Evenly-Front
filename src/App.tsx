import { AuthLayout, BoardLayout } from "@/components/layouts";
import QueryProvider from "@/lib/providers/query-client-provider";
import { routes } from "@/lib/routes";
import { Home, NotFound } from "@/pages";
import { AccountBooks, AccountFavorites, AccountProfile } from "@/pages/account";
import { Login, Register } from "@/pages/auth";
import { Event, Events } from "@/pages/events";
import { Route, BrowserRouter as Router, Routes } from "react-router";

export default function App() {
  return (
    <QueryProvider>
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
            <Route path={routes.account.index}>
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

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </Router>
    </QueryProvider>
  );
}
