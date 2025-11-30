import React from 'react';
import { motion } from 'framer-motion';

const TeamMember = ({ name, index }) => {
  // Split name into parts (last name is first, first name is rest)
  const nameParts = name.split(' ');
  const lastName = nameParts[0];
  const firstName = nameParts.slice(1).join(' ');

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
    >
      <div className="card-content has-text-centered">
        <p className="team-name">
          {lastName}
          <br />
          {firstName}
        </p>
      </div>
    </motion.div>
  );
};

export default TeamMember;
