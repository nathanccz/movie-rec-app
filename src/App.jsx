import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App = () => {
    useEffect(() => {
        Aos.init({ once: true });
      }, []);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path="/login">
                    <Route index element={<Login />} />
                </Route>
                <Route path="/user">
                    <Route index element={<Dashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
