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

function SellerSignUp(props) {
    const { navigation } = props;
    const timings = [
        '6:00 PM',
        '9:00 PM',
        '11:00 PM',
        '24/7',
    ]
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
                                onChangeText={(text) => console.log(text)}
                            />

                            <TextInput
                                placeholder={'Choose Password'}
                                keyboardType="default"
                                secureTextEntry={true}
                                onChangeText={(text) => console.log(text)}
                            />

                            <TextInput
                                placeholder={'Repeat Password'}
                                keyboardType="default"
                                secureTextEntry={true}
                                onChangeText={(text) => console.log(text)}
                            />

                            <TextInput
                                placeholder={'Your Store Name'}
                                keyboardType="default"
                                secureTextEntry={false}
                                onChangeText={(text) => console.log(text)}
                            />

                            <TextInput
                                placeholder={'Your Complete address'}
                                keyboardType="default"
                                secureTextEntry={false}
                                onChangeText={(text) => console.log(text)}
                            />
                            {/* open until timings options */}
                            <View style={styles.openUntil}>
                                <Text style={styles.openUntilText}>Open Until:</Text>

                                <View style={styles.timingsRow}>
                                    {
                                        timings.map((item, index) => {
                                            return (
                                                <TouchableOpacity key={index} onPress={() => null} style={styles.timingsRowBTn}>
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
                            title={"Sign Up"}
                            color={'#687089'}
                            onPress={() => null}
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
        height: height / 1.3,
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

export default SellerSignUp;
