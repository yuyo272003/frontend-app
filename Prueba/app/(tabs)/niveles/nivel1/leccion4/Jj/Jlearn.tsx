import React from 'react';
import LetterScreen2 from '../../../../../../components/ConsonantScreen';
import {router} from "expo-router";

export default function Leccion2() {


    return (
        <LetterScreen2
            letter="Jj"
            letterAudio={require('@assets/audio/levels/nivel1/lessons/J/J.wav')}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/J/Jlearn.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion4/Ff/Fpalabra')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion4/Jj/Jboard')}

        />
    );
}