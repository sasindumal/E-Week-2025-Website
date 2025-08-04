import React, { useState, useEffect } from "react";

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsExpired(false);
      } else {
        setIsExpired(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (isExpired) {
    return (
      <div className="countdown text-center divine-countdown-expired">
        <h2 className="text-4xl font-bold divine-announcement mb-4">
          ⚡ THE ODYSSEY MMXXV HAS BEGUN! ⚡
        </h2>
        <p className="text-xl divine-live-text">
          The epic trials are now unfolding! Heroes, to battle!
        </p>
      </div>
    );
  }

  const timeUnits = [
    { label: "Divine Days", value: timeLeft.days, symbol: "🗓️" },
    { label: "Sacred Hours", value: timeLeft.hours, symbol: "⏰" },
    { label: "Blessed Minutes", value: timeLeft.minutes, symbol: "⏱️" },
    { label: "Holy Seconds", value: timeLeft.seconds, symbol: "⚡" },
  ];

  return (
    <div className="countdown divine-countdown-active">
      <h2 className="countdown-title divine-countdown-title">
        ⚔️ Countdown to The Divine Odyssey ⚔️
      </h2>
      <div className="countdown-grid divine-countdown-grid">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="countdown-item divine-countdown-item"
          >
            <div className="countdown-symbol">{unit.symbol}</div>
            <div className="countdown-number divine-countdown-number">
              {unit.value.toString().padStart(2, "0")}
            </div>
            <div className="countdown-label divine-countdown-label">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
      <p className="countdown-date divine-countdown-date">
        🏛️ August 25, 2025 • Sacred Halls of Engineering • Temple of Jaffna 🏛️
      </p>
    </div>
  );
};

export default CountdownTimer;
