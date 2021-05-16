import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    SafeAreaView,
    ScrollView,
    Text,
    Button,
    ActivityIndicator
} from 'react-native';
const { height, fontScale } = Dimensions.get('window');
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

// import 'connect' to connect the redux with screens
import { connect } from 'react-redux';
// import middlewares functions
import { LogOut, GetStores, DeleteSeller } from '../../../Store/Middlewares/middlewares';
function AdminDashboard(props) {

    useEffect(() => {
        props.GetStoresAction(); // calling get stores function when page load
    }, [props.isLoading]);
    return (

        <View style={styles.adminDashboard}>
            <View style={styles.adminDashboardHeader}>
                <Text style={styles.adminDashboardHeaderText}>
                    All Sellers List
                </Text>
                <Button
                    onPress={() => props.LogOutAction()}
                    title="log out"
                    color="#FF4500"
                />
            </View>

            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                >
                    <View >
                        {
                            props.storesList.length > 0 && props.isLoading === false ?
                                props.storesList.map((item, index) => {
                                    return (
                                        // sellers are showing
                                        <View key={index}>
                                            <View style={styles.col1}>
                                                <View style={styles.sellerInfo}>
                                                    <FontAwesome name="user" size={40} color="#687089" />
                                                    <Text style={styles.sellerStore}>{item.storeName}</Text>
                                                </View>

                                                <View>
                                                    <Button
                                                        onPress={() => props.DeleteSellerAction(item.uid)} // calling delete seller function - passing uid in function
                                                        title="Delete"
                                                        color="#FF4500"
                                                    />
                                                </View>
                                            </View>
                                            <View style={styles.col2}>
                                                <View style={styles.img}>
                                                    <EvilIcons name="image" size={50} color="white" />
                                                </View>
                                                <View style={styles.img}>
                                                    <EvilIcons name="image" size={50} color="white" />
                                                </View>
                                                <View style={styles.img}>
                                                    <EvilIcons name="image" size={50} color="white" />
                                                </View>
                                            </View>
                                        </View>
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
    adminDashboard: {
        backgroundColor: '#eff1f8',
        flex: 1,
    },
    adminDashboardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        borderStyle: 'solid',
        borderColor: '#68708a',
        borderWidth: 1
    },
    adminDashboardHeaderText: {
        color: '#a5aaba',
        fontWeight: 'bold',
        fontSize: fontScale * 13
    },
    col1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15
    },
    sellerInfo: {
        flexDirection: 'row',
        // alignItems: 'center'
    },
    sellerStore: {
        fontSize: fontScale * 14,
        margin: 5
    },
    col2: {
        flexDirection: 'row'
    },
    img: {
        width: '33.33%',
        backgroundColor: '#68708a',
        justifyContent: 'center',
        alignItems: 'center',
        height: height / 8
    }
});

function mapStateToProps(state) {
    return {
        storesList: state.root.stores_list?.stores || [], // getting stores list from reducers
        isLoading: state.root.stores_list?.loading // loading boolean
    }
}
function mapDispatchToProps(dispatch) {
    return ({
        GetStoresAction: () => { dispatch(GetStores()) }, // call GetStores function
        DeleteSellerAction: (sellerUID) => { dispatch(DeleteSeller(sellerUID)) }, // delete seller store function
        LogOutAction: () => { dispatch(LogOut()) } // logout function
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);