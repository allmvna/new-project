import { Alert, Container } from "@mui/material";
import AppToolbar from "./components/AppToolbar/AppToolbar";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./features/users/RegisterPage";
import LoginPage from "./features/users/LoginPage";
import Gallery from "./features/photo/Gallery.tsx";

const App = () => {
    return (
        <>
            <header>
                <AppToolbar />
            </header>
            <main>
                <Container>
                    <Routes>
                        <Route path="/" element={<Gallery />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="*"
                            element={<Alert severity="error">Page not found</Alert>}
                        />
                    </Routes>
                </Container>
            </main>
        </>
    );
};

export default App;
