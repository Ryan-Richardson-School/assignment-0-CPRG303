import { useMemo, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//Categories
const topAhNav = ["All", "Music", "Podcasts", "Audiobooks"];
const bottomAhNav = ["Home", "Search", "Your Library", "Create"];

type Playlist = {
  id: number;
  title: string;
  category: string;
  image: string;
};

// Playlists
const PLAYLISTS: Playlist[] = [
  {
    id: 1,
    title: "Top Hits",
    category: "Music",
    image: "https://picsum.photos/id/101/200",
  },
  {
    id: 2,
    title: "Daily Mix",
    category: "Music",
    image: "https://picsum.photos/id/180/200",
  },
  {
    id: 3,
    title: "Tech Talks",
    category: "Podcasts",
    image: "https://picsum.photos/id/103/200",
  },
  {
    id: 4,
    title: "True Crime",
    category: "Podcasts",
    image: "https://picsum.photos/id/250/200",
  },
  {
    id: 5,
    title: "Chill Vibes",
    category: "Music",
    image: "https://picsum.photos/id/39/200",
  },
  {
    id: 6,
    title: "Workout",
    category: "Music",
    image: "https://picsum.photos/id/106/200",
  },
  {
    id: 7,
    title: "Comedy",
    category: "Podcasts",
    image: "https://picsum.photos/id/107/200",
  },
  {
    id: 8,
    title: "History",
    category: "Audiobooks",
    image: "https://picsum.photos/id/108/200",
  },
  {
    id: 9,
    title: "Science Fiction",
    category: "Audiobooks",
    image: "https://picsum.photos/id/109/200",
  },
  {
    id: 10,
    title: "Classics",
    category: "Audiobooks",
    image: "https://picsum.photos/id/110/200",
  },
  {
    id: 11,
    title: "Jazz Essentials",
    category: "Music",
    image: "https://picsum.photos/id/111/200",
  },
  {
    id: 12,
    title: "Meditation",
    category: "Audiobooks",
    image: "https://picsum.photos/id/112/200",
  },
];

function PlaylistRow(props: {
  title: string;
  items: Playlist[];
  activePlaylistId?: number | null;
  onPressItem?: (id: number) => void;
}) {
  const { title, items, activePlaylistId, onPressItem } = props;

  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {items.map((pl) => {
          const isActive = pl.id === activePlaylistId;

          return (
            <Pressable
              key={pl.id}
              onPress={onPressItem ? () => onPressItem(pl.id) : undefined}
              style={styles.playlistCard}
            >
              <Image source={{ uri: pl.image }} style={styles.playlistImage} />
              <Text
                style={[
                  styles.playlistText,
                  isActive && styles.playlistTextActive,
                ]}
                numberOfLines={1}
              >
                {pl.title}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const getIcon = (label: string) => {
  switch (label) {
    case "Home":
      return require("../assets/images/home.png");
    case "Search":
      return require("../assets/images/search.png");
    case "Your Library":
      return require("../assets/images/library.png");
    case "Create":
      return require("../assets/images/add.png");
    default:
      return require("../assets/images/home.png");
  }
};

//Home Screen is basically everything up to styling at the bottom
export default function Index() {
  //Button selection
  const [active, setActive] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<string>("Home");
  const [activePlaylist, setActivePlaylist] = useState<number | null>(null);

  const filteredPlaylists = useMemo(() => {
    if (active === "All") return PLAYLISTS;
    return PLAYLISTS.filter((p) => p.category === active);
  }, [active]);

  const getCategoryButtonStyle = (isActive: boolean) => [
    styles.categoryButton,
    isActive ? styles.categoryButtonActive : styles.categoryButtonIdle,
  ];

  const getCategoryTextStyle = (isActive: boolean) => [
    styles.categoryButtonText,
    isActive ? styles.categoryButtonTextActive : styles.categoryButtonTextIdle,
  ];

  const getTabTextStyle = (isActiveTab: boolean) => [
    styles.navText,
    isActiveTab ? styles.navTextActive : styles.navTextIdle,
  ];

  //Using safe area so no overlap please try to fiddle with this to much could break the project
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screen}>
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>R</Text>
            </View>

            <Text style={styles.greeting}>Good Morning</Text>
          </View>

          <View style={styles.categoryRow}>
            {topAhNav.map((label) => {
              const isActive = label === active;

              return (
                <Pressable
                  key={label}
                  onPress={() => setActive(label)}
                  style={getCategoryButtonStyle(isActive)}
                >
                  <Text style={getCategoryTextStyle(isActive)}>{label}</Text>
                </Pressable>
              );
            })}
          </View>

          <PlaylistRow
            title="Popular Playlists"
            items={filteredPlaylists}
            activePlaylistId={activePlaylist}
            onPressItem={setActivePlaylist}
          />

          <PlaylistRow title="Recently Played" items={PLAYLISTS.slice(0, 6)} />

          <PlaylistRow
            title="Recommended For You"
            items={PLAYLISTS.slice(6, 12)}
          />

          {/* Spacer so content doesn't hide behind bottom bar */}
          <View style={{ height: 14 }} />
        </ScrollView>

        {/* Fixed bottom area */}
        <View style={styles.bottomArea}>
          <Pressable
            style={styles.alertButton}
            onPress={() => Alert.alert("Alert Button pressed")}
          >
            <Text style={styles.alertButtonText}>Alert</Text>
          </Pressable>

          <View style={styles.navBar}>
            {bottomAhNav.map((label) => {
              const isActiveTab = label === activeTab;

              return (
                <Pressable
                  key={label}
                  onPress={() => setActiveTab(label)}
                  style={styles.navItem}
                >
                  <View
                    style={[
                      styles.navIconWrap,
                      isActiveTab && styles.navIconWrapActive,
                    ]}
                  >
                    <Image
                      source={getIcon(label)}
                      style={[
                        styles.navIcon,
                        isActiveTab
                          ? styles.navIconActive
                          : styles.navIconInactive,
                      ]}
                    />
                  </View>

                  <Text style={getTabTextStyle(isActiveTab)}>{label}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

//Styling form the actual app
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#000" },

  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 6,
  },

  content: { flex: 1 },
  contentContainer: { paddingBottom: 10 },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
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

  greeting: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },

  categoryRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },

  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
  },
  categoryButtonActive: { backgroundColor: "#1DB954" },
  categoryButtonIdle: { backgroundColor: "#1f1f1f" },

  categoryButtonText: { fontWeight: "800" },
  categoryButtonTextActive: { color: "#000" },
  categoryButtonTextIdle: { color: "#fff" },

  sectionTitle: {
    marginTop: 18,
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },

  row: {
    paddingTop: 12,
    paddingBottom: 2,
  },

  playlistCard: {
    width: 120,
    marginRight: 12,
    marginTop: 0,
  },

  playlistImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    backgroundColor: "#111",
  },

  playlistText: {
    marginTop: 8,
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },

  playlistTextActive: {
    color: "#1DB954",
    fontWeight: "800",
  },

  bottomArea: {
    paddingBottom: 10,
    gap: 10,
  },

  alertButton: {
    backgroundColor: "#1DB954",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  alertButtonText: {
    color: "#000",
    fontWeight: "800",
    fontSize: 16,
  },

  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#0b0b0b",
    borderTopWidth: 1,
    borderTopColor: "#1f1f1f",
    borderRadius: 14,
  },

  navItem: {
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    gap: 4,
  },

  navIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111",
  },

  navIconWrapActive: { backgroundColor: "#1f1f1f" },

  navText: {
    fontSize: 12,
    fontWeight: "700",
  },

  navTextActive: { color: "#fff" },

  navTextIdle: { color: "#a7a7a7" },

  navIcon: {
    width: 20,
    height: 20,
  },

  navIconActive: {
    tintColor: "white",
  },

  navIconInactive: {
    tintColor: "#a7a7a7",
  },
});
