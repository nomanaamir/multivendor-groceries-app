import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';
const { width, height, fontScale } = Dimensions.get('window')
import TextInput from '../../../shared/components/input-field/index';
import Button from '../../../shared/components/button/index';

function AddNewProduct(props) {
    const { navigation } = props;

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
                                onChangeText={(text) => console.log(text)}
                            />

                            <TextInput
                                placeholder={'Price'}
                                keyboardType="numeric"
                                secureTextEntry={true}
                                onChangeText={(text) => console.log(text)}
                            />

                            <TextInput
                                placeholder={'Description'}
                                keyboardType="default"
                                secureTextEntry={true}
                                onChangeText={(text) => console.log(text)}
                            />

                            <TextInput
                                placeholder={'Quantity'}
                                keyboardType="numeric"
                                secureTextEntry={false}
                                onChangeText={(text) => console.log(text)}
                            />

                            <TextInput
                                placeholder={'Size'}
                                keyboardType="numeric"
                                secureTextEntry={false}
                                onChangeText={(text) => console.log(text)}
                            />
                        </View>
                    </View>

                    <View style={styles.sellerSignUpFooter}>

                        {/* Button Child component in which we are sending details of button via props */}

                        <Button
                            title={"Submit Details"}
                            color={'#2196f3'}
                            onPress={() => null}
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
        // padding: 10
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

export default AddNewProduct;
