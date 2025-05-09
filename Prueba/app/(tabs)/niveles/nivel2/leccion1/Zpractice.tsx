import React, { useCallback } from 'react';
import PracticeImageAudioScreen from '../../../../../components/PracticeWordScreen';
import { router } from 'expo-router';
import { avanzarLeccion } from '@/utils/leassonProgress';

export default function ScreenWord() {
  const images = [
    { id: '1', src: require('@/assets/images/lecciones/nivel2/cereza.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/cereza.wav'), isCorrect: false },
    { id: '2', src: require('@/assets/images/lecciones/nivel2/zapato.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/zapato.wav'), isCorrect: true },
    { id: '3', src: require('@/assets/images/lecciones/nivel2/serpiente.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/serpiente.wav'), isCorrect: false },
    { id: '4', src: require('@/assets/images/lecciones/nivel2/sol.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/sol.wav'), isCorrect: false },
    { id: '5', src: require('@/assets/images/lecciones/nivel2/zanahoria.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/zanahoria.wav'), isCorrect: true },
    { id: '6', src: require('@/assets/images/lecciones/nivel2/zorro.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/zorro.wav'), isCorrect: true },
  ];

  const handleNext = useCallback(async () => {
    try {
      // llamamos al endpoint que definiste en Laravel
      await avanzarLeccion('/progreso/avanzar-leccion-7');
      // y navegamos a la siguiente pantalla
      router.push('/(tabs)/Level2Screen');
    } catch (error) {
      console.error('No se pudo avanzar de lección:', error);
      // aquí puedes mostrar una alerta o toast si lo deseas
    }
  }, []);

  return (
      <PracticeImageAudioScreen
          title="Zz"
          titleAudio={require('@/assets/audio/levels/nivel1/lessons/G/G.wav')}
          practiceAudio={require('@/assets/audio/levels/nivel2/audios_lesson1/practice.wav')}
          images={images}
          onTopBack={() => router.push('/(tabs)/Level2Screen')}
          onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion1/Ypractice')}
          onNext={handleNext}
      />
  );
}

