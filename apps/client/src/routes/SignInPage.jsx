import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authAPI } from '../api/auth.api';
import { useAuthStore } from '../store/auth.store';
import { useUIStore } from '../store/ui.store';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

export const SignInPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const setAuth = useAuthStore((state) => state.setAuth);
  const showNotification = useUIStore((state) => state.showNotification);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await authAPI.signIn({ email, password });
      setAuth(response.data.user, response.data.token);
      showNotification('Signed in successfully!', 'success');
      navigate('/');
    } catch (error) {
      showNotification(error.message || 'Sign in failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">{t('auth.signInTitle')}</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            label={t('auth.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
          />

          <Input
            type="password"
            label={t('auth.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : t('common.signIn')}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {t('auth.dontHaveAccount')}{' '}
            <Link to="/signup" className="text-primary-600 hover:underline font-medium">
              {t('common.signUp')}
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};
