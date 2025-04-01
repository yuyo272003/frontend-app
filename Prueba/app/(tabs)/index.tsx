import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";

const WelcomeScreen = () => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false); // Estado para controlar si el audio está sonando

    const playAudio = async () => {
        // Si ya hay un sonido cargado y se está reproduciendo, lo pausamos
        if (isPlaying && sound) {
            await sound.stopAsync();  // Detenemos el audio
            setIsPlaying(false);  // Actualizamos el estado a "no está reproduciéndose"
        } else {
            // Si no hay audio o no se está reproduciendo, lo cargamos y reproducimos
            if (sound) {
                await sound.unloadAsync(); // Liberamos cualquier recurso previamente cargado
                setSound(null); // Restablecemos el estado del sonido
            }

            const { sound: newSound } = await Audio.Sound.createAsync(
                require("../../assets/audio/bienvenida.wav") // reemplaza con tu archivo de audio
            );
            setSound(newSound);
            await newSound.playAsync(); // Reproducimos el nuevo audio
            setIsPlaying(true); // Marcamos el estado como "reproduciéndose"
        }
    };

    return (
        <LinearGradient colors={["#007AFF", "#0056B3"]} style={styles.container}>
            <Text style={styles.title}>MentorApp</Text>

            {/* Botón 1: Reproduce o pausa el audio */}
            <TouchableOpacity style={styles.button} onPress={playAudio}>
                <Feather name={isPlaying ? "pause" : "play"} size={24} color="#007AFF" />
            </TouchableOpacity>

            {/* Botón 2: Navegar a Registro */}
            <TouchableOpacity
                style={styles.buttonSecondary}
                onPress={() => router.push("/(tabs)/registro")}
            >
                <MaterialIcons name="arrow-forward" size={24} color="green" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/(tabs)/login")}>
                <Text style={styles.link}>¿Y si sé leer y escribir?</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "white",
        marginBottom: 40,
    },
    button: {
        width: 327,
        height: 48,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonSecondary: {
        width: 327,
        height: 48,
        backgroundColor: "white",
        borderColor: "green",
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 20,
    },
    link: {
        color: "white",
        textDecorationLine: "underline",
    },
});

export default WelcomeScreen;
