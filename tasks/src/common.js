import { Alert, Platform } from 'react-native'

const server = 'http://200.129.39.68:33000';

function showErr(err) {
    Alert.alert('Erro:', err)
}

export { server, showErr }