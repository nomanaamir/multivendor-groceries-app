import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Text
} from 'react-native';
import Button from '../../../shared/components/button/index';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
const { height, width, fontScale } = Dimensions.get('window');
function Congrats(props) {


    const { navigation, route } = props;

    return (
        // <SafeAreaView style={styles.container}>
        //     <ScrollView
        //         contentInsetAdjustmentBehavior="automatic"
        //     >
        <View style={styles.congrats}>
            <View style={styles.col1}>
                <View style={styles.message}>
                    <SimpleLineIcons name="check" size={80} color="white" />
                    <Text style={styles.congratulations}>Congratulations</Text>
                    <Text style={styles.orderText}>You have successfully ordered your package</Text>

                </View>
            </View>
            <View style={styles.col2}>
                <Button
                    loader={false}
                    title={"Home"}
                    color={'#68708a'}
                    onPress={() => navigation.navigate('storesList')}
                />
            </View>
        </View>
        //     </ScrollView >
        // </SafeAreaView >



    );
};

const styles = StyleSheet.create({
    // container: {
    //     backgroundColor: '#eff1f8',
    //     flex: 1,
    // },
    congrats: {
        flex: 1,
    },
    col1: {
        flex: 3,
        backgroundColor: '#68708a',
        justifyContent: 'center',
        alignItems: 'center'
    },
    message:{
        alignItems: 'center'
    },
    congratulations:{
        color: 'white',
        fontSize: fontScale * 18,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 5,

    },
    orderText:{
        color: 'white',
        fontSize: fontScale * 12,
    },
    col2: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignContent: 'center'
    }
});


export default Congrats;