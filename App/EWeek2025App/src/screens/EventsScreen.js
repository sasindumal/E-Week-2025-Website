import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { YStack, H1, H2, H3, Paragraph, Card, XStack, Button } from 'tamagui';
import { Calendar, Flame, Code, Cpu, Lightbulb, Clock, Users, Target, Zap, Award, MapPin } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';

const ongoingEvents = [
    {
      id: 1,
      name: "AI & Machine Learning Hackathon",
      timeRemaining: "4h 23m",
      progress: 65,
      icon: Code,
      gradient: ['#3b82f6', '#8b5cf6'],
    },
    {
      id: 2,
      name: "Robotics Design Challenge",
      timeRemaining: "6h 15m",
      progress: 45,
      icon: Cpu,
      gradient: ['#22c55e', '#10b981'],
    },
    {
      id: 3,
      name: "Startup Pitch Preparation",
      timeRemaining: "2h 45m",
      progress: 30,
      icon: Lightbulb,
      gradient: ['#f97316', '#ef4444'],
    },
  ];

const upcomingEvents = [
    {
      id: 1,
      name: "Cybersecurity War Games",
      date: "2025-08-26",
      time: "09:00",
      location: "Security Command Center",
      points: "30 Points",
      icon: Target,
      gradient: ['#ef4444', '#ec4899'],
    },
    {
      id: 2,
      name: "Quantum Computing Workshop",
      date: "2025-08-28",
      time: "14:00",
      location: "Quantum Lab",
      points: "20 Points",
      icon: Zap,
      gradient: ['#8b5cf6', '#3b82f6'],
    },
    {
      id: 3,
      name: "Mobile App Development Sprint",
      date: "2025-08-29",
      time: "10:00",
      location: "Mobile Dev Studio",
      points: "10 Points",
      icon: Code,
      gradient: ['#22c55e', '#14b8a6'],
    },
    {
      id: 4,
      name: "Design Thinking Masterclass",
      date: "2025-08-30",
      time: "11:00",
      location: "Creative Hub",
      points: "20 Points",
      icon: Lightbulb,
      gradient: ['#f59e0b', '#f97316'],
    },
  ];

const weekSchedule = [
    {
      day: "Mon",
      date: "Aug 25",
      events: [
        { id: 1, name: "Opening Ceremony", time: "09:00 - 10:30", location: "Main Auditorium", type: "Ceremony" },
        { id: 2, name: "AI Hackathon Kickoff", time: "11:00 - 12:00", location: "Tech Hub", type: "Competition" },
        { id: 3, name: "Robotics Workshop", time: "14:00 - 17:00", location: "Lab A", type: "Workshop" },
      ],
    },
    {
        day: "Tue",
        date: "Aug 26",
        events: [
          { id: 4, name: "Programming Contest", time: "09:00 - 12:00", location: "Computer Lab", type: "Competition" },
          { id: 5, name: "IoT Innovation Lab", time: "13:00 - 16:00", location: "Innovation Center", type: "Workshop" },
        ],
      },
      {
        day: "Wed",
        date: "Aug 27",
        events: [
          { id: 6, name: "Machine Learning Summit", time: "10:00 - 12:00", location: "Conference Hall", type: "Conference" },
          { id: 7, name: "Cybersecurity Challenge", time: "14:00 - 18:00", location: "Security Lab", type: "Competition" },
        ],
      },
      {
        day: "Thu",
        date: "Aug 28",
        events: [
          { id: 8, name: "Web Dev Marathon", time: "09:00 - 17:00", location: "Dev Center", type: "Marathon" },
          { id: 9, name: "Tech Talk Series", time: "19:00 - 21:00", location: "Amphitheater", type: "Talk" },
        ],
      },
      {
        day: "Fri",
        date: "Aug 29",
        events: [
          { id: 10, name: "Design Thinking Workshop", time: "10:00 - 13:00", location: "Creative Studio", type: "Workshop" },
          { id: 11, name: "Innovation Showcase", time: "15:00 - 18:00", location: "Exhibition Hall", type: "Showcase" },
        ],
      },
      {
        day: "Sat",
        date: "Aug 30",
        events: [
          { id: 12, name: "Final Presentations", time: "09:00 - 12:00", location: "Main Stage", type: "Presentation" },
          { id: 13, name: "Awards Ceremony", time: "14:00 - 16:00", location: "Grand Hall", type: "Ceremony" },
        ],
      },
      {
        day: "Sun",
        date: "Aug 31",
        events: [
          { id: 14, name: "Closing Ceremony", time: "10:00 - 12:00", location: "Main Auditorium", type: "Ceremony" },
          { id: 15, name: "Networking Brunch", time: "12:30 - 14:30", location: "Garden Pavilion", type: "Social" },
        ],
      },
  ];

