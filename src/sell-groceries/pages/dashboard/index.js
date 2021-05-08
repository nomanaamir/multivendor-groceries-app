import React, { useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator
} from 'react-native';
// import 'connect' to connect the redux with screens
import { connect } from 'react-redux';
// import middlewares functions
import { RetrieveDataAssyncStorage, GetCurrentSellerProducts } from '../../../Store/Middlewares/middlewares';
const { width, height, fontScale } = Dimensions.get('window')

function Dashboard(props) {
    const { navigation } = props;

    useEffect(() => {
        props.GetCurrentSellerProductsAction(props.sellerStore?.uid)
    }, [props.isLoading]);
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
                            {props.sellerStore?.storeName}
                        </Text>
                    </View>

                    <View style={styles.storeBody}>

                        {/* if there are no products, then 'No item message' will be shown */}
                        {
                            props.currentSellerProducts.length === 0 ?
                                <Text style={styles.noItemText}>
                                    No item to show, please add new item by clicking the plus button below
                                </Text>
                                :
                                null
                        }


                        <View style={styles.plusBtnAlign}>
                            <TouchableOpacity style={styles.plusBtn} onPress={() => navigation.navigate('addNewProduct', { sellerUID: props.sellerStore?.uid })}>
                                <Text style={styles.plusBtnText}>
                                    +
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* products list */}
                        <View style={styles.productList}>

                            {
                                props.currentSellerProducts.length > 0 && props.isLoading === false ?
                                    props.currentSellerProducts.map((item, index) => {
                                        return (
                                            <View style={styles.product} key={index}>
                                                <View style={styles.productImg}>

                                                </View>
                                                <View style={styles.productInfo}>
                                                    <Text style={styles.productInfoName}>{item.productName}</Text>
                                                    <Text style={styles.productInfoPrice}>£{item.price}{ }</Text>
                                                </View>
                                            </View>

                                        )
                                    })
                                    :
                                    null
                            }

                            {/* if there are no products, then loader will be shown */}
                            {
                                props.currentSellerProducts.length === 0 && props.isLoading === true ?
                                    <ActivityIndicator size={85} color="#687089" />
                                    :
                                    null
                            }



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
        padding: 15
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
    },
    productList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingTop: 5,
        paddingBottom: 5,
    },
    product: {
        margin: 4,
        width: '46%',
        borderRadius: 5
    },
    productImg: {
        height: height / 5,
        backgroundColor: '#cfd8dc',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,

    },
    productInfo: {
        backgroundColor: 'white',
        padding: 5,
        flex: 1,
    },
    productInfoName: {
        color: '#575757',
        fontSize: fontScale * 12,
        // flex: 2
    },
    productInfoPrice: {
        color: '#64b2ee',
        fontSize: fontScale * 11
    }

});
function mapStateToProps(state) {
    return {
        sellerStore: state.root.async_storage_data?.data?.store, // getting seller's store details from asyncStorage
        currentSellerProducts: Object.values(state.root.current_seller_products?.products || {}), // getting current seller products list
        isLoading: state.root.current_seller_products?.loading, // loading boolean
    }
}
function mapDispatchToProps(dispatch) {
    return ({
        RetrieveDataAssyncStorageAction: () => { dispatch(RetrieveDataAssyncStorage()) }, // get seller data from asyncstorage funtion
        GetCurrentSellerProductsAction: (sellerUID) => { dispatch(GetCurrentSellerProducts(sellerUID)) } // get current seller's products function
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
