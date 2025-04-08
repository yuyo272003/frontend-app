import React from 'react';
import SyllableScreen from '../../../../../components/SyllableScreen';
import {router} from "expo-router";

export default function Leccion1() {


    // @ts-ignore
    return (
        <SyllableScreen
            letter="n"
            syllables={["na", "ne", "ni", "no", "nu"]}
            practiceAudio={require('@assets/audio/lecciones/nivel1/intro.wav')}
            syllablesAudio={require('@assets/audio/lecciones/nivel1/intro.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion2/Npalabra')}
            // @ts-ignore
            onBack={() => router.push('/(tabs)/niveles/nivel1/leccion2/Nboard')}
        />

    );
}