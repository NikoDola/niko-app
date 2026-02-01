import { useState } from "react";
import { View, Text, Pressable, Image } from "react-native";

import { frames } from "./assets";
import { COIN_FACE } from "./config";

import { usePreload } from "./usePreloadFrames";
import { useFlipSound } from "./useFlipSound";
import { useFlipAnimation } from "./useFlipAnimation";
import { useFlipStorage } from "./useFlipStorage";

export default function FlipCoin() {
  const imgArr = frames;
  
  const [currentImg, setCurrentImg] = useState<number>(
    Math.random() >= 0.5 ? COIN_FACE.HEADS : COIN_FACE.TAILS
  );

  const { ready, onFrameLoad } = usePreload(imgArr.length);
  const { play } = useFlipSound();
  const { save, load } = useFlipStorage();
  
  // ✅ THIS is the finish handler (defined BEFORE useFlipAnimation)
  function handleAnimationFinish(finalIndex: number) {
    const result =
      finalIndex === COIN_FACE.HEADS ? "HEADS" : "TAILS";

    save({
      lastResult: result,
      timestamp: Date.now(),
    });
  }

  const { start } = useFlipAnimation(
    imgArr.length,
    setCurrentImg,
    handleAnimationFinish
  );

  function onFlip() {
    play();
    start();
  }

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
          onLoadEnd={onFrameLoad}
        />
      ))}

      {!ready ? (
        <Text>Loading...</Text>
      ) : (
        <>
        <View>
          <Text></Text>
        </View>
          <Pressable onPress={onFlip}>
            <Image
              source={imgArr[currentImg]}
              style={{
                width: 300,
                height: 300,
                left: "50%",
                transform: [{ translateX: -150 }],
              }}
            />
          </Pressable>

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
            onPress={onFlip}
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
        </>
      )}
    </View>
  );
}
