import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
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
      <div className="text-center">
        <h2 className="text-4xl font-bold text-eweek-red mb-4">
          E-WEEK 2025 HAS BEGUN!
        </h2>
        <p className="text-eweek-white text-xl">The event is now live!</p>
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
    <div className="text-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-eweek-white mb-8">
        Countdown to E-Week 2025
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
        {timeUnits.map((unit, index) => (
          <div
            key={unit.label}
            className="bg-eweek-white/10 backdrop-blur-sm rounded-lg p-4 border border-eweek-red/30"
          >
            <div className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: '#ffa502' }}>
              {unit.value.toString().padStart(2, "0")}
            </div>
            <div className="text-eweek-white text-sm uppercase tracking-wide">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
      <p className="text-eweek-white/80 mt-6 text-lg">
        August 25, 2025 • UOJ Faculty of Engineering
      </p>
    </div>
  );
}
