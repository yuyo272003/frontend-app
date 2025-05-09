import React from 'react';
import LetterScreen2 from '../../../../../../components/ConsonantScreen';
import {router} from "expo-router";

export default function Leccion2() {


    return (
        <LetterScreen2
            letter="Nn"
            letterAudio={require('@assets/audio/levels/nivel1/lessons/N/N.wav')}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/N/Nlearn.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion2/Mm/Mpalabra')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion2/Nn/Nboard')}

        />
    );
}