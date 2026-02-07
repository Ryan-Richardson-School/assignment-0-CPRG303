import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View , Image,ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//Categories
const CATEGORIES = ["All", "Music", "Podcasts", "Audiobooks"];

// Playlists
const PLAYLISTS = [
  { id: 1, title: "Top Hits", category: "Music", image: "https://picsum.photos/id/101/200" },
  { id: 2, title: "Daily Mix", category: "Music", image: "https://picsum.photos/id/180/200" },
  { id: 3, title: "Tech Talks", category: "Podcasts", image: "https://picsum.photos/id/103/200" },
  { id: 4, title: "True Crime", category: "Podcasts", image: "https://picsum.photos/id/250/200" },
  { id: 5, title: "Chill Vibes", category: "Music", image: "https://picsum.photos/id/39/200" },
  { id: 6, title: "Workout", category: "Music", image: "https://picsum.photos/id/106/200" },
  { id: 7, title: "Comedy", category: "Podcasts", image: "https://picsum.photos/id/107/200" },
  { id: 8, title: "History", category: "Audiobooks", image: "https://picsum.photos/id/108/200" },
  { id: 9, title: "Science Fiction", category: "Audiobooks", image: "https://picsum.photos/id/109/200" },
  { id: 10, title: "Classics", category: "Audiobooks", image: "https://picsum.photos/id/110/200" },
  { id: 11, title: "Jazz Essentials", category: "Music", image: "https://picsum.photos/id/111/200" },
  { id: 12, title: "Meditation", category: "Audiobooks", image: "https://picsum.photos/id/112/200" },
];


//Home Screen is basically everything up to styling at the bottom
export default function Index() {
  //Button selection
  const [active, setActive] = useState<string>("All");
  const [activePlaylist, setActivePlaylist] = useState<number | null>(null);

  //Using safe area so no overlap
  return (
    //<SafeAreaView style={styles.safe}>
    <SafeAreaView style={styles.safe}>
  <ScrollView>

      {/* <View style={styles.screen}>
        <View style={styles.headerRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>R</Text>
          </View>

          <Text style={styles.greeting}>Good Morning</Text> */}

<View style={styles.header}>
  <View style={styles.topRow}>
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>R</Text>
    </View>
    <Text style={styles.greeting}>Good Morning</Text>
  </View>
          <View style={styles.categoryRow}>
            {CATEGORIES.map((label) => {
              const isActive = label === active;
              return (
                <Pressable
                  key={label}
                  onPress={() => setActive(label)}
                  style={[
                    styles.categoryButton,
                    isActive
                      ? styles.categoryButtonActive
                      : styles.categoryButtonIdle,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      isActive
                        ? styles.categoryButtonTextActive
                        : styles.categoryButtonTextIdle,
                    ]}
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Popular Playlists</Text>

          {/*Playlists ScrollView*/}
        <ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 20 }} >

          {PLAYLISTS.map((pl) => {
            const isActive = pl.id === activePlaylist;
            return (
              <Pressable
                key={pl.id}
                onPress={() => setActivePlaylist(pl.id)}
                style={styles.playlistCard}
              >
                <Image source={{ uri: pl.image }} style={styles.playlistImage} />
                <Text
                  style={[
                    styles.playlistText,
                    isActive && { color: "#1DB954", fontWeight: "bold" },
                  ]}
                >
                  {pl.title}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Text style={styles.sectionTitle}>Recently Played</Text>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10 }}
        >
          {PLAYLISTS.slice(0, 6).map((pl) => (
            <View key={"recent-" + pl.id} style={styles.playlistCard}>
              <Image source={{ uri: pl.image }} style={styles.playlistImage} />
              <Text style={styles.playlistText}>{pl.title}</Text>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Recommended For You</Text>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10 }}
        >
          {PLAYLISTS.slice(6, 12).map((pl) => (
            <View key={"rec-" + pl.id} style={styles.playlistCard}>
              <Image source={{ uri: pl.image }} style={styles.playlistImage} />
              <Text style={styles.playlistText}>{pl.title}</Text>
            </View>
          ))}
        </ScrollView>


           
        <Pressable
          // Alert Button required for the project idk we will need to make this fit into the ui
          style={styles.alertButton}
          onPress={() => Alert.alert("Alert Button pressed")}
        >
          <Text style={styles.alertButtonText}>Alert</Text>
        </Pressable>
      {/* </View> */}
        </ScrollView>
    </SafeAreaView>
  );
}

//Styling to look like spotify
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#000" },
  screen: { paddingHorizontal: 16, paddingTop: 8 },

  // headerRow: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   gap: 12,
  //   justifyContent: "space-between",
  // },
  
  header: {
    marginTop: 10,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#6b4a3a",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: { color: "#fff", fontWeight: "800" },

  categoryRow: {
    flex: 1,
    flexDirection: "row",
    gap: 20,
  },

  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
  },
  categoryButtonActive: {
    backgroundColor: "#1DB954",
  },
  categoryButtonIdle: {
    backgroundColor: "#1f1f1f",
  },

  categoryButtonText: {
    fontWeight: "800",
  },
  categoryButtonTextActive: {
    color: "#000",
  },
  categoryButtonTextIdle: {
    color: "#fff",
  },

  alertButton: {
    marginTop: 24,
    backgroundColor: "#1DB954",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  alertButtonText: {
    color: "#000",
    fontWeight: "800",
    fontSize: 16,
  },
  greeting: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
   marginLeft: 100,
   marginRight: 100,
  },
  playlistCard: {
    marginRight: 16,
    width: 120,
    alignItems: "center",
 },
  playlistImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  playlistText: {
    color: "#fff",
    marginTop: 6,
    fontWeight: "600",
    textAlign: "center",
  },
  sectionTitle: {
  color: "#fff",
  fontSize: 18,
  fontWeight: "bold",
  marginTop: 20,
  marginBottom: 10,
},

});
