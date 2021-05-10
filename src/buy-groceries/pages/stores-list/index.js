import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    TextInput,
    Dimensions,
    ActivityIndicator,
    Button,
    LogBox
} from 'react-native';
import GetLocation from 'react-native-get-location';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker, Circle } from 'react-native-maps';
// import icons
import Feather from 'react-native-vector-icons/Feather';

// import 'connect' to connect the redux with screens
import { connect } from 'react-redux';
// import middlewares functions
import { GetStores } from '../../../Store/Middlewares/middlewares';
LogBox.ignoreAllLogs()
const { width, height, fontScale } = Dimensions.get('window');
function StoresList(props) {
    const [twentyFour, setTwentyFour] = useState('')
    const [searchByName, setSearchByName] = useState('')
    const [location, setLocation] = useState(null)
    const [locationLoading, setLocationLoading] = useState(false)

    const locations = [
        {
            latitude: 24.91393977294782,
            longitude: 67.02482470547355,
            title: 'ABC'
        },
        {
            latitude: 24.91402739965812,
            longitude: 67.02612620462891,
            title: 'XYZ'

        },
        {
            latitude: 24.929757962832888,
            longitude: 67.01791368733784,
            title: 'SSS'

        }
    ]
    const { navigation } = props;

    const selectTwentyFourHours = (hours) => {
        setSearchByName('')
        if (twentyFour === hours) {
            setTwentyFour('')
        } else {
            setTwentyFour(hours)
        }
    }

    const filteration = () => {
        let data = props.storesList
            .filter(a => a.openUntil.search(twentyFour) !== -1);

        if (searchByName) {
            return data = props.storesList
                .filter(a => a.storeName.toLowerCase().search(searchByName.toLowerCase()) !== -1);
        }
        return data
    }
    const nearMe = () => {

        setLocation(null)
        setLocationLoading(true)

        // this.setState({ loading: true, location: null });

        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 150000,
        })
            .then(location => {
                console.log(' setLocation(location)', location)
                const currentLocation = {
                    longitude: location.longitude,
                    latitude: location.latitude,
                }
                setLocationLoading(false)
                setLocation(currentLocation)
                navigation.navigate('nearMe', { currentLocation })
            })
            .catch(ex => {
                const { code, message } = ex;
                console.warn(code, message);
                if (code === 'CANCELLED') {
                    alert('Location cancelled by user or by another request');
                }
                if (code === 'UNAVAILABLE') {
                    GetLocation.openGpsSettings();
                }
                if (code === 'TIMEOUT') {
                    alert('Location request timed out');
                }
                if (code === 'UNAUTHORIZED') {
                    GetLocation.openAppSettings();
                    alert('Authorization denied, allow the permission!');
                }
                setLocationLoading(false)
                setLocation(null)
            });
    }
    const getCoordinates = (item) => {
        const location = {
            longitude: item.longitude,
            latitude: item.latitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
        return location
    }
    useEffect(() => {
        props.GetStoresAction();
    }, [props.isLoading]);
    return (
        <View style={styles.container}>
            {/* <Text>{JSON.stringify(location)}</Text> */}
            <View style={styles.filterationContainer}>
                <View style={styles.storesSearchFieldContainer}>
                    <TextInput
                        style={styles.storesSearchField}
                        placeholder='Search Stores'
                        onChangeText={(text) => { setTwentyFour(''); setSearchByName(text) }}
                        placeholderTextColor="#a6aab9"
                        value={searchByName}
                    />

                </View>

                <View style={styles.filterTabs}>
                    <TouchableOpacity style={styles.filterTabsBtn} disabled={locationLoading} onPress={() => nearMe()}>
                        {
                            locationLoading === true ?
                                <ActivityIndicator size={18} color="white" />
                                :
                                <Text style={styles.filterTabsBtnText}>
                                    Near me
                                </Text>
                        }
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.filterTabsBtn} onPress={() => selectTwentyFourHours('24/7')}>
                        <Text style={styles.filterTabsBtnText}>
                            Open 24 hours
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>


            {/* // safe area and scroll view for responsive height and width for landscape mode */}
            <SafeAreaView style={styles.storesListContainer}>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                >
                    <View >
                        {
                            props.storesList.length > 0 && props.isLoading === false ?
                                filteration().map((item, index) => {
                                    return (
                                        <TouchableOpacity style={styles.storesRow} key={index}>
                                            <View style={styles.col1}>
                                                <Text style={styles.storeName}>{item.storeName}</Text>
                                                <View style={styles.iconRow}>
                                                    <Feather name="send" size={13} color="#757575" style={{ marginTop: 2, marginRight: 2 }} />
                                                    <Text style={styles.iconRowText} numberOfLines={2}>{item.completeAddress}</Text>
                                                </View>
                                                <View style={styles.iconRow}>
                                                    <Feather name="clock" size={13} color="#757575" style={{ marginTop: 2, marginRight: 2 }} />
                                                    <Text style={styles.iconRowText}>Open untill: {item.openUntil}</Text>
                                                </View>
                                            </View>

                                            <View style={styles.col2}>
                                                <View style={styles.storeImg}>

                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                    )
                                })
                                : null
                        }

                        {/* if there are no products, then loader will be shown */}
                        {
                            props.storesList.length === 0 && props.isLoading === true ?
                                <ActivityIndicator size={85} color="#687089" />
                                :
                                null
                        }
                    </View>

                </ScrollView>
            </SafeAreaView >
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eff1f8',
        flex: 1,
    },
    storesListContainer: {
        flex: 1
    },
    filterationContainer: {
        backgroundColor: '#2196f3',
        padding: 10
    },
    storesSearchField: {
        backgroundColor: 'white',
        borderRadius: 4,
        color: 'black'
    },
    filterTabs: {
        flexDirection: 'row',
        // backgroundColor: 'red',
        justifyContent: 'space-around',
        marginTop: 10
    },
    filterTabsBtn: {
        backgroundColor: '#1976d2',
        height: 40,
        paddingRight: 20,
        paddingLeft: 20,
        // margin: 8,
        borderRadius: 20,
        justifyContent: 'center',
        minWidth: 100
    },
    filterTabsBtnText: {
        color: 'white'
    },
    storesRow: {
        flexDirection: 'row',
        padding: 12,
        // backgroundColor: 'red',
        borderBottomColor: '#3c3c3c',
        borderBottomWidth: 1,
        borderStyle: 'solid',

    },
    col1: {
        width: '60%',
        // backgroundColor: 'yellow',
        minHeight: height / 7,
        justifyContent: 'space-around'
    },
    storeName: {
        color: '#3c3c3c',
        fontWeight: 'bold',
        fontSize: fontScale * 14
    },
    iconRow: {
        flexDirection: 'row',
    },
    iconRowText: {
        fontSize: fontScale * 11

    },
    col2: {
        width: '40%',
    },
    storeImg: {
        backgroundColor: '#212121',
        width: '100%',
        flex: 1,
        borderRadius: 5,
        minHeight: height / 8
    },
});

function mapStateToProps(state) {
    console.log('state.root.stores_list', state.root.stores_list)
    return {
        storesList: state.root.stores_list?.stores || [], // seller sign in login boolean
        isLoading: state.root.stores_list?.loading
    }
}
function mapDispatchToProps(dispatch) {
    return ({
        GetStoresAction: () => { dispatch(GetStores()) }, // seller sign in middlewares function

    })
}
export default connect(mapStateToProps, mapDispatchToProps)(StoresList);