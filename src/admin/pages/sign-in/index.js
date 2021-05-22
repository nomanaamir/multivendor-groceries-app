import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
// import 'connect' to connect the redux with screens
import { connect } from 'react-redux';
// import middlewares functions
import { AdminAccountSignIn } from '../../../Store/Middlewares/middlewares';

const { height, fontScale } = Dimensions.get('window');
import Button from '../../../shared/components/button/index';
import TextInput from '../../../shared/components/input-field/index';
function AdminSignIn(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const adminSignIn = () => {

        if (
            email === '' ||
            password === ''
        ) {
            alert('All fields required!') // checking if input values fields are empty then alert will be show
        } else {
            if (email === 'admin@admin.com' && password === 'admin123') {
                // calling seller sign in middlewares function
                props.AdminAccountSignInAction()
            } else {
                alert('Permission denied!')
            }
        }
    }
    return (
        // safe area and scroll view for responsive height and width for landscape mode
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
            >
                <View style={styles.adminSignInContainer}>
                    <View style={styles.adminSignInContainerHeader}>
                        <Text style={styles.heading}>
                            Admin Sign In
                        </Text>
                        <Text style={styles.subHeading}>
                            Please Sign in to grant access
                        </Text>
                    </View>

                    <View style={styles.adminSignInContainerBody}>
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
                                loader={props.isAdminSignedIn}
                                title={"Sign In"}
                                color={'#687089'}
                                onPress={() => adminSignIn()}
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
    adminSignInContainerHeader: {

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
    adminSignInContainerBody: {
        alignItems: 'center'
    },
    form: {
        alignItems: 'center',
        width: '100%',
    }
});

function mapStateToProps(state) {
    return {
        isAdminSignedIn: state.root.is_admin_signed_in // seller sign in login boolean
    }
}
function mapDispatchToProps(dispatch) {
    return ({
        AdminAccountSignInAction: () => { dispatch(AdminAccountSignIn()) }, // seller sign in middlewares function

    })
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminSignIn);