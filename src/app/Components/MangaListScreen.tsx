import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, ScrollView } from 'react-native';

import Manga from '@/app/Components/Manga'; 
import { ISmanga } from '@/app/Components/ISmanga'; 
import { ISeditora } from '@/app/Components/ISeditora';
import MangaModal from '@/app/Components/MangaModal'; 

export default function MangaListScreen() {
  

  const [mangas, setMangas] = useState<ISmanga[]>([]);


  const [modalVisible, setModalVisible] = useState(false);
  
  
  const [mangaEditando, setMangaEditando] = useState<any>(null);

  
  const onAdd = (nome: string, descricao: string, capa: string, ano: string, tipoObra: string, genero: string, artista: string, autor: string, nomeeditora: string, paisorigem: string, siteoficial: string) => {
    
   
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
      editora: newEditora 
    };


    
   
    if (mangaEditando) {
      const listaAtualizada = mangas.map((manga) => manga.id === mangaEditando.id ? newManga : manga);
      setMangas(listaAtualizada);
    } 
    
    
    else {
      
      setMangas([...mangas, newManga]);
    }
    
    
    setModalVisible(false); 
    setMangaEditando(null); 
  };
    
 
  const onDelete = (idapagar: number) => {
   
    const listaAtualizada = mangas.filter((manga) => manga.id !== idapagar);
    setMangas(listaAtualizada);
  };

  
  const openModal = () => {
    setMangaEditando(null);
    setModalVisible(true);
  };

  
  const openEditModal = (mangaParaEditar: ISmanga) => {
    setMangaEditando(mangaParaEditar);
    setModalVisible(true);
  };

  
  const closeModal = () => {
    setModalVisible(false);
    setMangaEditando(null);
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

      <MangaModal 
        visible={modalVisible} 
        mangaEditando={mangaEditando} 
        onCancel={closeModal} 
        onAdd={onAdd} 
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#cc7777',
  },
  headerContainer: {
    backgroundColor: '#333',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40, 
  },
  headerButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    padding: 20,
    gap: 10, 
  },
});