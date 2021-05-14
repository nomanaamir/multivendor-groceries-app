import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    SafeAreaView,
    ScrollView,
    Text
} from 'react-native';
// import components
import Button from '../../../shared/components/button/index';

const { height, width, fontScale } = Dimensions.get('window');
function ProductDetails(props) {

    const { navigation, route } = props;
    const { product } = route.params; // getting selected product
    const { productName, price, description, quantity, size } = product
    console.log('product', product)
    useEffect(() => {

    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
            >
                <View>
                    <View style={styles.productImg}>

                    </View>

                    <View style={styles.body}>

                        <View style={styles.col1}>
                            <View style={styles.productRow}>
                                <Text style={styles.productName}>{productName}</Text>
                                <Text style={styles.productPrice}>${price}</Text>
                            </View>


                            <View style={styles.spaceBetween}>
                                <View style={styles.descriptionContainer}>
                                    <Text style={styles.descriptionHeading}>Description</Text>
                                    <Text style={styles.descriptionText}>{description}</Text>
                                </View>


                                <View style={styles.productQualities}>

                                    <View style={styles.quality}>
                                        <Text style={styles.qualityLabel}>Size</Text>
                                        <Text style={styles.qualityValue}>{size}</Text>
                                    </View>

                                    <View style={styles.quality}>
                                        <Text style={styles.qualityLabel}>Quantity</Text>
                                        <Text style={styles.qualityValue}>{quantity}</Text>
                                    </View>

                                </View>

                            </View>

                        </View>

                        <View style={styles.col2}>
                            <Button
                                loader={false}
                                title={"Proceed"}
                                color={'#2196f3'}
                                onPress={() => null}
                            />
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
    productImg: {
        height: height / 3,
        backgroundColor: '#cfd8dc',
    },
    body: {
        padding: 10,
        // backgroundColor: 'red',
        height: height / 1.8,

    },
    col1: {
        flex: 4,
        // backgroundColor: 'yellow'
    },
    col2: {
        flex: 1,
        // backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'

    },
    spaceBetween: {
        justifyContent: 'space-between',
        // backgroundColor: 'orange',
        flex: 1
    },
    productRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    productName: {
        fontSize: fontScale * 15,
        fontWeight: 'bold'
    },
    productPrice: {
        color: '#64b2ee',
        fontSize: fontScale * 15,
        fontWeight: 'bold'
    },
    descriptionContainer: {
        marginTop: 10,
        marginBottom: 10,
    },
    descriptionHeading: {
        fontSize: fontScale * 13,
        fontWeight: 'bold'
    },
    descriptionText: {
        color: '#a6aab9',
        margin: 2
    },
    productQualities: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    quality: {
        width: '46%',
        backgroundColor: 'white',
        margin: 5,
        height: height / 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    qualityLabel: {
        fontSize: fontScale * 13,
        fontWeight: 'bold'
    }
});


export default ProductDetails;