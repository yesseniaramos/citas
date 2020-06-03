import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  TouchableWithoutFeedback, 
  Keyboard,
  Platform
} from 'react-native';
import Cita from './components/Cita';
import Formulario from './components/Formulario';
import AsyncStorage from "@react-native-community/async-storage";

const App = () => {
  const [mostrarForm, guardarMostrarForm] = useState(false);
  
  useEffect(() => {
    const obtenerCitaStorage = async () => {
      try{
        const citasStorage = await AsyncStorage.getItem('citas');
        if(citasStorage){
          setCitas(JSON.parse(citasStorage));
        }
      } catch(error) {
        console.log(error);
      }
    }
    obtenerCitaStorage();
  }, []);
  const [citas, setCitas] = useState([]);

  // Elimina los pacientes del state

  const eliminarPaciente = id => {
    const citasFiltradas = citas.filter(cita => cita.id !== id);
    setCitas(citasFiltradas);
    guardarCitasStorage(JSON.stringify(citasFiltradas));
  };

  // Muestra u oculta el formulario

  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm);
  };

  const cerrarTeclado = () => {
    Keyboard.dismiss();
  }

  // Almacenar las citas en el storage

  const guardarCitasStorage = async(citaJSON) =>{
    try {
      await AsyncStorage.setItem('citas', citaJSON);
    } catch(error) {
      Console.log(error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado() }>
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Administrador de Citas</Text>
      <View>
        <TouchableHighlight
          onPress={() => mostrarFormulario()}
          style={styles.btnMostrarForm}>
          <Text style={styles.textoMostrarForm}>{mostrarForm ? 'Cancelar Crea Cita' : 'Crear Nueva Cita' }</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.contenido}>
        {mostrarForm ? (
          <>
          <Text style={styles.titulo}>Crear Nueva Cita</Text>
            <Formulario 
              citas={citas} 
              setCitas={setCitas} 
              guardarMostrarForm={guardarMostrarForm}
              guardarCitasStorage={guardarCitasStorage}
            />
          </>
        ) : (
          <>
            <Text style={styles.titulo}>
              {citas.length > 0
                ? 'Administra tus citas'
                : 'No hay citas, agrega una'}
            </Text>
            <FlatList
              style={styles.listado}
              data={citas}
              renderItem={({item}) => (
                <Cita cita={item} eliminarPaciente={eliminarPaciente} />
              )}
              keyExtractor={cita => cita.id}
            />
          </>
        )}
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#AA0768',
    flex: 1,
  },
  titulo: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  listado: {
    flex: 1,
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },
  textoMostrarForm: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
