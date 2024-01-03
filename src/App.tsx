import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import Home from "./pages/Home";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import "./scss/App.scss";
import NonFound from "./pages/NonFound";
import AuthProvider, { useAuth } from "./components/auth/Auth";
import SignIn from "./components/auth/SingIn";
import SignUp from "./components/auth/SignUp";
import Profile from "./pages/Profile";
import Order from "./pages/Order";

function App() {
  const location = useLocation();
  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1, // повторяти при помилці
        staleTime: Infinity,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="wrapper">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/log-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/order" element={<Order />} />
              <Route path="*" element={<NonFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
