import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//Categories
const topAhNav = ["All", "Music", "Podcasts", "Audiobooks"];
const bottomAhNav = ["Home", "Search", "Your Library", "Create"];

// Emjois for bottom bar
const getNavEmoji = (label: string) => {
  switch (label) {
    case "Home":
      return "🏠";
    case "Search":
      return "🔍";
    case "Your Library":
      return "📚";
    case "Create":
      return "➕";
    default:
      return "•";
  }
};

//Home Screen is basically everything up to styling at the bottom
export default function Index() {
  //Button selection
  const [active, setActive] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<string>("Home");

  //Using safe area so no overlap please try to fiddle with this to much could break the project
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screen}>
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>R</Text>
            </View>

            <View style={styles.categoryRow}>
              {topAhNav.map((label) => {
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
        </View>
        <View style={styles.bottomArea}>
          <Pressable
            // Alert Button required for the project idk we will need to make this fit into the ui
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
                    {/* Spotify icons are not public so this is the best I can do if you find better emojis feel free to add them. */}
                    <Text style={styles.navIconEmoji}>
                      {getNavEmoji(label)}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.navText,
                      isActiveTab ? styles.navTextActive : styles.navTextIdle,
                    ]}
                  >
                    {label}
                  </Text>
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
  categoryRow: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
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
  navIconWrapActive: {
    backgroundColor: "#1f1f1f",
  },

  navIconEmoji: { fontSize: 18 },
  navText: {
    fontSize: 12,
    fontWeight: "700",
  },
  navTextActive: { color: "#fff" },
  navTextIdle: { color: "#a7a7a7" },
});
