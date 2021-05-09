import React, { useState } from 'react';
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
// import 'connect' to connect the redux with screens
import { connect } from 'react-redux';
// import middlewares functions
import { SellerAccountSignUp } from '../../../Store/Middlewares/middlewares';

const { width, height, fontScale } = Dimensions.get('window')
import TextInput from '../../../shared/components/input-field/index';
import Button from '../../../shared/components/button/index';

function SellerSignUp(props) {
    const { navigation } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [storeName, setStoreName] = useState('');
    const [completeAddress, setCompleteAddress] = useState('');
    const [openUntil, setOpenUntil] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const timings = [
        '6:00 PM',
        '9:00 PM',
        '11:00 PM',
        '24/7',
    ]
    const activeBtn = {
        backgroundColor: '#008900'
    }
    const sellerSignUp = () => {
        const seller = {
            email,
            storeName,
            completeAddress,
            openUntil,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude)
        }
        if (
            email === '' ||
            password === '' ||
            confirmPassword === '' ||
            storeName === '' ||
            completeAddress === '' ||
            openUntil === '',
            latitude === null,
            longitude === null
        ) {
            alert('All fields required!') // checking if input values fields are empty then alert will be show
        } else {
            if (password !== confirmPassword) {
                alert('Password must be matched!') // checking if values of 'password' & 'confirm password' fields are empty then alert will be show
            } else {
                props.SellerAccountSignUpAction(email, password, seller) // calling Seller account sign in middleware function
            }
        }
        console.log('email', email);
        console.log('password', password);
        console.log('confirmPassword', confirmPassword);
        console.log('storeName', storeName);
        console.log('completeAddress', completeAddress);
        console.log('openUntil', openUntil);
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
            >
                <View style={styles.sellerSignUp}>
                    <View style={styles.sellerSignUpBody}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>
                                Seller Sign Up
                            </Text>
                        </View>
                        <View style={styles.form}>
                            {/* TextInput Child component in which we are sending details of input field via props */}
                            <TextInput
                                placeholder={'Email'}
                                keyboardType="email-address"
                                secureTextEntry={false}
                                onChangeText={(text) => setEmail(text)}
                            />

                            <TextInput
                                placeholder={'Choose Password'}
                                keyboardType="default"
                                secureTextEntry={true}
                                onChangeText={(text) => setPassword(text)}
                            />

                            <TextInput
                                placeholder={'Repeat Password'}
                                keyboardType="default"
                                secureTextEntry={true}
                                onChangeText={(text) => setConfirmPassword(text)}
                            />

                            <TextInput
                                placeholder={'Your Store Name'}
                                keyboardType="default"
                                secureTextEntry={false}
                                onChangeText={(text) => setStoreName(text)}
                            />

                            <TextInput
                                placeholder={'Your Complete address'}
                                keyboardType="default"
                                secureTextEntry={false}
                                onChangeText={(text) => setCompleteAddress(text)}
                            />

                            <TextInput
                                placeholder={'Latitude'}
                                keyboardType="numeric"
                                secureTextEntry={false}
                                onChangeText={(text) => setLatitude(text)}
                            />

                            <TextInput
                                placeholder={'Longitude'}
                                keyboardType="numeric"
                                secureTextEntry={false}
                                onChangeText={(text) => setLongitude(text)}
                            />
                            {/* open until timings options */}
                            <View style={styles.openUntil}>
                                <Text style={styles.openUntilText}>Open Until:</Text>

                                <View style={styles.timingsRow}>
                                    {
                                        timings.map((item, index) => {
                                            return (
                                                <TouchableOpacity key={index} onPress={() => setOpenUntil(item)} style={[styles.timingsRowBTn, openUntil === item ? activeBtn : null]}>
                                                    <Text style={styles.timingsRowBTnText}>
                                                        {item}
                                                    </Text>
                                                </TouchableOpacity>

                                            )
                                        })
                                    }
                                </View>
                            </View>

                        </View>
                    </View>

                    <View style={styles.sellerSignUpFooter}>
                        <Text style={styles.termsServiceText}>
                            By proceeding you also agree to the Terms of service and Privacy Policy
                            </Text>
                        {/* Button Child component in which we are sending details of button via props */}
                        <Button
                            loader={false}
                            title={"Sign Up"}
                            color={'#687089'}
                            loader={props.isSellerSignedUp}
                            onPress={() => sellerSignUp()}
                        />
                        <View style={styles.alreadyAccount}>
                            <Text style={styles.alreadyAccountText}>Already have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('sellerSignIn')}>
                                <Text style={styles.alreadyAccountLink}>SignIn</Text>
                            </TouchableOpacity>
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
        fontSize: fontScale * 15
    },
    form: {
        // padding: 10
        alignItems: 'center'
    },
    sellerSignUp: {
        justifyContent: 'space-between'
    },
    sellerSignUpBody: {
        height: height / 1.1,
    },
    openUntilText: {
        fontSize: fontScale * 14,
    },
    timingsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%'
    },
    timingsRowBTn: {
        width: '25%',
        backgroundColor: '#007aff',
        height: 40,
        margin: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timingsRowBTnText: {

        color: 'white'
    },
    sellerSignUpFooter: {
        height: height / 4,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    termsServiceText: {
        textAlign: 'center',
        color: '#9da1b4'
    },
    alreadyAccount: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 25
    },
    alreadyAccountText: {
        fontSize: fontScale * 11,
        color: '#9da1b4'
    },
    alreadyAccountLink: {
        color: '#959595',
        fontWeight: 'bold'
    }
});
function mapStateToProps(state) {

    return {
        isSellerSignedUp: state.root.is_seller_signed_up // getting seller sign Up boolean
    }
}
function mapDispatchToProps(dispatch) {
    return ({
        // seller account sign up middleware function - passing three params, 'email', 'password' and 'seller details'
        SellerAccountSignUpAction: (email, password, seller) => { dispatch(SellerAccountSignUp(email, password, seller)) },

    })
}
export default connect(mapStateToProps, mapDispatchToProps)(SellerSignUp);
