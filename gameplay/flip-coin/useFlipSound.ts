// src/gameplay/flip-coin/useFlipSound.ts
import { Audio as ExpoAudio } from "expo-av";

export function useFlipSound() {
  async function play() {
    const { sound } = await ExpoAudio.Sound.createAsync(
      require("../../assets/images/FlipCoin/coin_flip.mp3")
    );
    await sound.playAsync();
  }

  return { play };
}
