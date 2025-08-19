import React, { useState, useEffect } from 'react';
import { XStack, YStack, Text } from 'tamagui';

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval] && timeLeft[interval] !== 0) {
      return;
    }

    timerComponents.push(
      <YStack key={interval} alignItems="center" p="$2">
        <Text fontSize="$6" fontWeight="bold" color="$color">{timeLeft[interval]}</Text>
        <Text fontSize="$2" textTransform="uppercase" color="$color">{interval}</Text>
      </YStack>
    );
  });

  return (
    <XStack>
      {timerComponents.length ? timerComponents : <Text>Time's up!</Text>}
    </XStack>
  );
};

export default CountdownTimer;
