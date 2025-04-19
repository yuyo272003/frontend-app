import React from 'react';
import LetterScreen2 from '../../../../../../components/FirstLetterScreenConsonants';
import {router} from "expo-router";

export default function Leccion2() {


    return (
        <LetterScreen2
            letter="Bb"
            letterAudio={require('@assets/audio/lecciones/nivel1/lessons/B/B.wav')}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/B/Blearn.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion3/Bb/Bboard')}

        />
    );
}