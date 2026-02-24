import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell } from 'lucide-react';

export const LiveNotifications = () => {
  const [notifications, setNotifications] = useState<{ id: number; message: string }[]>([]);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const ws = new WebSocket(`${protocol}//${window.location.host}`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'SALE_NOTIFICATION') {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message: data.message }]);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
          setNotifications(prev => prev.filter(n => n.id !== id));
        }, 5000);
      }
    };

    return () => ws.close();
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-[100] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            className="bg-[#1a1f2e] text-white px-4 py-3 rounded-lg shadow-2xl border border-[#FF8C00]/30 flex items-center gap-3 pointer-events-auto"
          >
            <div className="bg-[#FF8C00] p-2 rounded-full">
              <Bell size={16} className="text-white" />
            </div>
            <p className="text-sm font-medium">{n.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
