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

    const { navigation } = props;

    const selectTwentyFourHours = (hours) => {
        setSearchByName('')
        if (twentyFour === hours) { // 24/7 is selected then empty it
            setTwentyFour('')
        } else { // else set the filter value
            setTwentyFour(hours)
        }
    }

    const filteration = () => { /// filteration funtion returning the fitered data
        let data = props.storesList
            .filter(a => a.openUntil.search(twentyFour) !== -1); // 24/7 filteration is occured here

        if (searchByName) {
            return data = props.storesList
                .filter(a => a.storeName.toLowerCase().search(searchByName.toLowerCase()) !== -1); // search by name filteration is occured here
        }
        return data
    }
    const nearMe = () => { // near me funtion

        setLocation(null);
        setLocationLoading(true);

        GetLocation.getCurrentPosition({ // fetching funtion of user's current location
            enableHighAccuracy: true,
            timeout: 150000,
        })
            .then(location => { // getting location herer
                const currentLocation = {
                    longitude: location.longitude,
                    latitude: location.latitude,
                }
                setLocationLoading(false)
                setLocation(currentLocation) // setting location in hooks
                navigation.navigate('nearMe', { currentLocation }) // redirect to near me page
            })
            .catch(ex => { // catch funciton for error handling
                const { code, message } = ex;
                console.warn(code, message);
                if (code === 'CANCELLED') {
                    alert('Location cancelled by user or by another request');
                }
                if (code === 'UNAVAILABLE') {
                    GetLocation.openGpsSettings(); // open gps settings
                }
                if (code === 'TIMEOUT') {
                    alert('Location request timed out');
                }
                if (code === 'UNAUTHORIZED') {
                    GetLocation.openAppSettings(); // open permission settings
                    alert('Authorization denied, allow the permission!');
                }
                setLocationLoading(false)
                setLocation(null)
            });
    }

    const selectStore = (storeName, products) => { // select store funtion
        if (products === undefined) { // if any store doesn't have products then show alert
            alert('There are no products available in this store')
        } else {
            const storeDetails = {
                storeName,
                products
            }
            navigation.navigate('storeProducts', { // if store has products then redirect to product list
                screen: 'productsList',
                params: { store: JSON.stringify(storeDetails) }, // with products - passing through params
            });

        }
    }
    useEffect(() => {
        props.GetStoresAction(); // calling get stores function when page load
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
                    {/* click me function */}
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

                    {/* 24 hours filter function */}

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
                                        // stores are showing
                                        <TouchableOpacity style={styles.storesRow} key={index} onPress={() => selectStore(item.storeName, item.products)}>
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
        justifyContent: 'space-around',
        marginTop: 10
    },
    filterTabsBtn: {
        backgroundColor: '#1976d2',
        height: 40,
        paddingRight: 20,
        paddingLeft: 20,
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
        borderBottomColor: '#3c3c3c',
        borderBottomWidth: 1,
        borderStyle: 'solid',

    },
    col1: {
        width: '60%',
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
 
    return {
        storesList: state.root.stores_list?.stores || [], // gettin stores list from reducers
        isLoading: state.root.stores_list?.loading
    }
}
function mapDispatchToProps(dispatch) {
    return ({
        GetStoresAction: () => { dispatch(GetStores()) }, // call GetStores function

    })
}
export default connect(mapStateToProps, mapDispatchToProps)(StoresList);