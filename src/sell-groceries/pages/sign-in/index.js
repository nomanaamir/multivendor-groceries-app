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
import Button from '../../../shared/components/button/index';
import TextInput from '../../../shared/components/input-field/index';
function SellerSignIn(props) {

    const { navigation } = props;
    return (
        // safe area and scroll view for responsive height and width for landscape mode
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
            >
                <View style={styles.sellerSignInContainer}>
                    <View style={styles.sellerSignInContainerHeader}>
                        <Text style={styles.heading}>
                            Seller Sign In to Proceed
                        </Text>
                        <Text style={styles.subHeading}>
                            Please Sign in  to your seller account
                        </Text>
                    </View>

                    <View style={styles.sellerSignInContainerBody}>
                        <View style={styles.form}>
                             {/* TextInput Child component in which we are sending details of input field via props */}
                            <TextInput
                                placeholder={'Email'}
                                keyboardType="email-address"
                                secureTextEntry={false}
                                onChangeText={(text) => console.log(text)}
                            />

                            <TextInput
                                placeholder={'Password'}
                                keyboardType="default"
                                secureTextEntry={true}
                                onChangeText={(text) => console.log(text)}
                            />
                             {/* Button Child component in which we are sending details of button via props */}
                            <Button
                                title={"Sign In"}
                                color={'#687089'}
                                onPress={() => navigation.navigate('sellerDashboard')}
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
    sellerSignInContainerHeader: {

        height: height / 2.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: fontScale * 18
    },
    subHeading: {
        color: '#acb1c1',
        fontSize: fontScale * 14
    },
    sellerSignInContainerBody: {
        alignItems: 'center'
    },
    form: {
        alignItems: 'center',
        width: '100%',
    }
});

export default SellerSignIn;
