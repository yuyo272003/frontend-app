import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { playAudioGlobal, stopAudioGlobal } from '@/utils/AudioManager';
import { avanzarLeccion } from '@/utils/leassonProgress';
import { Audio, AVPlaybackSource } from 'expo-av';

// Utilidad para mezclar el array
function shuffleArray<T>(array: T[]): T[] {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

interface SyllablePair {
    syllable: string;
    file: any;
}

interface SyllableMatchGameProps {
    syllablePairs: SyllablePair[];
    practiceAudio: AVPlaybackSource;
    onNext?: () => void;
    onTopBack?: () => void;
    onBottomBack?: () => void;
    advanceEndpoint?: string;
}

export default function SyllableMatchGame({
                                              syllablePairs,
                                              practiceAudio,
                                              onNext,
                                              onTopBack,
                                              onBottomBack,
                                              advanceEndpoint,
                                          }: SyllableMatchGameProps) {
    const [soundButtons, setSoundButtons] = useState<any[]>([]);
    const [letterButtons, setLetterButtons] = useState<any[]>([]);
    const [matchedSyllables, setMatchedSyllables] = useState<string[]>([]);
    const [selectedSound, setSelectedSound] = useState<{ syllable: string } | null>(null);
    const [practiceSound, setPracticeSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            setSoundButtons(
                shuffleArray(syllablePairs).map((item, index) => ({
                    ...item,
                    id: index,
                }))
            );

            setLetterButtons(
                shuffleArray(syllablePairs).map((item, index) => ({
                    syllable: item.syllable,
                    id: index,
                }))
            );

            setMatchedSyllables([]);
            setSelectedSound(null);
            stopAudioGlobal();

            return () => {
                stopAudioGlobal();
            };
        }, [syllablePairs])
    );

    const handlePlaySound = async (button: { syllable: string; file: any }) => {
        await stopAudioGlobal(); // 🔇 Detiene cualquier audio en reproducción (incluso el principal)
        await playAudioGlobal(button.file);
        setSelectedSound({ syllable: button.syllable });
    };


    const handleSelectLetter = async (button: { syllable: string }) => {
        if (!selectedSound) return;

        if (selectedSound.syllable === button.syllable) {
            setMatchedSyllables((prev) => [...prev, button.syllable]);
        }

        setSelectedSound(null);
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


    const allMatched = matchedSyllables.length === syllablePairs.length;

    const handleNext = async () => {
        await stopAudioGlobal();

        if (advanceEndpoint) {
            try {
                await avanzarLeccion(advanceEndpoint);
            } catch (error) {
                console.error("Error al avanzar lección:", error);
            }
        }

        if (onNext) onNext();
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

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.topBackButton}
                onPress={async () => {
                    await stopAudioGlobal();
                    if (onTopBack) onTopBack();
                }}
            >
                <Ionicons name="arrow-back" size={28} color="#2e6ef7" />
            </TouchableOpacity>

            <View style={styles.matchContainer}>
                <View style={styles.column}>
                    {soundButtons.map((button) => (
                        <TouchableOpacity
                            key={`sound-${button.id}`}
                            style={[
                                styles.soundButton,
                                matchedSyllables.includes(button.syllable) && styles.correctMatch,
                            ]}
                            onPress={() => handlePlaySound(button)}
                            disabled={matchedSyllables.includes(button.syllable)}
                        >
                            <Ionicons name="volume-high" size={24} color="#2e6ef7" />
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.column}>
                    {letterButtons.map((button) => (
                        <TouchableOpacity
                            key={`letter-${button.id}`}
                            style={[
                                styles.letterButton,
                                matchedSyllables.includes(button.syllable) && styles.correctMatch,
                            ]}
                            onPress={() => handleSelectLetter(button)}
                            disabled={matchedSyllables.includes(button.syllable)}
                        >
                            <Text style={styles.syllableText}>{button.syllable}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.bottomBox}>
                <TouchableOpacity style={styles.playInstruction} onPress={togglePracticeAudio}>
                    <Ionicons name={isPlaying ? 'pause' : 'play'} size={28} color="white" />
                </TouchableOpacity>


                <View style={styles.progressBar}>
                    <View
                        style={[
                            styles.progressFill,
                            { width: `${(matchedSyllables.length / syllablePairs.length) * 100}%` },
                        ]}
                    />
                </View>

                <View style={styles.navButtons}>
                    <TouchableOpacity
                        style={styles.bottomBackButton}
                        onPress={async () => {
                            await stopAudioGlobal();
                            if (onBottomBack) onBottomBack();
                        }}
                    >
                        <Ionicons name="arrow-back" size={24} color="red" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.restartButton}
                        onPress={restartPracticeAudio}
                    >
                        <Ionicons name="refresh" size={24} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.nextButton, { backgroundColor: allMatched ? '#00c853' : '#aaa' }]}
                        disabled={!allMatched}
                        onPress={handleNext}
                    >
                        <Ionicons name="arrow-forward" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
    },
    topBackButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
        padding: 14,
        borderRadius: 50,
        elevation: 5,
    },
    matchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 80,
        marginBottom: 140,
    },
    column: {
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
    },
    soundButton: {
        width: 100,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#2e6ef7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    letterButton: {
        width: 100,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    correctMatch: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
    },
    syllableText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    bottomBox: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 200,
        backgroundColor: '#1D2233',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
        alignItems: 'center',
        elevation: 10,
    },
    playInstruction: {
        backgroundColor: '#2e6ef7',
        padding: 14,
        borderRadius: 12,
        width: '90%',
        alignItems: 'center',
        marginBottom: 12,
    },
    progressBar: {
        width: '80%',
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 20,
    },
    progressFill: {
        height: 5,
        backgroundColor: '#2e6ef7',
    },
    navButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginTop: 10,
    },
    bottomBackButton: {
        width: 50,
        height: 50,
        backgroundColor: '#ffffff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    restartButton: {
        width: 50,
        height: 50,
        backgroundColor: '#2e6ef7',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
