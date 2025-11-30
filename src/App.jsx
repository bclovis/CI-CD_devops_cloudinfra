import React from 'react';
import { motion } from 'framer-motion';
import TeamMember from './components/TeamMember';
import cytechLogo from './assets/img/cytech.png';
import googleCloudLogo from './assets/img/googlecloud.png';

const teamMembers = [
  "BOUGHAMMOURA Alaa",
  "CLOVIS Besaleel",
  "EL-MAHDAOUI Abdellatif",
  "SEMGAT Ayoub"
];

function App() {
  return (
    <div className="container is-fluid px-0">
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">

            {/* Logos */}
            <motion.div
              className="mb-6 is-flex is-justify-content-center is-align-items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img src={cytechLogo} alt="CY Tech" className="logo-img" />
              <img src={googleCloudLogo} alt="Google Cloud" className="logo-img" />
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="title is-1 is-size-2-mobile mb-4">
                DevOps CI/CD on GCP
              </h1>
              <h2 className="subtitle is-3 is-size-4-mobile mb-6">
                Automated Deployment Pipeline
              </h2>
            </motion.div>

            {/* Team Members */}
            <motion.h3
              className="title is-3 is-size-4-mobile mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Realisé par
            </motion.h3>
            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <TeamMember key={index} name={member} index={index} />
              ))}
            </div>

            {/* Footer Info */}
            <motion.div
              className="mt-6 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              <p className="subtitle is-4 is-size-5-mobile has-text-weight-medium">CY-Tech Pau</p>
              <p className="subtitle is-5 is-size-6-mobile mt-2">Formation: 3ème année d'ingénieur - Ingénierie Cloud Computing</p>
              <p className="subtitle is-5 is-size-6-mobile mt-2">Assignment Brief 5</p>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
