import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    LogBox
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';


// import 'connect' to connect the redux with screens
import { connect } from 'react-redux';

LogBox.ignoreAllLogs()
const { height } = Dimensions.get('window');
function NearMe(props) {
    const [buyerLocation, setBuyerLocation] = useState({})

    const { route } = props;
    const { currentLocation } = route.params; // getting current location from route params


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
        setBuyerLocation(currentLocation) // set current user location in hooks

    }, []);
    return (
        <View style={styles.container}>

            {
                buyerLocation?.latitude !== undefined && buyerLocation?.longitude !== undefined && props.storesList !== undefined && props.storesList.length > 0 ?
                    <MapView
                        // key={index}
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={ // current location of user
                            {
                                latitude: buyerLocation.latitude,
                                longitude: buyerLocation.longitude,
                                latitudeDelta: 0.00485,
                                longitudeDelta: 0.004821,
                            }
                        }
                        showsUserLocation={true}
                        followUserLocation={true}
                        zoomEnabled={true}
                        zoomControlEnabled={true}
                        scrollEnabled={true}
                        moveOnMarkerPress={true}
                    >

                        {
                            props.storesList.map((item, index) => {
                                return (

                                    <Marker // stores are showing on map in current user location region
                                        key={index}
                                        coordinate={getCoordinates(item)}
                                        image={require('../../../../assets/pin.png')}
                                        style={{ width: 25, height: 25 }}
                                        resizeMode="contain"
                                        title={item.storeName}
                                        description={item.completeAddress}
                                    />
                                )
                            })
                        }
                    </MapView>
                    : null
            }

        </View>



    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eff1f8',
        flex: 1,
    },
    map: {
        height: height,
        width: '100%',
    },
});

function mapStateToProps(state) {

    return {
        storesList: state.root.stores_list?.stores || [], // stores list getting from reducers
    }
}

export default connect(mapStateToProps, null)(NearMe);