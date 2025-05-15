import React from 'react';
import { router } from 'expo-router';
import SyllableScreen from '../../../../../components/SilabasMicrofono';

export default function LeccionSal() {
    return (
        <SyllableScreen
            syllables={[
                { text: 'Pez', audio: require('@assets/audio/levels/nivel4/pez.wav') }
            ]}
            /** La palabra completa a verificar */
            targetWord="Pez"
            /** Audio de práctica para la palabra */
            practiceAudio={require('@assets/audio/levels/nivel4/instruction.wav')}
            /** Audio que se reproduce al acertar */
            successAudio={require('@assets/audio/levels/nivel4/correctopalabra.wav')}
            failureAudio={require('@assets/audio/levels/nivel4/fallopalabra.wav')}
            /** Ilustración de la palabra */
            imageSource={require('@assets/images/lecciones/nivel4/leccion1/monosilabas/pez.png')}
            /** Atrás (arriba) */
            onTopBack={() => router.push('/(tabs)/Level4Screen')}
            /** Atrás (abajo) */
            onBottomBack={() => router.push('/(tabs)/niveles/nivel4/leccion1/Flor')}
            /** Siguiente */
            onNext={() => router.push('/(tabs)/niveles/nivel4/leccion1/Sal')}
        />
    );
}
