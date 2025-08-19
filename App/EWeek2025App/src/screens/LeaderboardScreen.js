import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import {
  YStack,
  H1,
  Paragraph,
  XStack,
  H2,
  H4,
} from 'tamagui';
import {
  BarChart3,
  Trophy,
  TrendingUp,
  TrendingDown,
  Minus,
  Crown,
  Medal,
  Award,
  Star,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';

// Data for Leaderboard
const batchRankings = [
    {
      rank: 1,
      previousRank: 2,
      batch: "E21",
      totalPoints: 4850,
      weeklyGain: 320,
      trend: "up",
      color: ['#facc15', '#eab308'],
    },
    {
      rank: 2,
      previousRank: 1,
      batch: "E22",
      totalPoints: 4620,
      weeklyGain: 280,
      trend: "down",
      color: ['#d1d5db', '#9ca3af'],
    },
    {
      rank: 3,
      previousRank: 3,
      batch: "E20",
      totalPoints: 4380,
      weeklyGain: 250,
      trend: "stable",
      color: ['#fb923c', '#f97316'],
    },
    {
      rank: 4,
      previousRank: 5,
      batch: "E23",
      totalPoints: 3950,
      weeklyGain: 310,
      trend: "up",
      color: ['#60a5fa', '#3b82f6'],
    },
    {
      rank: 5,
      previousRank: 4,
      batch: "E24",
      totalPoints: 3720,
      weeklyGain: 290,
      trend: "down",
      color: ['#c084fc', '#a855f7'],
    },
  ];

const pastEvents = [
    {
      id: 1,
      name: "AI & Machine Learning Hackathon",
      category: "Technical",
      scores: [
        { batch: "E21", score: 950, rank: 1 },
        { batch: "E23", score: 890, rank: 2 },
        { batch: "E22", score: 850, rank: 3 },
      ],
    },
    {
      id: 2,
      name: "Robotics Championship",
      category: "Engineering",
      scores: [
        { batch: "E22", score: 920, rank: 1 },
        { batch: "E21", score: 880, rank: 2 },
        { batch: "E20", score: 840, rank: 3 },
      ],
    },
    {
      id: 3,
      name: "Startup Pitch Battle",
      category: "Innovation",
      scores: [
        { batch: "E20", score: 880, rank: 1 },
        { batch: "E21", score: 860, rank: 2 },
        { batch: "E23", score: 820, rank: 3 },
      ],
    },
  ];

const LeaderboardScreen = () => {

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown size={24} color="#facc15" />;
      case 2:
        return <Medal size={24} color="#d1d5db" />;
      case 3:
        return <Award size={24} color="#fb923c" />;
      default:
        return <Star size={24} color="#60a5fa" />;
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <TrendingUp size={16} color="#22c55e" />;
      case "down":
        return <TrendingDown size={16} color="#ef4444" />;
      default:
        return <Minus size={16} color="#9ca3af" />;
    }
  };

  return (
    <ScrollView style={{ backgroundColor: '#000' }}>
      <Header title="Leaderboard" />
      <YStack backgroundColor="#000" padding="$4" space="$5">
        {/* Hero Section */}
        <YStack alignItems="center" space="$3" paddingVertical="$6" borderRadius="$6" backgroundColor="$gray2Dark">
          <XStack alignItems="center" space="$3">
            <H1 color="$white">Live Leaderboard</H1>
            <BarChart3 color="$yellow10" size={36} />
          </XStack>
          <Paragraph color="$gray11Light" textAlign="center" fontSize="$6">
            Real-time rankings and performance analytics for E-Week 2K25
          </Paragraph>
          <XStack justifyContent="space-around" width="100%" paddingTop="$4">
            <YStack alignItems="center" space="$2">
              <H4 color="$white">5</H4>
              <Paragraph color="$gray10">Active Batches</Paragraph>
            </YStack>
            <YStack alignItems="center" space="$2">
              <H4 color="$white">25+</H4>
              <Paragraph color="$gray10">Completed Events</Paragraph>
            </YStack>
            <YStack alignItems="center" space="$2">
              <H4 color="$white">500+</H4>
              <Paragraph color="$gray10">Participants</Paragraph>
            </YStack>
          </XStack>
        </YStack>

        {/* Batch Rankings Section */}
        <YStack space="$4">
          <XStack alignItems="center" space="$3">
            <Trophy color="$yellow10" size={28} />
            <H2 color="$white">Batch Rankings</H2>
          </XStack>
          <YStack space="$3">
            {batchRankings.map((batch) => (
              <Card key={batch.rank} overflow="hidden">
                <LinearGradient colors={batch.color}>
                  <XStack padding="$4" alignItems="center" space="$4">
                    <H2 color="$white">#{batch.rank}</H2>
                    <YStack flex={1}>
                      <H4 color="$white">{batch.batch}</H4>
                      <Paragraph color="$gray11Light">{batch.totalPoints} Points</Paragraph>
                    </YStack>
                    <XStack alignItems="center" space="$2">
                      {getTrendIcon(batch.trend)}
                      <Paragraph color={batch.trend === 'up' ? '#22c55e' : batch.trend === 'down' ? '#ef4444' : '#9ca3af'}>
                        {batch.weeklyGain}
                      </Paragraph>
                    </XStack>
                  </XStack>
                </LinearGradient>
              </Card>
            ))}
          </YStack>
        </YStack>

        {/* Past Events Results Section */}
        <YStack space="$4">
          <XStack alignItems="center" space="$3">
            <BarChart3 color="$yellow10" size={28} />
            <H2 color="$white">Past Events Results</H2>
          </XStack>
          <YStack space="$3">
            {pastEvents.map((event) => (
              <Card key={event.id} padding="$4" backgroundColor="$gray2Dark">
                <YStack space="$3">
                  <H4 color="$white">{event.name}</H4>
                  <Paragraph color="$gray10Light">{event.category}</Paragraph>
                  <YStack space="$2" paddingTop="$2">
                    {event.scores.map((score) => (
                      <XStack key={score.batch} justifyContent="space-between" alignItems="center" paddingVertical="$1">
                        <XStack alignItems="center" space="$3">
                          {getRankIcon(score.rank)}
                          <Paragraph fontSize="$6" color="$white">{score.batch}</Paragraph>
                        </XStack>
                        <Paragraph fontSize="$6" color="$yellow10" fontWeight="bold">{score.score} Points</Paragraph>
                      </XStack>
                    ))}
                  </YStack>
                </YStack>
              </Card>
            ))}
          </YStack>
        </YStack>

      </YStack>
    </ScrollView>
  );
};

export default LeaderboardScreen;
