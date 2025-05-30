import React from 'react';
import {router} from "expo-router";
import PracticeWordsScreen from "@/components/WordAudioScreen";

export default function Leccion2() {

    return ( <PracticeWordsScreen
        words={[
            { text: 'árbol', audio: require('@assets/audio/Todos.wav') },
            { text: 'limón', audio: require('@assets/audio/Todos.wav') },
            { text: 'café', audio: require('@assets/audio/Todos.wav') },
        ]}
        practiceAudio={require('@assets/audio/Todos.wav')}
        onTopBack={() => router.push('/(tabs)/Level5Screen')}
        onBottomBack={() => router.push('/(tabs)/niveles/nivel5/leccion1/firstScreen')}
        // @ts-ignore
        onNext={() => router.push('/(tabs)/niveles/nivel5/leccion1/pizarron')}
    />

    );

}




