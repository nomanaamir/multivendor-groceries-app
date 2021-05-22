import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
const { height, fontScale } = Dimensions.get('window')
// import 'connect' to connect the redux with screens
import { connect } from 'react-redux';
// import middlewares functions
import { SellerAddNewProduct } from '../../../Store/Middlewares/middlewares';

// components
import TextInput from '../../../shared/components/input-field/index';
import Button from '../../../shared/components/button/index';

function AddNewProduct(props) {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [size, setSize] = useState('');

    const { navigation, route } = props;
    const { sellerUID } = route.params;
    const addProduct = () => {
        const product = {
            productName,
            price,
            description,
            quantity,
            size
        }
        if (
            productName === '' ||
            price === '' ||
            description === '' ||
            quantity === '' ||
            size === ''
        ) {
            alert('All fields required!')
        } else {
            // add new product middleware function - passing two params 'seller auth UID' and 'product details'
            props.SellerAddNewProductAction(sellerUID, product)
        }
    }
    return (
        // safe area and scroll view for responsive height and width for landscape mode
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
            >
                <View style={styles.sellerSignUp}>
                    <View style={styles.sellerSignUpBody}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>
                                Please add details of your new product
                            </Text>
                        </View>
                        <View style={styles.form}>
                            {/* TextInput Child component in which we are sending details of input field via props */}
                            <TextInput
                                placeholder={'Product Name'}
                                keyboardType="default"
                                secureTextEntry={false}
                                onChangeText={(text) => setProductName(text)}
                            />

                            <TextInput
                                placeholder={'Price'}
                                keyboardType="numeric"
                                secureTextEntry={false}
                                onChangeText={(text) => setPrice(text)}
                            />

                            <TextInput
                                placeholder={'Description'}
                                keyboardType="default"
                                secureTextEntry={false}
                                onChangeText={(text) => setDescription(text)}
                            />

                            <TextInput
                                placeholder={'Quantity'}
                                keyboardType="numeric"
                                secureTextEntry={false}
                                onChangeText={(text) => setQuantity(text)}
                            />

                            <TextInput
                                placeholder={'Size'}
                                keyboardType="numeric"
                                secureTextEntry={false}
                                onChangeText={(text) => setSize(text)}
                            />
                        </View>
                    </View>

                    <View style={styles.sellerSignUpFooter}>

                        {/* Button Child component in which we are sending details of button via props */}

                        <Button
                            title={"Submit Details"}
                            color={'#2196f3'}
                            loader={false}
                            onPress={() => addProduct()}
                        />

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
    header: {
        backgroundColor: 'white',
        height: height / 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10

    },
    headerText: {
        fontWeight: 'bold',
        fontSize: fontScale * 14
    },
    form: {
        alignItems: 'center'
    },
    sellerSignUp: {
        justifyContent: 'space-between'
    },
    sellerSignUpBody: {
        height: height / 1.6
    },
    sellerSignUpFooter: {
        alignItems: 'center',
        justifyContent: 'space-around'
    },
});
function mapStateToProps(state) {
    return {
        isSellerSignedIn: state.root.is_seller_signed_in // getting boolean
    }
}
function mapDispatchToProps(dispatch) {
    return ({
        // add new product middleware function - passing two params 'seller auth UID' and 'product details'
        SellerAddNewProductAction: (sellerUID, product) => { dispatch(SellerAddNewProduct(sellerUID, product)) },

    })
}
export default connect(mapStateToProps, mapDispatchToProps)(AddNewProduct);
