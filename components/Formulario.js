import React, {useState} from 'react';
import {Text, StyleSheet, View, TextInput, Button,TouchableHighlight, Alert, ScrollView} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Shortid from "shortid";
import shortid from 'shortid';

const Formulario = ({citas, setCitas, guardarMostrarForm, guardarCitasStorage}) => {
    const [paciente, guardarPaciente] = useState('');
    const [propietario, guardarPropietario] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [sintoma, guardarSintoma] = useState('');
    const [fecha, guardarFecha] = useState('');
    const [hora, guardarHora] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const confirmarFecha = (date) => {
        const opciones = {year:'numeric', month:'long', day:'2-digit'};
        guardarFecha(date.toLocaleDateString('es-ES', opciones));
        hideDatePicker();
    };

    // M uestra u oculta el timepicker

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const confirmarHora = hora => {
        const opciones = { hour: 'numeric', minute: '2-digit'};
        guardarHora(hora.toLocaleString('en-US', opciones));
        hideTimePicker();
    };

    const crearNuevaCita = () => {
        if( paciente.trim() === '' || 
            propietario.trim() === '' || 
            telefono.trim() === '' || 
            fecha.trim() === '' || 
            hora.trim() === '' || 
            sintoma.trim() === ''){
                mostrarAlerta();
                return;
        }
        const cita = { paciente, propietario, telefono, fecha, hora, sintoma };
        cita.id = shortid.generate();
        // Agregar al state
        const citasNuevo = [...citas, cita];
        setCitas(citasNuevo);

        // Pasar las nuevas citas a storage
        guardarCitasStorage(JSON.stringify(citasNuevo));

        // Ocultar el formulario
        guardarMostrarForm(false);
        
        // Resetear el formulario

        guardarSintoma('');
        guardarPropietario('');
        guardarPaciente('');
        guardarHora('');
        guardarFecha('');
        guardarTelefono('');
    }



    const mostrarAlerta = () => {
        Alert.alert(
            'Error', // Título
            'Todos los campos son obligatorios', // Mensaje
            [{
                text: 'OK' // Arreglo de botones
            }]
        );
    }
    return (
        <>
        <ScrollView style={ styles.formulario }>
            <View>
                <Text>Paciente</Text>
                <TextInput style={styles.input}
                onChangeText={texto => guardarPaciente(texto)}
                />
                <Text>{paciente}</Text>
            </View>

            <View>
                <Text>Dueño</Text>
                <TextInput style={styles.input}
                onChangeText={texto => guardarPropietario(texto)}
                />
                <Text>{propietario}</Text>
            </View>

            <View>
                <Text>Teléfono Contacto</Text>
                <TextInput style={styles.input}
                onChangeText={texto => guardarTelefono(texto)}
                keyboardType='numeric'
                />
                <Text>{telefono}</Text>
            </View>
            <View>
                <Text style={styles.label}>Fecha</Text>
                <Button title="Seleccionar Fecha" onPress={showDatePicker} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={confirmarFecha}
                    onCancel={hideDatePicker}
                    locale='es_ES'
                    headerTextIOS="Elige una fecha"
                    cancelTextIOS="Cancelar"
                    confirmTextIOS="Confirmar"
                />
                <Text>{fecha}</Text>
            </View>

            <View>
                <Text style={styles.label}>Hora</Text>
                <Button title="Seleccionar Hora" onPress={showTimePicker} />
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={confirmarHora}
                    onCancel={hideTimePicker}
                    locale="es_ES"
                    headerTextIOS="Elige una hora"
                    cancelTextIOS="Cancelar"
                    confirmTextIOS="Confirmar"
                />
                <Text>{hora}</Text>
            </View>

            <View>
                <Text>Sitomas</Text>
                <TextInput style={styles.input}
                multiline
                onChangeText={texto => guardarSintoma(texto)}
                />
                <Text>{sintoma}</Text>
            </View>
            
            <View>
                <TouchableHighlight onPress={() => crearNuevaCita()} style={styles.btnSubmit}>
                    <Text style={styles.textoSubmit}>Crear Nueva Cita</Text>
                </TouchableHighlight>
            </View>
        </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    formulario: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: '2.5%'
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    input:{
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    btnSubmit: {
        padding: 10,
        backgroundColor: '#7d024e',
        marginVertical: 10
    },
    textoSubmit: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default Formulario;