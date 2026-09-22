import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';


export type MangaFormProps = {
  mangaEditando: any;
  onAdd: (nome: string, descricao: string, capa: string, ano: string, tipoObra: string, genero: string, artista: string, autor: string, nomeeditora: string, paisorigem: string, siteoficial: string) => void;
  onCancel: () => void;
};

export default function MangaFormScreen({ onAdd, onCancel, mangaEditando }: MangaFormProps) {
  
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
    } else {
      setNome(''); setDescricao(''); setCapa(''); setAno(''); settipoObra('');
      setGenero(''); setArtista(''); setAutor(''); setNomeeditora('');
      setPaisorigem(''); setSiteoficial('');
    }
  }, [mangaEditando]);

  const handleAdd = () => {
    onAdd(nome, descricao, capa, ano, tipoObra, genero, artista, autor, nomeeditora, paisorigem, siteoficial);
  };

  return (
    
    <ScrollView style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
      
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', marginTop: 40 }}>
        {mangaEditando ? 'Editar Obra' : 'Nova Obra'}
      </Text>

      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Nome da Obra" />
      <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} placeholder="Descrição ou Gênero" />
      <TextInput style={styles.input} value={ano} onChangeText={setAno} placeholder="Ano da Obra" />
      <TextInput style={styles.input} value={tipoObra} onChangeText={settipoObra} placeholder="Tipo de Obra" />
      <TextInput style={styles.input} value={genero} onChangeText={setGenero} placeholder="Gênero da obra" />
      <TextInput style={styles.input} value={artista} onChangeText={setArtista} placeholder="Nome do artista" />
      <TextInput style={styles.input} value={autor} onChangeText={setAutor} placeholder="Nome do autor" />
      <TextInput style={styles.input} value={capa} onChangeText={setCapa} placeholder="Link da capa" />
      <TextInput style={styles.input} value={nomeeditora} onChangeText={setNomeeditora} placeholder="Nome da Editora" />
      <TextInput style={styles.input} value={paisorigem} onChangeText={setPaisorigem} placeholder="País de origem" />
      <TextInput style={styles.input} value={siteoficial} onChangeText={setSiteoficial} placeholder="Site oficial" />
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, marginBottom: 50 }}>
        <TouchableOpacity onPress={onCancel}>
          <Text style={{ backgroundColor: 'rgba(226, 13, 13, 0.13)', fontWeight: 'bold', padding: 15, borderRadius: 5 }}>Voltar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleAdd}>
          <Text style={{ backgroundColor: 'rgba(13, 226, 77, 0.13)', fontWeight: 'bold', padding: 15, borderRadius: 5 }}>
            {mangaEditando ? "Salvar" : "Adicionar"}
          </Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: { borderColor: 'gray', borderBottomWidth: 1, marginBottom: 10, paddingVertical: 5 }
});