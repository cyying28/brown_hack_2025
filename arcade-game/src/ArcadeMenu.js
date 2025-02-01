import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import PongGame from "./PongGame"; // Import PongGame

const games = ["Pong", "default", "default", "default", "default"];

export default function ArcadeMenu() {
  const [currentGame, setCurrentGame] = useState(null);

  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Glitch Effect */}
      <div className={`absolute inset-0 bg-opacity-10`}></div>
      
      {currentGame === "Pong" ? (
        <PongGame />
      ) : (
        <>
          <motion.h1 
            className="text-5xl font-bold tracking-widest glitch-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            Arcade Zone
          </motion.h1>
          
          <div className="mt-10 grid grid-cols-2 gap-6">
            {games.map((game, index) => (
              <motion.div 
                key={index} 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button 
                  onClick={() => game === "Pong" && setCurrentGame("Pong")}
                  className="text-xl px-6 py-3 font-mono bg-green-600 hover:bg-green-400 relative overflow-hidden flex flex-col items-center justify-center h-24 w-40"
                >
                  <span>{game}</span>
                </Button>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* CSS for Glitch Effects */}
      <style jsx>{`
        @keyframes glitch {
          0% { transform: translate(0, 0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(2px, -2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(2px, 2px); }
          100% { transform: translate(0, 0); }
        }

        .glitch-text {
          position: relative;
          text-shadow: 2px 2px red, -2px -2px blue;
        }
      `}</style>
    </div>
  );
}
