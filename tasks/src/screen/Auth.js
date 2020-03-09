import React, { Component } from 'react'
import {Text, View,ImageBackground, 
    TouchableOpacity, Alert, StyleSheet, AsyncStorage } from 'react-native'
import axios from  'axios'
import { server, showErr } from '../common'    
import AuthInput from  '../components/AuthInput'
import imageLogin from '../../assets/imgs/login.jpg' 
import * as Font from 'expo-font'
import commonStyles from '../commonStyles'

export default class Auth extends Component {
    state = {
        stageNew: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        fontLoad: false,
    }

    signUp = async () => {
        try {
            await axios.post(`${server}/signup`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            })

            Alert.alert('Bem Vindo','Usuário cadastrado!');

            this.setState({ stageNew: false })
            } catch (error) {
                showErr(error)
        }
    }

    signIn = async () => {
        try {
            const res = await axios.post(`${server}/signin`,{
                email: this.state.email,
                password: this.state.password
            })

            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
            
            AsyncStorage.setItem('userData', JSON.stringify(res.data))

            this.props.navigation.navigate('Home', res.data)
        } catch (error) {
            Alert.alert('Erro :(', error)
            showErr(error)
        }
    }

    signinOrsignup = async () => {
        if (this.state.stageNew){
            this.signUp();
        } else {
            this.signIn();            
        }
    }

    async componentDidMount(){
        await Font.loadAsync({
            'lato': require('../../assets/fonts/Lato.ttf')
        })
        this.setState({ fontLoad: true })
    }

    render(){
        
        const validations = []

        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.password && this.state.password.length >= 6 )

        if ( this.state.stageNew ) {
            validations.push(this.state.name && this.state.name.trim())
            validations.push(this.state.confirmPassword)
            validations.push(this.state.password === this.state.confirmPassword)
        }

        validForm = validations.reduce((all, v) => all && v);
        
        return(
            <ImageBackground source={imageLogin} style={styles.background}>
                {this.state.fontLoad ? <Text style={styles.title}>Tasks</Text> :
                null}
                <View style={styles.formContainer}>
                    {this.state.fontLoad ? 
                    <Text style={styles.subtitle}>
                        {this.state.stageNew ? 'Crie sua conta!'
                    : 'Informe seus dados!'} 
                    </Text> : null }
                   {this.state.stageNew &&
                    <AuthInput icon='user' placeholder='Nome'
                        onChangeText={ name => this.setState({ name }) }
                        value={this.state.name} style={styles.input} />}
                   <AuthInput icon='at' placeholder='E-mail' value={this.state.email}
                        onChangeText={email => this.setState({ email })} style={styles.input} />
                   <AuthInput icon='lock' secureTextEntry={true} placeholder='Senha' style={styles.input} 
                   value={this.state.password} onChangeText={password => this.setState({ password })} />
                    {this.state.stageNew &&
                    <AuthInput icon='lock' secureTextEntry={true} placeholder='Confirmação' 
                    value={this.state.confirmPassword} style={styles.input}
                    onChangeText={confirmPassword => this.setState({ confirmPassword })} />}
                <TouchableOpacity disabled={!validForm} onPress={this.signinOrsignup}>
                        <View style={[ styles.button, !validForm ? { backgroundColor: '#AAA'} : {} ]}>
                            {this.state.fontLoad ?
                            <Text style={styles.buttonText}>
                            {this.state.stageNew ?
                            'Registrar': 'Entrar'}
                            </Text>: null}
                        </View>
                    </TouchableOpacity>
                </View> 
                <TouchableOpacity style={{ padding: 10 }}
                    onPress={() => this.setState({ stageNew: !this.state.stageNew })} >
                {this.state.fontLoad ? 
                    <Text style={styles.buttonText}>
                        {this.state.stageNew ?
                        'Acessar' : 'Cadastra-se'} </Text>
                    :null}
                </TouchableOpacity>
            </ImageBackground>
        )
    }
} 

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center', 
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 60,
        marginBottom: 10,
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 20, 
        width: '90%',
        borderRadius: 20,
    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF',
        borderRadius: 10,
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
    }
})