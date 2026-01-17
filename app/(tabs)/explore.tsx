import { Image } from 'expo-image';
import { Platform, Pressable, StyleSheet } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  return (
    <>
    <Pressable onPress={()=> alert("hello")}>
             <ThemedText style={styles.playing}>click me</ThemedText>
    </Pressable>

    </>
 
  );
}

const styles = StyleSheet.create({
  playing: {
    color:'gray',
    bottom: -90,
    width: '100%',
    cursor: "pointer",
    backgroundColor: "black",
    textAlign: "center"
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
