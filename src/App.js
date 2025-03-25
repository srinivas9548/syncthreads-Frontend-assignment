import { BrowserRouter, Route, Routes } from 'react-router-dom'

import LoginPage from './components/LoginPage'
import Home from './components/Home'
import MapView from './components/MapView'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>
            } />
            <Route path="/map/:id" element={
                <ProtectedRoute>
                    <MapView />
                </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
)

export default App