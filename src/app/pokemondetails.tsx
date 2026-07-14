import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

console.log('🔥 POKEMONDETAILS.TSX LOADED');

export default function PokemonDetails() {
const params = useLocalSearchParams()
console.log(params)
const { name } = useLocalSearchParams<{ name: string }>();

useEffect(() => {
    fetchPokemonByName(name)
}, [])

async function fetchPokemonByName(name: string) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${name}`
    );
    console.log(response);
    const data = await response.json();
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}
  return (
    <ScrollView 
    contentContainerStyle={{
        gap:16,
        padding: 16
    }}
    >
    </ScrollView>
  );
}

const styles = StyleSheet.create({});