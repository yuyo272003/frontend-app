import React, {useEffect} from 'react';
import {router} from "expo-router";
import PracticeImageAudioScreen from '../../../../../components/PracticeWordScreen';

export default function ScreenWord() {
  const images = [
    { id: '1', src: require('@/assets/images/lecciones/nivel2/guante.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/guante.wav'), isCorrect: false },
    { id: '2', src: require('@/assets/images/lecciones/nivel2/hueso.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/hueso.wav'), isCorrect: false },
    { id: '3', src: require('@/assets/images/lecciones/nivel2/waffle.png'),audio: require('@/assets/audio/levels/nivel2/audios_lesson1/waffle.wav'), isCorrect: true },
    { id: '4', src: require('@/assets/images/lecciones/nivel2/queso.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/queso.wav'),isCorrect: false },
    { id: '5', src: require('@/assets/images/lecciones/nivel2/sandwich.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/sandwich.wav'),isCorrect: true },
    { id: '6', src: require('@/assets/images/lecciones/nivel2/wifi.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/wifi.wav'),isCorrect: true},
  ];  

  return (
    <PracticeImageAudioScreen
        title="Ww"
        titleAudio={require('@assets/audio/levels/nivel1/lessons/G/G.wav')}
        practiceAudio={require('@/assets/audio/levels/nivel2/audios_lesson1/practice.wav')} 
        images={images}
        onTopBack={() => router.push('/(tabs)/Level2Screen')}
        // @ts-ignore
        onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion1/Vpractice')}
        // @ts-ignore
        onNext={() => router.push('/(tabs)/niveles/nivel2/leccion1/Xpractice')}
      
    />
  );
}
