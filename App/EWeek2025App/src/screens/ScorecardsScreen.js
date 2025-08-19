import React from 'react';
import { ScrollView } from 'react-native';
import {
  YStack,
  H1,
  Paragraph,
  XStack,
  H2,
  H4,
  Card,
} from 'tamagui';
import { Trophy, Medal, Award, Star, Users, Calendar, BarChart2 } from 'lucide-react-native';
import Header from '../components/Header';

const leaderboardData = [
  {
    id: 1,
    rank: 1,
    team: 'E21 Batch',
    score: 9850,
    events: ['Codefest', 'RoboWars', 'InnovateX', 'CAD Challenge'],
    points: { programming: 3200, robotics: 2500, innovation: 2150, engineering: 2000 },
  },
  {
    id: 2,
    rank: 2,
    team: 'E20 Batch',
    score: 9500,
    events: ['Codefest', 'RoboWars', 'InnovateX', 'CAD Challenge'],
    points: { programming: 3000, robotics: 2600, innovation: 2000, engineering: 1900 },
  },
  {
    id: 3,
    rank: 3,
    team: 'E22 Batch',
    score: 8900,
    events: ['Codefest', 'RoboWars', 'CAD Challenge'],
    points: { programming: 2800, robotics: 2200, innovation: 1900, engineering: 2000 },
  },
  {
    id: 4,
    rank: 4,
    team: 'E19 Batch',
    score: 8500,
    events: ['Codefest', 'InnovateX', 'CAD Challenge'],
    points: { programming: 2500, robotics: 2000, innovation: 2200, engineering: 1800 },
  },
];

const eventCategories = [
  { name: 'Programming', key: 'programming', color: '$blue10' },
  { name: 'Robotics', key: 'robotics', color: '$green10' },
  { name: 'Innovation', key: 'innovation', color: '$purple10' },
  { name: 'Engineering', key: 'engineering', color: '$orange10' },
];

const getRankIcon = (rank) => {
  const iconProps = { size: 28 };
  if (rank === 1) return <Trophy {...iconProps} color="#facc15" />;
  if (rank === 2) return <Medal {...iconProps} color="#d1d5db" />;
  if (rank === 3) return <Award {...iconProps} color="#fb923c" />;
  return <Star {...iconProps} color="#60a5fa" />;
};

const ScorecardsScreen = () => {
  return (
    <ScrollView style={{ backgroundColor: '#000' }}>
      <YStack>
        <Header title="Scorecards" />
        <YStack backgroundColor="#000" padding="$4" space="$5">

        {/* Overall Stats */}
        <XStack justifyContent="space-around">
          <YStack alignItems="center" space="$2">
            <H4 color="$white">4</H4>
            <Paragraph color="$gray10">Teams</Paragraph>
          </YStack>
          <YStack alignItems="center" space="$2">
            <H4 color="$white">15+</H4>
            <Paragraph color="$gray10">Events</Paragraph>
          </YStack>
          <YStack alignItems="center" space="$2">
            <H4 color="$white">500+</H4>
            <Paragraph color="$gray10">Participants</Paragraph>
          </YStack>
        </XStack>

        {/* Leaderboard */}
        <YStack space="$4">
          {leaderboardData.map((team) => (
            <Card key={team.id} padding="$4" backgroundColor="$gray2Dark" space="$4">
              {/* Team Info */}
              <XStack justifyContent="space-between" alignItems="center">
                <XStack alignItems="center" space="$4">
                  {getRankIcon(team.rank)}
                  <YStack>
                    <H2 color="$white">{team.team}</H2>
                    <Paragraph color="$gray10Light">Rank: {team.rank}</Paragraph>
                  </YStack>
                </XStack>
                <YStack alignItems="flex-end">
                  <H2 color="$yellow10">{team.score}</H2>
                  <Paragraph color="$gray10Light">Total Points</Paragraph>
                </YStack>
              </XStack>

              {/* Points Breakdown */}
              <YStack space="$3">
                <H4 color="$white">Points Breakdown</H4>
                <XStack flexWrap="wrap" justifyContent="space-between">
                  {eventCategories.map((category) => (
                    <YStack key={category.key} alignItems="center" space="$2" width="48%" paddingVertical="$2">
                       <YStack width={8} height={8} backgroundColor={category.color} borderRadius="$2" />
                      <Paragraph color="$gray11Light">{category.name}</Paragraph>
                      <H4 color="$white">{team.points[category.key]}</H4>
                    </YStack>
                  ))}
                </XStack>
              </YStack>
            </Card>
          ))}
        </YStack>
        </YStack>
      </YStack>
    </ScrollView>
  );
};

export default ScorecardsScreen;
