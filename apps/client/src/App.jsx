import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Notification } from './components/ui/Notification';
import {
  HomePage,
  ProductPage,
  MixerPage,
  CartPage,
  CheckoutPage,
  SignInPage,
  SignUpPage,
} from './routes';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Notification />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/mixer" element={<MixerPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
