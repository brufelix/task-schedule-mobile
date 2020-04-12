import React, {Component} from 'react';
import { Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, 
    StyleSheet, Modal, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import commonStyles from '../commonStyles';


export default class AddTask extends Component {

    constructor(props){
        super(props)
        this.state = this.getInitialState()
    }

    getInitialState = () => {
        return {
            desc: '',
            date: new Date()
        }
    }

    save = () => {
        if (this.state.desc.trim() === ''){
            Alert.alert('Dados Inválidos', 'Informe uma descrição!')
            return;
        }
        const data = {...this.state}
        this.props.onSave(data)
    }

    render(){
       return(
            <Modal onRequestClose={this.props.onCancel} visible={this.props.isVisible}
            animationType='slide' transparent={true}
            onShow={() => this.setState({ ...this.getInitialState() })}>
            <TouchableWithoutFeedback onPress={this.props.onCancel}>
                <View style={styles.offset}></View>
            </TouchableWithoutFeedback>
            <View style={styles.container}>
                <Text style={styles.header}>Nova Tarefa!</Text>
                <TextInput palceholder='Descrição...' style={styles.input}
                onChangeText={ desc => this.setState({ desc }) } value={this.state.desc}></TextInput>
                <DatePicker mode='date' date={this.state.date}
                onDateChange={ date => this.setState({ date }) } placeholder='Selecione a data' 
                style={{marginLeft: 10}}></DatePicker>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <TouchableOpacity onPress={this.props.onCancel}>
                        <Text style={styles.button}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.save}>
                        <Text style={styles.button}>Salvar</Text>
                    </TouchableOpacity>
                </View> 
            </View>
            <TouchableWithoutFeedback onPress={this.props.onCancel}>
                <View style={styles.offset}></View>
            </TouchableWithoutFeedback>
        </Modal>
       )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        justifyContent: 'space-between',
    },
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commonStyles.color.default,
    },
    header: {
        backgroundColor: commonStyles.color.default,
        color: commonStyles.color.secondary,
        textAlign: 'center',
        padding: 15, 
        fontSize: 15
    },
    input: {
      width: '90%',
      height: 40,
      marginTop: 10,
      marginLeft: 10,
      backgroundColor: '#FFF',
      borderColor: '#222',
      borderWidth: 1,
      borderRadius: 6, 
    },
})