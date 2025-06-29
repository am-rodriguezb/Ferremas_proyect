// src/App.js
import AppRouter from './router';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext'; // <-- importa AuthProvider
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './css/principal.css'; // Asegúrate de que esta ruta sea correcta

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <AppRouter />
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
