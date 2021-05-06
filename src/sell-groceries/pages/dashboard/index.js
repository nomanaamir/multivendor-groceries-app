import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';
const { width, height, fontScale } = Dimensions.get('window')

function Dashboard(props) {
    const { navigation } = props;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
            >
                <View style={styles.dashboard}>
                    <View style={styles.storeInfo}>
                        <View style={styles.storeInfoFrame}>

                        </View>
                        <Text style={styles.storeInfoName}>
                            XYZ Store
                        </Text>
                    </View>

                    <View style={styles.storeBody}>

                        <Text style={styles.noItemText}>
                            No item to show, please add new item by clicking the plus button below
                        </Text>

                        <View style={styles.plusBtnAlign}>
                            <TouchableOpacity style={styles.plusBtn} onPress={()=> navigation.navigate('addNewProduct')}>
                                <Text style={styles.plusBtnText}>
                                    +
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

            </ScrollView>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eff1f8',
        flex: 1,
    },
    storeInfo: {
        backgroundColor: '#cfd8dc',
        height: height / 3.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    storeInfoFrame: {
        backgroundColor: '#546a79',
        height: height / 8,
        width: width / 4,
        borderRadius: 100
    },
    storeInfoName: {
        fontSize: fontScale * 18,
        fontWeight: 'bold',
        marginTop: 10
    },
    noItemText: {
        textAlign: 'center',
        color: '#a7aab6',
        fontSize: fontScale * 14,
        margin: 10
    },
    plusBtnAlign: {
        alignItems: 'flex-end',
        paddingRight: 15
    },
    plusBtn: {
        backgroundColor: '#2196f3',
        height: height / 14,
        width: width / 7,
        borderRadius: 100,

        justifyContent: 'center',
        alignItems: 'center'
    },
    plusBtnText: {
        color: 'white',
        fontSize: fontScale * 30,
    }

});

export default Dashboard;
