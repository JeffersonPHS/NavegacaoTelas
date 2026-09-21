import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';

export type MangaModalProps = {
  visible: boolean;
  mangaEditando: any;
  onAdd: (nome: string, descricao: string, capa: string, ano: string, tipoObra: string, genero: string, artista: string, autor: string, nomeeditora: string, paisorigem: string, siteoficial: string) => void;
  onCancel: () => void;
};

export default function MangaModal({ visible, onAdd, onCancel, mangaEditando }: MangaModalProps) {
  
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
 const [ano, setAno] = useState('');
 const [tipoObra, settipoObra] = useState('');
 const [genero, setGenero] = useState('');
 const [artista, setArtista] = useState('');
 const [autor, setAutor] = useState('');
 const [capa, setCapa] = useState('');
const [nomeeditora, setNomeeditora] = useState('');
const [paisorigem, setPaisorigem] = useState('');
const [siteoficial, setSiteoficial] = useState('');
 


useEffect(() => {
    if (mangaEditando) {
      setNome(mangaEditando.name);
      setDescricao(mangaEditando.description);
      setCapa(mangaEditando.capa);
      setAno(mangaEditando.ano);
      settipoObra(mangaEditando.tipoObra);
      setGenero(mangaEditando.genero);
      setArtista(mangaEditando.artista);
      setAutor(mangaEditando.autor);
      setNomeeditora(mangaEditando.editora?.nomeeditora || '');
      setPaisorigem(mangaEditando.editora?.paisorigem || '');
      setSiteoficial(mangaEditando.editora?.siteoficial || '');
    } 
    
    else {
      
      setNome(''); setDescricao(''); setCapa(''); setAno(''); settipoObra('');
      setGenero(''); setArtista(''); setAutor(''); setNomeeditora('');
      setPaisorigem(''); setSiteoficial('');
    }
  }, [mangaEditando, visible]);



  const handleAdd = () => {
   onAdd(nome, descricao, capa, ano, tipoObra, genero, artista, autor, nomeeditora, paisorigem, siteoficial );
    
    
    setNome(''); 
    setDescricao('');
    setCapa('');
    setAno('');
    settipoObra('');
    setGenero('');
    setArtista('');
    setAutor('');
    setNomeeditora('');
    setPaisorigem('');
    setSiteoficial('');
  };

  return (
    <Modal style={{alignItems: 'center',  marginTop: 100, }} visible={visible} animationType="slide" transparent={true} onRequestClose={onCancel}>
      <View style={{alignItems: 'center', backgroundColor: 'white', width: 500}}>
        <View >
          
         
          <TextInput style={{borderColor: 'white'}} value={nome} onChangeText={setNome} placeholder="Nome da Obra" placeholderTextColor="gray"/>

         
          <TextInput value={descricao} onChangeText={setDescricao} placeholder="Descrição ou Gênero" placeholderTextColor="gray" />
 

  <TextInput value={ano} onChangeText={setAno} placeholder="Ano da Obra" placeholderTextColor="gray" />
   <TextInput value={tipoObra} onChangeText={settipoObra} placeholder="Descrição ou Gênero" placeholderTextColor="gray" />
    <TextInput value={genero} onChangeText={setGenero} placeholder="Genero da obra" placeholderTextColor="gray" />
     <TextInput value={artista} onChangeText={setArtista} placeholder="Nome do artista" placeholderTextColor="gray" />
      <TextInput value={autor} onChangeText={setAutor} placeholder="Nome do autor" placeholderTextColor="gray" />
       <TextInput value={capa} onChangeText={setCapa} placeholder="Link da capa" placeholderTextColor="gray" />
         <TextInput value={nomeeditora} onChangeText={setNomeeditora} placeholder="Nome da Editora" placeholderTextColor="gray" />
          <TextInput value={paisorigem} onChangeText={setPaisorigem} placeholder="Nome do pais" placeholderTextColor="gray" />
           <TextInput value={siteoficial} onChangeText={setSiteoficial} placeholder="Nome do site oficial" placeholderTextColor="gray" />
          <View>
          
            <TouchableOpacity onPress={onCancel}>

              <Text style={{backgroundColor: 'rgba(226, 13, 13, 0.13)',  fontWeight: 'bold',  padding: 10, borderRadius: 5}}>Cancelar</Text>

            </TouchableOpacity>

           
            <TouchableOpacity onPress={handleAdd}>

              <Text style={{backgroundColor: 'rgba(13, 226, 77, 0.13)',  fontWeight: 'bold',  padding: 10, borderRadius: 5}}>Adicionar</Text>

            </TouchableOpacity>

          </View>

        </View>
      </View>
    </Modal>
  );
}

