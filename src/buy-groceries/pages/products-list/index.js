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
import { Picker } from '@react-native-picker/picker';
// components
import Product from '../../../shared/components/product/index';
const { fontScale } = Dimensions.get('window');
function ProductsList(props) {
    const [storeProducts, setStoreProducts] = useState([]);
    const [sortBy, setSortBy] = useState(undefined);
    const { navigation, route } = props;
    const { store } = route.params;
    let selectedStore = JSON.parse(store)
    const { products } = selectedStore;
    let selectedProducts = Object.values(products)

    useEffect(() => {
        setStoreProducts(selectedProducts)

    }, []);

    function sorting(itemValue, itemIndex) {
        setSortBy(itemValue)
    }
    const filteration = () => { // filter function, returing filtered array
        let data = storeProducts;
        if (sortBy === 'price') {
            data = storeProducts.sort((a, b) => parseInt(a.price) - parseInt(b.price)); // if price is slected then values will be sorted accending order

        } else if (sortBy === undefined) { // reset filter

            data = selectedProducts
        }
        if (sortBy === 'name') { // if name is selcted then values will be sorted by alphabatically
            return data = storeProducts.sort((a, b) => a.productName.toLowerCase() > b.productName.toLowerCase());

        }
        return data
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
            >

                <View>
                    <View style={styles.filterBar}>
                        {/* search field of products */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: '#a6aab9' }}> Sort By</Text>
                            <View style={styles.dropdown}>
                                <Picker dropdownIconColor='#a6aab9'
                                    selectedValue={sortBy}
                                    mode={'dropdown'}
                                    style={{ color: 'black' }}
                                    onValueChange={
                                        sorting
                                    }

                                >
                                    <Picker.Item color='black' label={'Select'} />

                                    <Picker.Item color='black' label={'Name'} value={'name'} />
                                    <Picker.Item color='black' label={'Price'} value={'price'} />
                                </Picker>
                            </View>

                        </View>

                        <Text style={styles.totalItems}>{filteration().length} Items</Text>
                    </View>
                    {/* products list */}
                    <View style={styles.productList}>

                        {
                            selectedProducts.length > 0 ?
                                filteration().map((item, index) => { // products are showing
                                    return (
                                        <Product product={item} navigation={navigation} key={index} isBuyer={true} />

                                    )
                                })
                                :
                                null
                        }



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
        backgroundColor: 'white',
        alignItems: 'center'
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
    },
    dropdown: {
        borderBottomWidth: 1,
        width: 150,
        borderBottomColor: "rgba(155,155,155,1)",
        backgroundColor: "white",
        marginTop: 10,
        marginLeft: 4
    },

});


export default ProductsList;