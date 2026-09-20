import React from "react";
import {Text, View} from "react-native"
import { Image } from "react-native";

export type MangaProps = {
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

export default function Manga({capa, name, ano, description, tipoObra, genero, autor, artista, nomeeditora, paisorigem, siteoficial}: MangaCompleto) {

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
       
    
      </View>

    );
      

}