import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    SafeAreaView,
    ScrollView,
    TextInput,
    Text
} from 'react-native';
// components
import Product from '../../../shared/components/product/index';
const { fontScale } = Dimensions.get('window');
function ProductsList(props) {
    const [storeProducts, setStoreProducts] = useState([])
    const [searchByName, setSearchByName] = useState('')

    const { navigation, route } = props;
    const { store } = route.params;
    let selectedStore = JSON.parse(store)
    const { storeName, products } = selectedStore;
    let selectedProducts = Object.values(products)

    useEffect(() => {
        setStoreProducts(selectedProducts)

    }, []);

    const filteration = () => {

        let data = storeProducts
            .filter(a => a.productName.toLowerCase().search(searchByName.toLowerCase()) !== -1);

        return data
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
            >

                <View>
                    <View style={styles.filterBar}>
                        <TextInput
                            style={styles.filterBarField}
                            placeholder='Sort By Name'
                            onChangeText={(text) => setSearchByName(text)}
                            placeholderTextColor="black"
                        />

                        <Text style={styles.totalItems}>{filteration().length} Items</Text>
                    </View>
                    {/* products list */}
                    <View style={styles.productList}>

                        {
                            selectedProducts.length > 0 ?
                                filteration().map((item, index) => {
                                    return (
                                        <Product product={item} navigation={navigation} key={index} />

                                    )
                                })
                                :
                                null
                        }

                        {/* if there are no products, then loader will be shown */}
                        {/* {
                            props.currentSellerProducts.length === 0 && props.isLoading === true ?
                                <ActivityIndicator size={85} color="#687089" />
                                :
                                null
                        } */}



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

    productList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingTop: 5,
        paddingBottom: 5,
    },
    filterBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'white'
    },
    filterBarField: {
        borderBottomWidth: 1,
        borderBottomColor: '#a6aab9',
        borderStyle: 'solid',
        color: 'black'

    },
    totalItems: {
        color: '#a6aab9',
        fontSize: fontScale * 11
    }

});

// function mapStateToProps(state) {
//     console.log('state.root.stores_list', state.root.stores_list)
//     return {
//         storesList: state.root.stores_list?.stores || [], // seller sign in login boolean
//         isLoading: state.root.stores_list?.loading
//     }
// }
// function mapDispatchToProps(dispatch) {
//     return ({
//         GetStoresAction: () => {dispatch(GetStores())}, // seller sign in middlewares function

//     })
// }
export default ProductsList;