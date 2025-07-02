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
      <div className="countdown text-center">
        <h2 className="text-4xl font-bold text-red mb-4">
          E-WEEK 2K25 HAS BEGUN!
        </h2>
        <p className="text-xl">The event is now live!</p>
      </div>
    );
  }

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="countdown">
      <h2 className="countdown-title">Countdown to E-Week 2K25</h2>
      <div className="countdown-grid">
        {timeUnits.map((unit) => (
          <div key={unit.label} className="countdown-item">
            <div className="countdown-number">
              {unit.value.toString().padStart(2, "0")}
            </div>
            <div className="countdown-label">{unit.label}</div>
          </div>
        ))}
      </div>
      <p className="countdown-date">
        August 25, 2025 • Faculty of Engineering • University of Jaffna
      </p>
    </div>
  );
};

export default CountdownTimer;
