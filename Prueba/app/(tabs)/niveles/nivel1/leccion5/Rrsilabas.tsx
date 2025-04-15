import React from 'react';
import SyllableScreen from '../../../../../components/SyllableScreen';
import {router} from "expo-router";

export default function Leccion1() {


    // @ts-ignore
    return (
        <SyllableScreen
            letter="Rr"
            syllables={["rra", "rre", "rri", "rro", "rru"]}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/R/Rrsilabaslearn.wav')}
            syllablesAudio={require('@assets/audio/lecciones/nivel1/lessons/R/Rsilabas.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion5/Rrpalabra')}
            // @ts-ignore
            onBack={() => router.push('/(tabs)/niveles/nivel1/leccion5/Rpalabra')}
        />

    );
}