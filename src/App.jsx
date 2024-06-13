import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/App.css";
import HomePage from "./pages/HomePage";
import NoPage from "./pages/NoPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import WorkoutsPage from "./pages/WorkoutsPage";
import TrainersPage from "./pages/TrainersPage";
import TrainerPage from "./pages/TrainerPage";
import AccountPage from "./pages/AccountPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import AuthContext from "./auth/AuthContext";
import { useContext } from "react";
import Navbar from "./components/other/Navbar";
import Recipes from "./pages/Recipes";
import ChatPage from "./pages/ChatPage";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const { user } = useContext(AuthContext);
  const isLogged = !!user;
  const isClient = user?.roles[0] === "CLIENT";
  const isTrainer = user?.roles[0] === "TRAINER";

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/workouts"} element={<WorkoutsPage />} />
        <Route path={"/trainers"} element={<TrainersPage />} />

        <Route path={"/admin"} element={<AdminDashboard />} />

        <Route element={<ProtectedRoute isAllowed={isLogged} />}>
          <Route path={"/account"} element={<AccountPage />} />
          <Route path={"/trainer/:id"} element={<TrainerPage />} />
        </Route>

        <Route
          element={
            <ProtectedRoute isAllowed={isLogged && (isClient || isTrainer)} />
          }
        >
          
        </Route>

        <Route path={"/signin"} element={<SignInPage />} />
        <Route path={"/signup"} element={<SignUpPage />} />
        
        {/* TODO: change the path to protected one  */}
        <Route path={"/chat"} element={<ChatPage />} />
        <Route path={"/recipes/"} element={<Recipes />} />

        <Route path={"*"} element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
