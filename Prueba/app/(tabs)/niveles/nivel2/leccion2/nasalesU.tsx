import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'mu', file: require('@assets/audio/levels/nivel2/audios_lesson2/mu.wav') },
        { syllable: 'nu', file: require('@assets/audio/levels/nivel2/audios_lesson2/nu.wav') },
        { syllable: 'ñu', file: require('@assets/audio/levels/nivel2/audios_lesson2/ñu.wav') },
    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel1/actividad.wav')}
            onTopBack={() => router.push('/(tabs)/Level2Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion2/nasalesO')}
                    // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel2/leccion2/explosivasA')}

        /> 
    );
}