import React from 'react';
import { useGame } from '../contexts/GameContext';
import { motion } from 'framer-motion';
import '../styles/EventPhase.css';

const EventPhase: React.FC = () => {
  const { eventType } = useGame();

  const getEventMessage = () => {
    switch (eventType) {
      case 'disaster':
        return "A disaster has struck! The community chest has been reduced.";
      case 'windfall':
        return "Good news! A windfall has increased the community chest.";
      default:
        return "The round proceeds normally.";
    }
  };

  return (
    <motion.div
      className="event-phase"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>Event Phase</h3>
      <p>{getEventMessage()}</p>
    </motion.div>
  );
};

export default EventPhase;

