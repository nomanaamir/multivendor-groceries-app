import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    View
} from 'react-native';
const { width, height, fontScale } = Dimensions.get('window')

function Product(props) {
    const { navigation, product, isBuyer } = props;
    const { productName, price, description, quantity, size } = product

    const productDetails = ()=>{
        if(isBuyer){
            navigation.navigate('productDetails', { product })
        }
    }
    return (
        <TouchableOpacity style={styles.product} onPress={()=> productDetails()}>
            <View style={styles.productImg}>

            </View>
            <View style={styles.productInfo}>
                <Text style={styles.productInfoName}>{productName}</Text>
                <Text style={styles.productInfoPrice}>£{price}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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

export default Product;
