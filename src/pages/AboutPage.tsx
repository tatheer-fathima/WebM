import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Heart, Shield, Zap } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-500 to-accent-600">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            className="text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About WebM</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              The story behind your favorite bookmark manager
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex justify-center mb-8">
                <Bookmark className="w-16 h-16 text-primary-600" />
              </div>
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">Our Story</h2>
              <div className="grid grid-cols-5 sm:grid-cols-5 lg:grid-cols-1 gap-5 p-10">
  <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-5 rounded-xl shadow-md">
    <h3 className="text-xl font-semibold mb-2">📌 Scattered Bookmarks</h3>
    <p className="text-base"> WebM was born out of a simple frustration: the existing bookmark tools weren't meeting our needs.
      As avid web users, we constantly struggled to organize and find our saved sites across different
      browsers and devices.</p>
  </div>

  <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-5 rounded-xl shadow-md">
    <h3 className="text-xl font-semibold mb-2">🧠 No Smart Organization</h3>
    <p className="text-base">Traditional tools lacked proper folders, tags, or easy filtering.</p>
  </div>

  <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-5 rounded-xl shadow-md">
    <h3 className="text-xl font-semibold mb-2">🌐 One Dashboard</h3>
    <p className="text-base">From students to professionals, from casual browsers to power users – WebM is
    designed for everyone who values an organized digital life.</p>
  </div>

  <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-5 rounded-xl shadow-md">
    <h3 className="text-xl font-semibold mb-2">⚡ Fast, Anywhere</h3>
    <p className="text-base">Access your saved sites on any device, anytime.</p>
  </div>

</div>

            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              The core principles that guide everything we do at WebM
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div 
              className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-sm text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="flex justify-center mb-4">
                <Zap className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Simplicity</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We believe in powerful functionality with intuitive design. No unnecessary complexity.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-sm text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="flex justify-center mb-4">
                <Shield className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Privacy</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your bookmarks are your business. We prioritize user privacy and data security.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-sm text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="flex justify-center mb-4">
                <Heart className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">User-Centered</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We listen to our users and build features that solve real problems.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Team</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              The people behind WebM who make the magic happen
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Tatheer Fathima',
                role: 'Founder & Backend Developer',
                image: '/images/tatheer.png'
              },
              {
                name: 'Munasa Priyanka',
                role: 'UX Designer & Frontend Developer',
                image: 'images/priyanka_img.png'
              },
              {
                name: 'Potnuru Homalika',
                role: 'Project Manager',
                image: 'images/homalika_img.png'
              },
              {
                name: 'Gojja Kavya Sri',
                role: 'Quality Assurance Engineer',
                image: 'images/kavya_img.png'
              }
            ].map((member, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <div className="mb-4 overflow-hidden rounded-full w-40 h-40 mx-auto">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;