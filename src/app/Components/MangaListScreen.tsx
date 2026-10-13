import React, { useState, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useRouter, useFocusEffect } from 'expo-router'; 

import Manga from '@/app/Components/Manga'; 
import { ISmanga } from '@/app/Components/ISmanga'; 

export default function MangaListScreen() {
  const [mangas, setMangas] = useState<ISmanga[]>([]);
  const router = useRouter(); 

  // useFocusEffect: Atualiza a lista toda vez que você volta pra essa tela
  useFocusEffect(
    useCallback(() => {
      carregarMangasSalvos(); 
    }, [])
  );

  const carregarMangasSalvos = async () => {
    try {
      const dadosSalvos = await AsyncStorage.getItem('@mangas_salvos');
      if (dadosSalvos !== null) {
        setMangas(JSON.parse(dadosSalvos)); 
      }
    } catch (error) {
      console.log('Erro ao carregar dados:', error);
    }
  };

  const salvarNoAsyncStorage = async (novaLista: ISmanga[]) => {
    try {
      await AsyncStorage.setItem('@mangas_salvos', JSON.stringify(novaLista)); 
    } catch (error) {
      console.log('Erro ao salvar dados:', error);
    }
  };

  const onDelete = async (idapagar: number) => {
    const listaAtualizada = mangas.filter((manga) => manga.id !== idapagar);
    setMangas(listaAtualizada);
    await salvarNoAsyncStorage(listaAtualizada); 
  };


  const openModal = () => {
    router.push('/Components/MangaTelaScreen'); 
  };

  
  const openEditModal = (mangaParaEditar: ISmanga) => {
    router.push({ pathname: '/Components/MangaTelaScreen', params: { idEditando: mangaParaEditar.id } });
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={openModal}>
          <Text style={styles.headerButton}>+ Adicionar Mangá</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {mangas.map((manga) => (
          <Manga 
            key={manga.id} 
            id={manga.id}
            name={manga.name} 
            description={manga.description} 
            capa={manga.capa}
            tipoObra={manga.tipoObra}
            genero={manga.genero}
            ano={manga.ano}
            artista={manga.artista}
            autor={manga.autor}
            nomeeditora={manga.editora?.nomeeditora}
            paisorigem={manga.editora?.paisorigem}
            siteoficial={manga.editora?.siteoficial}
            onDelete={() => onDelete(manga.id)}
            onEdit={() => openEditModal(manga)} 
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flex: 1, backgroundColor: '#cc7777' },
  headerContainer: { backgroundColor: '#333', padding: 20, alignItems: 'center', justifyContent: 'center', marginTop: 40 },
  headerButton: { color: 'white', fontWeight: 'bold', fontSize: 18, backgroundColor: '#007BFF', padding: 10, borderRadius: 5 },
  container: { flex: 1, padding: 20, gap: 10 },
});