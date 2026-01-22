import { View, Text, Pressable } from "react-native"
import { useState } from "react"
export default function flipCoin(){
  const [coin, setCoin] = useState<number | null>(null)

  const handleCoin = function(){
    const randomNumber = Math.random() < 0.5 ? 1: 2
    setCoin(randomNumber)
  }
  return(
    <View>
      <Text>Flip Coin</Text>
      <Pressable onPress={handleCoin}>
      <Text>Press</Text>
      </Pressable>
      {coin === 1 && <Text>Head</Text>}
      {coin === 2 && <Text>Tail</Text>}
    </View>
  )
}