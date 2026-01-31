import { useState, useRef } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { Audio as ExpoAudio } from "expo-av";

const img = {
  coin_00: require("../../assets/images/FlipCoin/coin_0.webp"),
  coin_01: require("../../assets/images/FlipCoin/coin_01.webp"),
  coin_02: require("../../assets/images/FlipCoin/coin_02.webp"),
  coin_03: require("../../assets/images/FlipCoin/coin_03.webp"),
  coin_04: require("../../assets/images/FlipCoin/coin_04.webp"),
  coin_05: require("../../assets/images/FlipCoin/coin_05.webp"),
  coin_06: require("../../assets/images/FlipCoin/coin_06.webp"),
  coin_07: require("../../assets/images/FlipCoin/coin_07.webp"),
  coin_08: require("../../assets/images/FlipCoin/coin_08.webp"),
  coin_09: require("../../assets/images/FlipCoin/coin_09.webp"),
  coin_10: require("../../assets/images/FlipCoin/coin_10.webp"),
  coin_11: require("../../assets/images/FlipCoin/coin_11.webp"),
};

export default function FlipCoin() {
  const [imgArr] = useState([
    img.coin_00,
    img.coin_01,
    img.coin_02,
    img.coin_03,
    img.coin_04,
    img.coin_05,
    img.coin_06,
    img.coin_07,
    img.coin_08,
    img.coin_09,
    img.coin_10,
    img.coin_11,
  ]);

  const [currentImg, setCurrentImg] = useState(
    Math.random() >= 0.5 ? 3 : 9
  );

  const [imgLoading, setImageLoading] = useState(false);

  const anmRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef(0);
  const indexRef = useRef(0);
  const readyRef = useRef(0);

  // FPS CONTROL
  const fpsRef = useRef(10);
  const MIN_FPS = 90;
  const MAX_FPS = 20;

  const DURATION = 2000;
  const STOP_INDEX = [2, 8];

  // ---------------- SOUND ----------------

  async function playFlipSound() {
    const { sound } = await ExpoAudio.Sound.createAsync(
      require("../../assets/images/FlipCoin/coin_flip.mp3")
    );

    await sound.playAsync();
  }

  // ---------------- ANIMATION ----------------

  function animate(timestamp: number) {
    if (startTimeRef.current === null) {
      startTimeRef.current = timestamp;
      lastFrameTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;

    // progress 0 -> 1
    const progress = Math.min(elapsed / DURATION, 1);

    // ramp fps from slow to fast
    fpsRef.current =
      MIN_FPS + (MAX_FPS - MIN_FPS) * progress;

    const frameInterval = 1000 / fpsRef.current;

    let advanced = false;

    if (timestamp - lastFrameTimeRef.current >= frameInterval) {
      lastFrameTimeRef.current = timestamp;
      advanced = true;

      setCurrentImg(prev => {
        let next = prev + 1;
        if (next >= imgArr.length) next = 0;

        indexRef.current = next;
        return next;
      });
    }

    if (
      advanced &&
      elapsed >= DURATION &&
      STOP_INDEX.includes(indexRef.current)
    ) {
      stop();
      return;
    }

    anmRef.current = requestAnimationFrame(animate);
  }

  function start() {
    if (anmRef.current) return;

    fpsRef.current = MIN_FPS;
    lastFrameTimeRef.current = 0;
    startTimeRef.current = null;

    playFlipSound();

    anmRef.current = requestAnimationFrame(animate);
  }

  function stop() {
    if (anmRef.current) {
      cancelAnimationFrame(anmRef.current);
      anmRef.current = null;
      startTimeRef.current = null;
    }
  }

  // ---------------- IMAGE PRELOAD ----------------

  function onLoadImage() {
    readyRef.current += 1;

    if (readyRef.current >= imgArr.length) {
      setImageLoading(true);
    }
  }

  // ---------------- UI ----------------

  return (
    <View style={{ top: 150 }}>
      {imgArr.map((item, index) => (
        <Image
          key={index}
          source={item}
          style={{
            width: 300,
            height: 300,
            opacity: 0,
            position: "absolute",
          }}
          onLoadEnd={onLoadImage}
        />
      ))}

      {!imgLoading ? (
        <View>
          <Text>Is Loading...</Text>
        </View>
      ) : (
        <View>
          <Image
            source={imgArr[currentImg]}
            style={{
              width: 300,
              height: 300,
              left: "50%",
              transform: [{ translateX: -150 }],
            }}
          />

          <Pressable
            style={{
              borderRadius: 10,
              marginTop: 50,
              padding: 10,
              width: "50%",
              left: 150,
              transform: [{ translateX: -50 }],
              backgroundColor: "blue",
            }}
            onPress={start}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "900",
              }}
            >
              FLIP
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
