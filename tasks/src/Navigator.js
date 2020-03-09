import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer';
import Schedule from './screen/Schedule';
import Auth from './screen/Auth';
import Menu from './screen/Menu'
import AuthOrApp from './screen/AuthOrApp';

const MenuRouter = {
    Today : {
        name: 'today',
        screen: props => <Schedule title='Hoje' {...props} daysAhead={0}/>,
        navigationOptions: {
            title: 'Hoje'
        },
    },
    Tomorrow: {
        name: 'tomorrow',
        screen: props => <Schedule title='Amanhã' {...props} daysAhead={1}/>,
        navigationOptions: {
                title: 'Amanhã'
        }
    },
    Week: {
        name: 'Week',
        screen: props => <Schedule title='Semana' {...props} daysAhead={7}/>,
        navigationOptions: {
            title: 'Semana'
        }
    },
    Month: {
        name: 'Month',
        screen: props => <Schedule title='Mês' {...props} daysAhead={30}/>,
        navigationOptions: {
            title: 'Mês'
        }
    }
}

const MenuConfig = {
    InitialRouteName: 'today',
    contentComponent: Menu,
    contentOptions: {
        labelStyle: {
            fontWeight: 'normal',
            fontSize: 20, 
        },
        activeLabelStyle: {
            color: '#080',
        }
    }
}

const MenuNavigation = createDrawerNavigator(MenuRouter, MenuConfig); 

const MainRouter = {
    Loading:{
        name: 'Loading',
        screen: AuthOrApp
    },
    Auth: {
        name: 'Auth',
        screen: Auth,
    },
    Home: {
        name: 'Home',
        screen: MenuNavigation,
    }
}

const MainNavigator = createSwitchNavigator(MainRouter, { InitialRouteName: 'Loading' })

const ContainerMainNavigator = createAppContainer(MainNavigator)

export default ContainerMainNavigator 