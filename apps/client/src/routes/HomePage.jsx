import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-gold-50 to-primary-50 opacity-50" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-6">
            {t('home.title')}
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 mb-4">
            {t('home.subtitle')}
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            {t('home.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button variant="primary" className="text-lg px-8 py-4">
                {t('home.exploreProducts')}
              </Button>
            </Link>
            <Link to="/mixer">
              <Button variant="secondary" className="text-lg px-8 py-4">
                {t('home.createMix')}
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-12"
          >
            {t('home.featured')}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🌿', title: 'Natural Oils', desc: 'Premium essential oils' },
              { icon: '🪴', title: 'Fresh Herbs', desc: 'Organic dried herbs' },
              { icon: '⚗️', title: 'Custom Mixes', desc: 'Create your blend' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition"
              >
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
