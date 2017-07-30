import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ListView,
    Alert,
    Button,
    Dimensions,
    AsyncStorage
} from 'react-native';
import FoodItem from '../components/FoodItem';
import styles from '../styles.js';
import axios from 'axios';

class FoodView extends React.Component {
    static navigationOptions = {
        title: 'FoodView'
    };

    constructor( props ) {
        super( props );
        this.state = {
            items: []
        }
    }

    addToCart(item) {
        this.props.navigation.navigate("Ticket", {item});
    }

    componentDidMount() {
        axios.get( 'http://locolhost:3000/providers/' + '597d30f9cbe8a8262bb1d206' + '/items' )
            .then(( resp ) => {
                this.setState( { items: resp.data.provider.forSale } )
            } )
            .catch(( err ) => {
                console.log( 'error getting items from food provider', err );
            } )
    }
    render() {
        return (
            <View style={ styles.foodView }>
                { this.state.items.map(( item, index ) => {
                    return <FoodItem
                        key={ index }
                        item={ item }
                        admin={ false }
                        function={ this.addToCart.bind(this) }
                    />
                } ) }
            </View>
        )
    }
}

export default FoodView;
