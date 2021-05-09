import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    LogBox
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker, Circle } from 'react-native-maps';
// import icons
import Feather from 'react-native-vector-icons/Feather';

// import 'connect' to connect the redux with screens
import { connect } from 'react-redux';
// import middlewares functions
import { GetStores } from '../../../Store/Middlewares/middlewares';
LogBox.ignoreAllLogs()
const { height } = Dimensions.get('window');
function NearMe(props) {
    const [buyerLocation, setBuyerLocation] = useState({})

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
    const { navigation, route } = props;
    const { currentLocation } = route.params;
    console.log('currentLocation', currentLocation)


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
        setBuyerLocation(currentLocation)

    }, []);
    return (
        <View style={styles.container}>

            {
               buyerLocation?.latitude !== undefined && buyerLocation?.longitude !== undefined && locations !== undefined && locations.length > 0 ?
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
                        zoomEnabled={false}
                        zoomControlEnabled={true}
                        scrollEnabled={true}
                        moveOnMarkerPress={true}
                    >

                        {
                            props.storesList.map((item, index) => {
                                return (

                                    <Marker
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
    console.log('state.root.stores_list', state.root.stores_list)
    return {
        storesList: state.root.stores_list?.stores || [], // seller sign in login boolean
        isLoading: state.root.stores_list?.loading
    }
}
// function mapDispatchToProps(dispatch) {
//     return ({
//         GetStoresAction: () => { dispatch(GetStores()) }, // seller sign in middlewares function

//     })
// }
export default connect(mapStateToProps, null)(NearMe);