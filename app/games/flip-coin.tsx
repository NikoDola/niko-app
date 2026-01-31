import { useState, useRef } from "react";
import { View, Text, Pressable, Image } from "react-native";
import RNFS from "react-native-fs";


const img = {
  coin_00: require("../../assets/images/coin/coin_0.webp"),
  coin_01: require("../../assets/images/coin/coin_01.webp"),
  coin_02: require("../../assets/images/coin/coin_02.webp"),
  coin_03: require("../../assets/images/coin/coin_03.webp"),
  coin_04: require("../../assets/images/coin/coin_04.webp"),
  coin_05: require("../../assets/images/coin/coin_05.webp"),
  coin_06: require("../../assets/images/coin/coin_06.webp"),
  coin_07: require("../../assets/images/coin/coin_07.webp"),
  coin_08: require("../../assets/images/coin/coin_08.webp"),
  coin_09: require("../../assets/images/coin/coin_09.webp"),
  coin_10: require("../../assets/images/coin/coin_10.webp"),
  coin_11: require("../../assets/images/coin/coin_11.webp"),
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
    img.coin_11

  ]);
  const [currentImg, setCurrentImg] = useState((Math.random() >= 0.5 ? 3: 9))
  const [imgLoading, setImageLoading] = useState(false);

  const anmRef = useRef<number | null>(null)
  const startTimeRef = useRef<null | number>(null)
  const indexRef = useRef(0)
  const DURATION = 2000
  const STOP_INDEX = [2, 8]

  const path = RNFS.CachesDirectoryPath + ""
  
// Animation handling
  function animate(timestamp: number){
    if(startTimeRef.current === null){
      startTimeRef.current = timestamp
    }
    const elapsed = timestamp - startTimeRef.current

    setCurrentImg( prev => {
      let next = prev + 1
      if(next >= imgArr.length){
        next = 0
      }
      indexRef.current = next
      return next
    })

    if(elapsed > DURATION  && STOP_INDEX.includes(indexRef.current)){
      stop()
      return
    }

    anmRef.current = requestAnimationFrame(animate)
  }

  
  function start(){
    if(anmRef.current) return
    anmRef.current = requestAnimationFrame(animate)
  }

  function stop(){
    if(anmRef.current){
      cancelAnimationFrame(anmRef.current)
      anmRef.current = null
      startTimeRef.current = null
      indexRef.current = 0
    }
  }

// Load Images
  let ready = 0;
  function onLoadImage() {
    ready++;
    ready >= imgArr.length && setImageLoading(true);
  }

  return (
    <View>
      {imgArr.map((item, index) => (
        <Image
          key={index}
          source={item}
          style={{ width: 300, height: 300, opacity: 0, position:"absolute" }}
          onLoadEnd={onLoadImage}
        />
      ))}
      {!imgLoading ? 
      <View>
        <Text>Is Loading...</Text>
      </View>
      : 
      <View>
        <Image
          source={imgArr[currentImg]}
          style={{width: 300, height:300, left: "50%", transform: "[{translate(-50%)]}"}}
        />
        <Pressable style={{padding: 10, width: "80%",left: "50%", transform: "[{translate(-50%)}]", backgroundColor: "yellow",}} onPress={start}>
          <Text>FLIP</Text>
        </Pressable>
      </View>
      }
      
    </View>
  );
}
