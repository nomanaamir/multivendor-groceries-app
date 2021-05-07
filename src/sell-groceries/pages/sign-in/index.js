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
import { SellerAccountSignIn } from '../../../Store/Middlewares/middlewares';

const { width, height, fontScale } = Dimensions.get('window');
import Button from '../../../shared/components/button/index';
import TextInput from '../../../shared/components/input-field/index';
function SellerSignIn(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { navigation } = props;

    const sellerSignIn = () => {

        if (
            email === '' ||
            password === ''
        ) {
            alert('All fields required!')
        } else {
            props.SellerAccountSignInAction(email, password)
        }
    }
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
                                onChangeText={(text) => setEmail(text)}
                            />

                            <TextInput
                                placeholder={'Password'}
                                keyboardType="default"
                                secureTextEntry={true}
                                onChangeText={(text) => setPassword(text)}
                            />
                            {/* Button Child component in which we are sending details of button via props */}
                            <Button
                                loader={props.isSellerSignedIn}
                                title={"Sign In"}
                                color={'#687089'}
                                onPress={() => sellerSignIn()}
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

function mapStateToProps(state) {
    return {
        isSellerSignedIn: state.root.is_seller_signed_in
    }
}
function mapDispatchToProps(dispatch) {
    return ({
        SellerAccountSignInAction: (email, password) => { dispatch(SellerAccountSignIn(email, password)) },

    })
}
export default connect(mapStateToProps, mapDispatchToProps)(SellerSignIn);