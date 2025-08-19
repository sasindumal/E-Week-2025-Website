import React, { useState } from 'react';
import { ScrollView, Image, FlatList, Dimensions } from 'react-native';
import {
  YStack,
  H1,
  Paragraph,
  XStack,
  H2,
  H4,
  Card,
  Button,
  Input,
} from 'tamagui';
import {
  Camera,
  Video,
  Layers,
  Award,
  Search,
  Eye,
  Heart,
} from 'lucide-react-native';
import Header from '../components/Header';

// Dummy Data for Gallery
const galleryItems = Array.from({ length: 20 }, (_, i) => ({
  id: i.toString(),
  type: i % 4 === 0 ? 'video' : 'photo',
  category: ['highlights', 'photos', 'videos', 'photos'][i % 4],
  year: 2024 - (i % 3),
  title: `Event Moment ${i + 1}`,
  image: `https://picsum.photos/seed/${i}/400/600`,
  views: Math.floor(Math.random() * 5000) + 1000,
  likes: Math.floor(Math.random() * 1000) + 100,
  photographer: `Team E${20 + (i % 5)}`,
}));

const categories = [
    { id: "all", label: "All", icon: Layers },
    { id: "photos", label: "Photos", icon: Camera },
    { id: "videos", label: "Videos", icon: Video },
    { id: "highlights", label: "Highlights", icon: Award },
];

const years = ["All", "2024", "2023", "2022"];

const GalleryScreen = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedYear, setSelectedYear] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = galleryItems.filter((item) => {
    const matchesCategory = activeFilter === "all" || item.category === activeFilter;
    const matchesYear = selectedYear === "All" || item.year.toString() === selectedYear;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesYear && matchesSearch;
  });

  const stats = {
    photos: galleryItems.filter((item) => item.type === 'photo').length,
    videos: galleryItems.filter((item) => item.type === 'video').length,
    totalViews: galleryItems.reduce((sum, item) => sum + item.views, 0),
  };

  return (
    <ScrollView style={{ backgroundColor: '#000' }}>
      <YStack>
        <Header title="Gallery" />
        <YStack backgroundColor="#000" padding="$4" space="$5">

        {/* Filters Section */}
        <YStack space="$4">
          {/* Search Input */}
          <XStack
            borderWidth={1}
            borderColor="$gray6Dark"
            borderRadius="$4"
            paddingHorizontal="$3"
            alignItems="center"
            space="$3"
          >
            <Search color="$gray10Light" size={20} />
            <Input
              flex={1}
              backgroundColor="transparent"
              borderWidth={0}
              color="$white"
              placeholder="Search memories..."
              placeholderTextColor="$gray10Light"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </XStack>

          {/* Category Filters */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <XStack space="$3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  backgroundColor={activeFilter === category.id ? '$yellow10' : '$gray4Dark'}
                  color={activeFilter === category.id ? '$black' : '$white'}
                  icon={category.icon}
                  onPress={() => setActiveFilter(category.id)}
                >
                  {category.label}
                </Button>
              ))}
            </XStack>
          </ScrollView>

          {/* Year Filters */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <XStack space="$3">
              {years.map((year) => (
                <Button
                  key={year}
                  size="$3"
                  variant={selectedYear === year ? 'active' : 'outlined'}
                  onPress={() => setSelectedYear(year)}
                  backgroundColor={selectedYear === year ? '$gray8Dark' : 'transparent'}
                  borderColor="$gray8Dark"
                  color="$white"
                >
                  {year}
                </Button>
              ))}
            </XStack>
          </ScrollView>
        </YStack>

        {/* Gallery Grid */}
        {filteredItems.length > 0 ? (
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <Card flex={1} margin="$1.5" overflow="hidden">
                <Image source={{ uri: item.image }} style={{ width: '100%', height: 200 }} />
                {item.type === 'video' && (
                  <YStack position="absolute" top={0} left={0} right={0} bottom={0} justifyContent="center" alignItems="center" backgroundColor="rgba(0,0,0,0.4)">
                    <Video color="$white" size={40} />
                  </YStack>
                )}
                <YStack padding="$2.5" backgroundColor="$gray2Dark">
                  <H4 color="$white" numberOfLines={1}>{item.title}</H4>
                  <XStack justifyContent="space-between" paddingTop="$2">
                    <XStack alignItems="center" space="$1.5">
                      <Eye size={14} color="$gray10Light" />
                      <Paragraph fontSize="$2" color="$gray10Light">{item.views}</Paragraph>
                    </XStack>
                    <XStack alignItems="center" space="$1.5">
                      <Heart size={14} color="$gray10Light" />
                      <Paragraph fontSize="$2" color="$gray10Light">{item.likes}</Paragraph>
                    </XStack>
                  </XStack>
                </YStack>
              </Card>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        ) : (
          <YStack flex={1} justifyContent="center" alignItems="center" paddingVertical="$8">
            <Camera size={48} color="$gray8Dark" />
            <H2 color="$gray10Dark">No Memories Found</H2>
            <Paragraph color="$gray9Dark">Try adjusting your filters.</Paragraph>
          </YStack>
        )}

        </YStack>
      </YStack>
    </ScrollView>
  );
};

export default GalleryScreen;
