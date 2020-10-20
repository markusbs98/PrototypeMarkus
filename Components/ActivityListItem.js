
import * as React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ImageBackground
} from 'react-native';

const styles = StyleSheet.create({     
    container: {
        flex: 1,
        borderWidth: 1,
        margin: 5,
        padding: 5,
        height: 50,
        justifyContent: 'center',
    },
    
    label: {
        fontWeight: 'bold',
    },
    background: {
        flex: 1,
    },
});

export default class ActivityDetails extends React.Component {
    handlePress = () => {
        //Pakker ut ting fra props
        const { id, onSelect } = this.props
        //Kaller den onSelect prop vi får, med det ID vi har fått som argument.
        onSelect(id)
    };

    render () {
        const { activity } = this.props;
        return (
    <TouchableOpacity style={styles.container} onPress={this.handlePress}>
        <ImageBackground style={styles.background}
        source={require('../assets/hei.jpg')}>
                
                <Text style={styles.label}>
                    {activity.category}
                </Text>

        </ImageBackground>
    </TouchableOpacity>
        );
    }

}
