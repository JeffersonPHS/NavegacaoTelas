import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import * as Location from 'expo-location'; 
import { useRouter, useLocalSearchParams } from 'expo-router'; 
import { ISmanga } from '@/app/Components/ISmanga';
import { ISeditora } from '@/app/Components/ISeditora';






export default function MangaTelaScreen() {
  const router = useRouter(); 

  const params = useLocalSearchParams();
  
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
  const [localizacao, setLocalizacao] = useState('Nenhuma localização obtida');
 
  
  useEffect(() => {
    if (params.idEditando) {
      carregarObraParaEditar(Number(params.idEditando));
    }
  }, [params.idEditando]);

  const carregarObraParaEditar = async (id: number) => {
    const dados = await AsyncStorage.getItem('@mangas_salvos');
    if (dados) {
      const lista: ISmanga[] = JSON.parse(dados);
      const obra = lista.find(m => m.id === id);
      if (obra) {
        setNome(obra.name);
        setDescricao(obra.description);
        setCapa(obra.capa);
        setAno(obra.ano);
        settipoObra(obra.tipoObra);
        setGenero(obra.genero);
        setArtista(obra.artista);
        setAutor(obra.autor);
        setNomeeditora(obra.editora?.nomeeditora || '');
        setPaisorigem(obra.editora?.paisorigem || '');
        setSiteoficial(obra.editora?.siteoficial || '');
        if (obra.localizacaoGPS) setLocalizacao(obra.localizacaoGPS);
      }
    }
  };

  const pegarLocalizacaoGPS = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Precisamos da permissão de localização.');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      const coords = `Lat: ${currentLocation.coords.latitude.toFixed(4)}, Lon: ${currentLocation.coords.longitude.toFixed(4)}`;
      setLocalizacao(coords);
      Alert.alert('GPS Capturado!', coords);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível obter a localização do GPS.');
    }
  };

 
  const handleAdd = async () => {
    const newEditora: ISeditora = {
      id: Math.random(), 
      nomeeditora: nomeeditora,
      paisorigem: paisorigem,
      siteoficial: siteoficial
    };
    
    const newManga: ISmanga = {
      id: params.idEditando ? Number(params.idEditando) : Math.random(), 
      name: nome,
      description: descricao,
      capa: capa,  
      ano: ano, 
      tipoObra: tipoObra,
      genero: genero,
      artista: artista,
      autor: autor,
      editora: newEditora,
      localizacaoGPS: localizacao
    };

    try {
      const dadosSalvos = await AsyncStorage.getItem('@mangas_salvos');
      let listaAtualizada: ISmanga[] = dadosSalvos ? JSON.parse(dadosSalvos) : [];

      if (params.idEditando) {
        listaAtualizada = listaAtualizada.map((manga) => manga.id === newManga.id ? newManga : manga);
      } else {
        listaAtualizada.push(newManga);
      }

      await AsyncStorage.setItem('@mangas_salvos', JSON.stringify(listaAtualizada)); 
     
      router.replace('/'); 
    } catch (error) {
      console.log('Erro', error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
      
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', marginTop: 40 }}>
        {params.idEditando ? 'Editar Obra' : 'Nova Obra'}
      </Text>

      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Nome da Obra" placeholderTextColor="gray" />
      <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} placeholder="Descrição ou Gênero" placeholderTextColor="gray" />
      <TextInput style={styles.input} value={ano} onChangeText={setAno} placeholder="Ano da Obra" placeholderTextColor="gray" />
      <TextInput style={styles.input} value={tipoObra} onChangeText={settipoObra} placeholder="Tipo de Obra" placeholderTextColor="gray" />
      <TextInput style={styles.input} value={genero} onChangeText={setGenero} placeholder="Gênero da obra" placeholderTextColor="gray" />
      <TextInput style={styles.input} value={artista} onChangeText={setArtista} placeholder="Nome do artista" placeholderTextColor="gray" />
      <TextInput style={styles.input} value={autor} onChangeText={setAutor} placeholder="Nome do autor" placeholderTextColor="gray" />
      <TextInput style={styles.input} value={capa} onChangeText={setCapa} placeholder="Link da capa" placeholderTextColor="gray" />
      <TextInput style={styles.input} value={nomeeditora} onChangeText={setNomeeditora} placeholder="Nome da Editora" placeholderTextColor="gray" />
      <TextInput style={styles.input} value={paisorigem} onChangeText={setPaisorigem} placeholder="País de origem" placeholderTextColor="gray" />
      <TextInput style={styles.input} value={siteoficial} onChangeText={setSiteoficial} placeholder="Site oficial" placeholderTextColor="gray" />
      
      <View style={{ marginVertical: 15, padding: 10, backgroundColor: '#e6f2ff', borderRadius: 5 }}>
        <TouchableOpacity onPress={pegarLocalizacaoGPS}>
          <Text style={{ color: '#007BFF', fontWeight: 'bold', textAlign: 'center' }}>📍 Capturar Localização Atual (GPS)</Text>
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', marginTop: 5, fontSize: 12, color: '#333' }}>{localizacao}</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, marginBottom: 50 }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ backgroundColor: 'rgba(226, 13, 13, 0.13)', fontWeight: 'bold', padding: 15, borderRadius: 5 }}>Voltar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleAdd}>
          <Text style={{ backgroundColor: 'rgba(13, 226, 77, 0.13)', fontWeight: 'bold', padding: 15, borderRadius: 5 }}>
            {params.idEditando ? "Salvar" : "Adicionar"}
          </Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: { borderColor: 'gray', borderBottomWidth: 1, marginBottom: 10, paddingVertical: 5 }
});