import React from "react";
import {Text, View, TouchableOpacity} from "react-native"
import { Image } from "react-native";

export type MangaProps = {
    id: number
    onDelete: () =>  void;
    onEdit: () =>  void;
    capa: string
    name: string
    ano: string
    description: string
    tipoObra: string
    genero: string
    autor: string
    artista: string
}


export type editoraProps = {
    nomeeditora: string
    paisorigem: string
    siteoficial: string
}

type MangaCompleto = MangaProps & editoraProps;

export default function Manga({onDelete, onEdit, capa, name, ano, description, tipoObra, genero, autor, artista, nomeeditora, paisorigem, siteoficial}: MangaCompleto) {

    return (

      <View  style={{backgroundColor: 'rgb(196, 86, 13)', borderRadius: 5,}}>



      {capa ? ( <Image  source={{ uri: capa }} style={{ width: '100%', height: 200, borderRadius: 8 }} resizeMode="cover"/>) 
      : ( <Text>SEM IMAGEM</Text>)}
      

      
      <Text>{name}</Text>
      <Text>{description}</Text>
       <Text>{ano}</Text>
        <Text>{tipoObra}</Text>
        <Text>{genero}</Text>
        <Text>{artista}</Text>
        <Text>{autor}</Text>



        <Text>{nomeeditora}</Text>
        <Text>{paisorigem}</Text>
        <Text>{siteoficial}</Text>


        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
          
          <TouchableOpacity onPress={onEdit} style={{backgroundColor: 'blue', padding: 10, borderRadius: 5, flex: 1, marginRight: 5, alignItems: 'center'}}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Editar Obra</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onDelete} style={{backgroundColor: "red", padding: 10, borderRadius: 5, flex: 1, marginLeft: 5, alignItems: "center"}}> 
              <Text style={{color: 'white', fontWeight: 'bold'}}>Deletar Obra</Text>
          </TouchableOpacity>

      </View>



      </View>

    );
      

}