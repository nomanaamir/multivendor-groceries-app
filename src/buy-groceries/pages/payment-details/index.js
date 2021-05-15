import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    Button
} from 'react-native';
const { height, width, fontScale } = Dimensions.get('window');
function PaymentDetails(props) {
    const [cardNumber, setCardNumber] = useState(null);
    const [cardHolder, setCardHolder] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCVV] = useState(null);
    const [fullName, setFullName] = useState('');
    const [postcode, setPostcode] = useState(null);
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [phNumber, setPhNumber] = useState(null);


    const { navigation, route } = props;
    useEffect(() => {

    }, []);
    const payNow = () => {
        if (
            cardNumber === null ||
            cardHolder === '' ||
            expiryDate === '' ||
            cvv === null ||
            fullName === '' ||
            postcode === null ||
            city === '' ||
            country === '' ||
            phNumber === null
        ) {
            alert('All fields required!')
        } else {

            if (cardNumber.toString().length !== 16) {
                alert('Card number must have 16 digits!')
            } else if (cvv.toString().length !== 3) {
                alert('CVV must have 3 digits!')
            } else {
                navigation.navigate('congrats')
            }

        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
            >
                <View style={styles.paymentMethod}>
                    <View style={styles.form}>
                        <View style={styles.formHeading}>
                            <Text style={styles.formHeadingText}>
                                Card Details
                             </Text>
                        </View>
                        <View style={styles.formBody}>
                            <TextInput
                                style={styles.textField}
                                placeholderTextColor="#68708a"
                                placeholder='Card Number'
                                keyboardType="numeric"
                                maxLength={16}
                                onChangeText={(text) => setCardNumber(text)}
                            />

                            <TextInput
                                style={styles.textField}
                                placeholderTextColor="#68708a"
                                placeholder='Name on Card'


                                onChangeText={(text) => setCardHolder(text)}
                            />

                            <View style={styles.fieldRow}>
                                <View style={styles.fieldRowCol}>
                                    <TextInput
                                        style={styles.textField}
                                        placeholderTextColor="#68708a"
                                        placeholder='Expiry Date'
                                        keyboardType="numeric"

                                        onChangeText={(text) => setExpiryDate(text)}
                                    />
                                </View>
                                <View style={styles.fieldRowCol}>
                                    <TextInput
                                        style={styles.textField}
                                        placeholderTextColor="#68708a"
                                        placeholder='CVV'
                                        keyboardType="numeric"
                                        maxLength={3}
                                        onChangeText={(text) => setCVV(text)}
                                    />
                                </View>
                            </View>

                            <Text style={styles.cvvInfo}>
                                CVV is the last 3 digits in the signature strip on the back of your card.
                            </Text>

                            <View style={{ width: 150, margin: 5, marginLeft: 'auto' }}>
                                <Button
                                    title="Pay Now"
                                    color="#0076ff"
                                    onPress={() => payNow()}
                                />
                            </View>

                        </View>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.formHeading}>
                            <Text style={styles.formHeadingText}>
                                Your Details
                             </Text>
                        </View>
                        <View style={styles.formBody}>
                            <TextInput
                                style={styles.textField}
                                placeholderTextColor="#68708a"
                                placeholder='Full name'
                                maxLength={16}
                                onChangeText={(text) => setFullName(text)}
                            />

                            <View style={styles.fieldRow}>
                                <View style={styles.fieldRowCol}>
                                    <TextInput
                                        style={styles.textField}
                                        placeholderTextColor="#68708a"
                                        placeholder='Postcode'
                                        keyboardType="numeric"
                                        onChangeText={(text) => setPostcode(text)}
                                    />
                                </View>
                                <View style={styles.fieldRowCol}>
                                    <TextInput
                                        style={styles.textField}
                                        placeholderTextColor="#68708a"
                                        placeholder='City'
                                        onChangeText={(text) => setCity(text)}
                                    />
                                </View>
                            </View>

                            <TextInput
                                style={styles.textField}
                                placeholderTextColor="#68708a"
                                placeholder='Country'
                                onChangeText={(text) => setCountry(text)}
                            />

                            <TextInput
                                style={styles.textField}
                                placeholderTextColor="#68708a"
                                placeholder='Phone number'
                                keyboardType="numeric"
                                onChangeText={(text) => setPhNumber(text)}
                            />

                            {/* <Text style={styles.cvvInfo}>
                                Use your phone number please
                            </Text> */}

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
    formHeading: {
        padding: 10
    },
    formHeadingText: {
        color: '#a5aaba',
        fontWeight: 'bold',
        fontSize: fontScale * 13
    },
    formBody: {
        backgroundColor: 'white',
        padding: 10
    },
    textField: {
        borderColor: '#a3a8b8',
        borderWidth: 1,
        borderRadius: 2,
        marginTop: 3,
        marginBottom: 3,
        color: 'black'
    },
    fieldRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    fieldRowCol: {
        width: '49%',
    },
    cvvInfo: {
        color: '#a5aaba',
        textAlign: 'center',
        fontSize: fontScale * 12
    }
});


export default PaymentDetails;