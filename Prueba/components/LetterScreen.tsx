import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Audio, AVPlaybackSource } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import api from '@/scripts/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePathname, useRouter } from 'expo-router';

type LetterScreenProps = {
    letter: string,
    letterAudio: any,
    practiceAudio: any,
    onNext?: () => void;
    onTopBack?: () => void;
    onBottomBack?: () => void;
};

export default function LetterScreen({
                                         letter,
                                         letterAudio,
                                         practiceAudio,
                                         onNext,
                                         onTopBack,
                                         onBottomBack
                                     }: LetterScreenProps) {
    const [practiceSound, setPracticeSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const [userProgress, setUserProgress] = useState<number>(0);

    const pathname = usePathname();

    useEffect(() => {
        (async () => {
            try {
                const token = await AsyncStorage.getItem('auth_token');
                if (!token) return;
                const resp = await api.get('/progreso', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserProgress(resp.data.porcentaje || 0);
            } catch (e) {
                console.error('No pude cargar el progreso', e);
            }
        })();
    }, []);

    const playLetterSound = async (file: AVPlaybackSource) => {
        const { sound } = await Audio.Sound.createAsync(file);
        await sound.playAsync();
    };

    const togglePracticeAudio = async () => {
        if (practiceSound && isPlaying) {
            await practiceSound.pauseAsync();
            setIsPlaying(false);
            setIsPaused(true);
        } else if (practiceSound && isPaused) {
            await practiceSound.playAsync();
            setIsPlaying(true);
            setIsPaused(false);
        } else {
            const { sound } = await Audio.Sound.createAsync(practiceAudio);
            setPracticeSound(sound);
            await sound.playAsync();
            setIsPlaying(true);

            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.didJustFinish) {
                    setIsPlaying(false);
                    setIsPaused(false);
                }
            });
        }
    };

    const restartPracticeAudio = async () => {
        if (practiceSound) {
            await practiceSound.stopAsync();
            await practiceSound.setPositionAsync(0);
            await practiceSound.playAsync();
            setIsPlaying(true);
            setIsPaused(false);
        }
    };

    const stopAudioAndNavigate = async (navigationFn?: () => void) => {
        if (practiceSound) {
            await practiceSound.stopAsync();
            await practiceSound.unloadAsync();
            setPracticeSound(null);
        }
        setIsPlaying(false);
        setIsPaused(false);
        navigationFn?.();
    };

    const showBottomBack = pathname !== '/niveles/nivel1/leccion1/Aa/leccion';

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.topBackButton}
                onPress={() => stopAudioAndNavigate(onTopBack)}
            >
                <Ionicons name="arrow-back" size={32} color="#2b2b2b" />
            </TouchableOpacity>

            <Text style={styles.letterText}>{letter}</Text>

            <TouchableOpacity
                style={styles.soundButton}
                onPress={() => playLetterSound(letterAudio)}
            >
                <Ionicons name="volume-high" size={24} color="white" />
            </TouchableOpacity>

            <View style={styles.bottomPanel}>
                <TouchableOpacity
                    style={styles.playButton}
                    onPress={togglePracticeAudio}
                >
                    <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="white" />
                </TouchableOpacity>

                {/* ───────── progress bar ───────── */}
                <View style={styles.progressBarContainer}>
                    {/* Fill */}
                    <View style={[styles.progressFill, { flex: userProgress }]} />
                    {/* Empty remainder */}
                    <View style={{ flex: 100 - userProgress }} />
                </View>

                <TouchableOpacity
                    style={styles.restartButton}
                    onPress={restartPracticeAudio}
                >
                    <Ionicons name="refresh" size={24} color="white" />
                </TouchableOpacity>

                {showBottomBack && (
                    <TouchableOpacity style={styles.backButton} onPress={() => stopAudioAndNavigate(onBottomBack)}>
                    <Ionicons name="arrow-back" size={24} color="red" />
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => stopAudioAndNavigate(onNext)}
                >
                    <Ionicons name="arrow-forward" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 150,
    },
    letterText: {
        fontSize: 96,
        fontWeight: 'bold',
        color: '#2b2b2b',
    },
    soundButton: {
        marginTop: -5,
        backgroundColor: '#2e6ef7',
        padding: 10,
        borderRadius: 8,
    },
    bottomPanel: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 200,
        backgroundColor: '#242C3B',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
        alignItems: 'center',
        elevation: 10,
    },
    playButton: {
        backgroundColor: '#2e6ef7',
        padding: 16,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        marginBottom: 16,
    },
    progressBarContainer: {
        flexDirection: 'row',
        height: 6,
        width: '90%',
        borderRadius: 3,
        overflow: 'hidden',
        marginBottom: 16,
        backgroundColor: '#555', // color del espacio vacío
    },
    progressFill: {
        backgroundColor: '#2e6ef7', // color de la barra llena
    },
    restartButton: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: '#2e6ef7',
        borderRadius: 50,
        padding: 15,
        alignSelf: 'center',
    },
    nextButton: {
        position: 'absolute',
        right: 30,
        bottom: 20,
        backgroundColor: '#33cc66',
        borderRadius: 50,
        padding: 15,
    },
    backButton: {
        position: 'absolute',
        left: 30,
        bottom: 20,
        backgroundColor: '#ffffff',
        borderRadius: 50,
        padding: 15,
    },
    topBackButton: { 
        position: 'absolute',
        top: 35, 
        left: 15, 
        zIndex: 10, 
        backgroundColor: '#f0f0f0', 
        padding: 15, 
        borderRadius: 50 },
});
