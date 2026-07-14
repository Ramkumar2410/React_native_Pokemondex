import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';


console.log('🔥 POKEMONDETAILS.TSX LOADED');

export default function PokemonDetails() {
const params = useLocalSearchParams()
console.log(params)
const { name } = useLocalSearchParams<{ name: string }>();

const [pokemon, setPokemon] = useState<any>(null);
const [description, setDescription] = useState("");

 useEffect(() => {
    if (name) {
      fetchPokemonByName(name);
    }
  }, [name]);

async function fetchPokemonByName(name: string) {
    try {
      // Pokemon Details
      const pokemonResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      const pokemonData = await pokemonResponse.json();
      // Pokemon Species
      const speciesResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${name}`
      );
      const speciesData = await speciesResponse.json();
      const englishEntry = speciesData.flavor_text_entries.find(
        (entry: any) => entry.language.name === "en"
      );
      setPokemon(pokemonData);
      setDescription(
        englishEntry?.flavor_text.replace(/\n|\f/g, " ") ?? ""
      );
    } catch (error) {
      console.log(error);
    }
  }
  if (!pokemon) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text>Loading...</Text>
      </View>
    );

  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{
          uri: pokemon.sprites.other["official-artwork"].front_default,
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.name}>
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </Text>
      <Text style={styles.number}>#{pokemon.id}</Text>
      <View style={styles.typeContainer}>
        {pokemon.types.map((item: any) => (
          <View key={item.type.name} style={styles.typeChip}>
            <Text style={styles.typeText}>
              {item.type.name}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.infoRow}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Height</Text>
          <Text>{pokemon.height / 10} m</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Weight</Text>
          <Text>{pokemon.weight / 10} kg</Text>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>
        {description}
      </Text>
    </ScrollView>
  );

}

const styles = StyleSheet.create({

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },

  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  image: {
    width: 250,
    height: 250,
  },

  name: {
    fontSize: 32,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginTop: 10,
  },

  number: {
    color: "#777",
    fontSize: 18,
    marginBottom: 16,
  },

  typeContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },

  typeChip: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },

  typeText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "capitalize",
  },

  infoRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  infoCard: {
    width: "47%",
    backgroundColor: "#F2F2F2",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  infoTitle: {
    fontWeight: "bold",
    marginBottom: 6,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 10,
  },

  description: {
    fontSize: 12,
    lineHeight: 24,
    textAlign: "justify",
    color: "#444",
  },
});