const EventsScreen = () => {
    const [selectedDay, setSelectedDay] = useState(0);
    return (
        <ScrollView style={{ backgroundColor: 'black' }}>
            <YStack>
                <Header title="Events" />
                {/* Hero Section */}
                <YStack
                    height={300}
                    alignItems="center"
                    justifyContent="center"
                    padding="$4"
                    space="$3"
                    backgroundColor="$gray1Dark"
                >
                    <Calendar size={72} color="$orange10" />
                    <H1 color="$color.white" textAlign="center">Event Hub</H1>
                    <Paragraph color="$gray11Light" textAlign="center" fontSize="$5">
                        Explore the full schedule of competitions, workshops, and talks.
                    </Paragraph>
                </YStack>

                {/* Ongoing Events Section */}
                <YStack padding="$4" space="$4">
                    <H2 color="$color.white">Live Now <Flame size={24} color="$red10" /></H2>
                    <YStack space="$3">
                        {ongoingEvents.map((event) => (
                            <Card key={event.id} overflow="hidden">
                                <LinearGradient
                                    colors={event.gradient}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <YStack padding="$4" space="$3">
                                        <XStack alignItems="center" space="$3">
                                            <event.icon size={24} color="white" />
                                            <H3 color="$color.white">{event.name}</H3>
                                        </XStack>
                                        <YStack space="$2">
                                            <XStack justifyContent="space-between">
                                                <Paragraph color="$gray11Light">Progress</Paragraph>
                                                <Paragraph color="$color.white">{event.progress}%</Paragraph>
                                            </XStack>
                                            <YStack height={8} backgroundColor="$blackA5" borderRadius="$2">
                                                <YStack height="100%" width={`${event.progress}%`} backgroundColor="$blue10" borderRadius="$2" />
                                            </YStack>
                                        </YStack>
                                        <XStack alignItems="center" space="$2">
                                            <Clock size={16} color="$gray11Light" />
                                            <Paragraph color="$gray11Light">{event.timeRemaining} remaining</Paragraph>
                                        </XStack>
                                    </YStack>
                                </LinearGradient>
                            </Card>
                        ))}
                    </YStack>
                </YStack>

                {/* Upcoming Events Section */}
                <YStack padding="$4" space="$4">
                    <H2 color="$color.white">Upcoming Events</H2>
                    <YStack space="$3">
                        {upcomingEvents.map((event) => (
                            <Card key={event.id} overflow="hidden">
                                <LinearGradient
                                    colors={event.gradient}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <YStack padding="$4" space="$3">
                                        <XStack alignItems="center" space="$3">
                                            <event.icon size={24} color="white" />
                                            <H3 color="$color.white">{event.name}</H3>
                                        </XStack>
                                        <XStack alignItems="center" space="$2">
                                            <Calendar size={16} color="$gray11Light" />
                                            <Paragraph color="$gray11Light">{event.date} at {event.time}</Paragraph>
                                        </XStack>
                                        <XStack alignItems="center" space="$2">
                                            <MapPin size={16} color="$gray11Light" />
                                            <Paragraph color="$gray11Light">{event.location}</Paragraph>
                                        </XStack>
                                        <XStack alignItems="center" space="$2">
                                            <Award size={16} color="$gray11Light" />
                                            <Paragraph color="$gray11Light">{event.points}</Paragraph>
                                        </XStack>
                                        <Button theme="active" marginTop="$3">Register</Button>
                                    </YStack>
                                </LinearGradient>
                            </Card>
                        ))}
                    </YStack>
                </YStack>
                {/* Full Schedule Section */}
                <YStack padding="$4" space="$4">
                    <H2 color="$color.white">Full Event Schedule</H2>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <XStack space="$3">
                            {weekSchedule.map((day, index) => (
                                <Button
                                    key={index}
                                    theme={selectedDay === index ? 'active' : 'gray'}
                                    onPress={() => setSelectedDay(index)}
                                >
                                    {day.day} - {day.date}
                                </Button>
                            ))}
                        </XStack>
                    </ScrollView>
                    <YStack space="$3">
                        {weekSchedule[selectedDay].events.map((event) => (
                            <Card key={event.id} padding="$4" backgroundColor="$gray2Dark">
                                <YStack space="$2">
                                    <H3 color="$color.white">{event.name}</H3>
                                    <XStack alignItems="center" space="$2">
                                        <Clock size={16} color="$gray11Light" />
                                        <Paragraph color="$gray11Light">{event.time}</Paragraph>
                                    </XStack>
                                    <XStack alignItems="center" space="$2">
                                        <MapPin size={16} color="$gray11Light" />
                                        <Paragraph color="$gray11Light">{event.location}</Paragraph>
                                    </XStack>
                                    <Paragraph color="$blue10Light">{event.type}</Paragraph>
                                </YStack>
                            </Card>
                        ))}
                    </YStack>
                </YStack>
            </YStack>
        </ScrollView>
    );
};

export default EventsScreen;
