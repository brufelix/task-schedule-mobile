import React, { Component }from 'react';
import { StyleSheet, Text, View, ImageBackground, 
    FlatList, TouchableOpacity, Platform } from 'react-native';
    import Icon from 'react-native-vector-icons/FontAwesome';
import moment, { max } from 'moment';
import ActionButton from 'react-native-action-button';
import axios from 'axios'; 
import * as Font from 'expo-font';
import 'moment/locale/pt-br';
import { server , showErr } from '../common';
import commonStyles from '../commonStyles';
import Task from '../components/Task';
import AddTask from './AddTask';

import todayImg from '../../assets/imgs/today.jpg'
import tomorrowImg from '../../assets/imgs/tomorrow.jpg'
import weekImg from '../../assets/imgs/week.jpg'
import monthImg from '../../assets/imgs/month.jpg'

export default class Schedule extends Component {    
    constructor(){
        super()
        this.state={
        fontLoad: false,
        tasks: [],
        visibleTasks: [],
        showDoneTasks: true,
        showModal: false
        }
    }
    
    filterTasks = () => {
        let visibleTasks = null;
        if (this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks];
        }else{
            const pending = tasks => tasks.doneAt === null;  
          visibleTasks = this.state.tasks.filter(pending)
        }
        this.setState({ visibleTasks })
    }
    
    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, 
            this.filterTasks)
    }
        
    toggleTask = async id => {
        try {
            await axios.put(`${server}/tasks/${id}/toggle`)
            await this.loadTasks(); 
        } catch (err) {
            
        } 
    }
        
    saveTask = async task => {
        try {
            await axios.post(`${server}/tasks`, {
                desc: task.desc,
                estimateAt: task.date
            })
            this.setState({ showModal: false }, this.loadTasks)
        } catch(err) {
            showErr(err)
        }
    }

    deleteTask = async id => {
        await axios.delete(`${server}/tasks/${id}`)
        await this.loadTasks();
    }
    
    loadTasks = async () => {
        try {
            const maxDate = moment().add({ days: this.props.daysAhead }).format('YYYY-MM-DD 23:59')
            const res = await axios.get(`${server}/tasks?date=${maxDate}`)
            this.setState({ tasks: res.data }, this.filterTasks)
        } catch (err) {
            showErr(err)
        }
    } 
    
    async componentDidMount(){
      await Font.loadAsync({
        "lato": require("../../assets/fonts/Lato.ttf"),
      })
      this.setState({ fontLoad: true });
      this.loadTasks();
    }
  
    render(){
        let styleColor = null;
        let image = null;

        switch ( this.props.daysAhead ) {
            case 0:
                styleColor = commonStyles.color.today
                image = todayImg;
                break;
            case 1: 
                styleColor = commonStyles.color.tomorrow
                image = tomorrowImg
                break;
            case 7:
                styleColor = commonStyles.color.week
                image = weekImg 
                break
            default:
                styleColor = commonStyles.color.month
                image = monthImg
                break
        }
        
        return(
            <View style={styles.container}>
                <AddTask isVisible={this.state.showModal} 
                onCancel={() => this.setState({ showModal: false })}
                onSave={this.saveTask}/>
                <ImageBackground source={image}
                    style={styles.background}>
                <View style={styles.iconBar}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                        <Icon name='bars' size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.toggleFilter()}>
                        <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                            color={commonStyles.color.secondary} size={20}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.styleBar}>
                    {this.state.fontLoad?
                    <Text style={styles.title}>{this.props.title}</Text>: null}
                    {this.state.fontLoad ? <Text style={ styles.subTitle }>
                        {moment().locale('pt-br').format('ddd, D [de] MMMM')}
                    </Text>:null}
                </View>
                </ImageBackground>
                <View style={styles.taksContainer}>
                   {this.state.fontLoad? (<FlatList data={this.state.visibleTasks} 
                    keyExtractor={ item => `${item.id}` }
                    renderItem={({ item }) => 
                    <Task {...item} toggleTask={this.toggleTask} onDelete={this.deleteTask}/> }/>)
                    : false}
                </View>
                <ActionButton buttonColor={styleColor} onPress={() => this.setState({ showModal:true })}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    background: {
        flex: 3, 
        justifyContent: 'flex-end'
    },
    styleBar: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 50, 
        marginLeft: 20,
        marginBottom: 10,
    },
    subTitle: {
        fontFamily: commonStyles.fontFamily,        
        color: '#FFF',
        fontSize: 20, 
        marginLeft: 20,
        marginBottom: 30
    },
    taksContainer: {
        flex: 7
    },
    iconBar: {
        marginTop: Platform.OS === 'ios' ? 30 : 30,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});