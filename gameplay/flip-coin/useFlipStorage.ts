import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "flipcoin:data";

export type FlipCoinData = {
  heads: number;
  tails: number;
  lastResult: "HEADS" | "TAILS" | null;
  timestamp: number;
  row: number;
};

export function useFlipStorage() {
  async function load(): Promise<FlipCoinData | null> {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  }

  async function save(data: FlipCoinData) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  return { load, save };
}
