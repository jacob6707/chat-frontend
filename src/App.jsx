import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { HiCheckCircle, HiXCircle } from "react-icons/hi2";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { theme } from "twin.macro";
import AppLayout from "./pages/AppLayout";
import Channel from "./pages/Channel";
import Friends from "./pages/Friends";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./ui/ProtectedRoute";
import Spinner from "./ui/Spinner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-left" />
      {/* <GlobalStyles /> */}
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Spinner />} />
            <Route path="friends" element={<Friends />} />
            <Route path="channels" element={<Navigate to="/app" />} />
            <Route path="channels/:id" element={<Channel />} />
          </Route>
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-right"
        gutter={12}
        containerStyle={{
          margin: "8px",
          maxHeight: "90dvh",
          minWidth: 0,
        }}
        toastOptions={{
          success: {
            duration: 3000,
            icon: <HiCheckCircle size={24} fill={theme`colors.green.500`} />,
          },
          error: {
            duration: 5000,
            icon: <HiXCircle size={24} fill={theme`colors.red.500`} />,
          },
          style: {
            background: theme`colors.gray.800`,
            color: theme`colors.white`,
            minWidth: 0,
            maxWidth: "40%",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
