import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

import Manga from '@/app/Components/Manga'; 
import { ISmanga } from '@/app/Components/ISmanga'; 
import { ISeditora } from '@/app/Components/ISeditora';
import MangaModal from '@/app/Components/MangaModal'; 
import MangaTelaScreen from '@/app/Components/MangaTelaScreen'; 

export default function MangaListScreen() {
  
  const [mangas, setMangas] = useState<ISmanga[]>([]);
  const [telaAtual, setTelaAtual] = useState<'lista' | 'telaForm'>('lista');
  const [mangaEditando, setMangaEditando] = useState<any>(null);

  
  useEffect(() => {
    carregarMangasSalvos(); 
  }, []);









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














  const onAdd = (nome: string, descricao: string, capa: string, ano: string, tipoObra: string, genero: string, artista: string, autor: string, nomeeditora: string, paisorigem: string, siteoficial: string, localizacaoGPS?: string) => {
    
    const newEditora: ISeditora = {
      id: mangaEditando ? mangaEditando.editora.id : Math.random(), 
      nomeeditora: nomeeditora,
      paisorigem: paisorigem,
      siteoficial: siteoficial
    };
    
    const newManga: ISmanga = {
      id: mangaEditando ? mangaEditando.id : Math.random(), 
      name: nome,
      description: descricao,
      capa: capa,  
      ano: ano, 
      tipoObra: tipoObra,
      genero: genero,
      artista: artista,
      autor: autor,
      editora: newEditora,
      localizacaoGPS: localizacaoGPS
    
    };

    let listaAtualizada;
    if (mangaEditando) {
      listaAtualizada = mangas.map((manga) => manga.id === mangaEditando.id ? newManga : manga);
    } else {
      listaAtualizada = [...mangas, newManga];
    }

    setMangas(listaAtualizada);
    salvarNoAsyncStorage(listaAtualizada); 
    
    setTelaAtual('lista');
    setMangaEditando(null); 
  };
    
  const onDelete = (idapagar: number) => {
    const listaAtualizada = mangas.filter((manga) => manga.id !== idapagar);
    setMangas(listaAtualizada);
    salvarNoAsyncStorage(listaAtualizada); 
  };

  const openModal = () => {
    setMangaEditando(null);
    setTelaAtual('telaForm');
  };

  const openEditModal = (mangaParaEditar: ISmanga) => {
    setMangaEditando(mangaParaEditar);
    setTelaAtual('telaForm');
  };

  const closeModal = () => {
    setTelaAtual('lista');
    setMangaEditando(null);
  };

  if (telaAtual === 'telaForm') {
    return (
      <MangaTelaScreen 
        mangaEditando={mangaEditando} 
        onCancel={closeModal} 
        onAdd={onAdd} 
      />
    );
  }

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