import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

console.log('🔥 INDEX.TSX LOADED');

interface pokemon {
  name: string;
  image: string;
  imageBack: string;
  types: pokemanTypes[];
}

interface pokemanTypes {
  type: {
  name: string;
  url:string;
  }
}

const colorsByType: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export default function HomeScreen() {

  const [pokemons, setPokemons] = useState<pokemon[]>([]);
  console.log(JSON.stringify(pokemons[0], null, 2));

  useEffect(() => {
    fetchPokemon();
  }, [])

  async function fetchPokemon() {
    console.log("fetchPokemon called");

    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20");
      const data = await response.json();

      //Fetch pokemons details
      const detailPokemons = await Promise.all(
        data.results.map(async (pokemons: any) => {
        const res = await fetch(pokemons.url);
        const details = await res.json();
        return {
          name: pokemons.name,
          image: details.sprites.front_default,
          imageBack: details.sprites.back_default,
          types: details.types,
        };
        })
      );

      // console.log(data)
      setPokemons(detailPokemons);
    } catch(e) {
      console.log(e)
    } 
  }

  return (
    // <View
    //   style={{
    //     flex: 1,
    //     backgroundColor: 'white',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //   }}>
    //   <Text style={{ color: 'black', fontSize: 30 }}>
    //     Hello React Native
    //   </Text>
    //   <ScrollView>
    //     setPokemons(data)
    //   </ScrollView>
    // </View>
    <ScrollView 
    contentContainerStyle={{
      gap: 16,
      padding: 16
    }}>
      {pokemons.map((pokemon) => (
        <Link key={pokemon.name}
        href={{ pathname: "/pokemondetails", params: { name: pokemon.name },
      }}
        style={
          {
            // @ts-ignore
            backgroundColor: (colorsByType[pokemon.types[0]?.type.name] ?? "#FFFFFF") + "50",
            padding: 20, 
            borderRadius: 20
          }
        }
        >
        <View>
        <Text style={styles.name}>{pokemon.name}</Text>
        <Text style={styles.typeName}>{pokemon.types[0].type.name}</Text>
        <View style={
          {flexDirection: "row",
          }}>
        <Image
          source={{uri: pokemon.image}}
          style={{ width: 160, height: 160}}
        />
        <Image
        source={{uri: pokemon.imageBack}}
        style={{ width: 160, height: 160}}
        />
       </View>
        </View>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
name: {
  fontSize: 28,
  fontWeight: "bold",
  textAlign: "center",
},
typeName: {
  fontSize: 18,
  fontWeight: "bold",
  color: "grey",
  textAlign: "center",
}
})