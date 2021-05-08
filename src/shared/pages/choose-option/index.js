import React, { useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator
} from 'react-native';
const { width, height, fontScale } = Dimensions.get('window')
// import middlewares function
import { setNavigationProps, RetrieveDataAssyncStorage } from '../../../Store/Middlewares/middlewares';

// import 'connect' to connet the redux with screens
import { connect } from 'react-redux';

// import components
import Button from '../../components/button/index';

function ChooseOption(props) {

    const { navigation } = props;
    useEffect(() => {
        props.setNavigationPropsAction(navigation); // setting navigation props in redux in order to access it from anywhere - even in child components
        props.RetrieveDataAssyncStorageAction(); // calling asynscStorage function of getting seller details

    }, []);

    // checking if seller is already logged in then goto direct seller dashboard
    useEffect(() => {
        if (props.isSeller) {
            navigation.navigate('sellerDashboard')
        }
    }, [props.isSeller]);
    return (
        <SafeAreaView style={styles.optionsContainer}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
            >
                <View style={styles.chooseOptionContainer}>

                    <View style={styles.chooseOptionContainerHeader}>
                        <Text style={styles.heading}>
                            What do you want to do?
                        </Text>
                        <Text style={styles.subHeading}>
                            Choose your option
                        </Text>
                    </View>

                    <View style={styles.chooseOptionContainerBody}>

                        {
                            props.isSeller === false ? // checking if seller is not logged in then buttons will be shown
                                <>

                                    <Button
                                        loader={false}
                                        title={"I want to Buy Groceries"}
                                        color={'#687089'}
                                        onPress={() => null}
                                    />
                                    <Button
                                        loader={false}
                                        title={"I want to Sell Groceries"}
                                        color={'#687089'}
                                        onPress={() => navigation.navigate('sellerSignUp')}
                                    />
                                    <Button
                                        loader={false}
                                        title={"Administration Login"}
                                        color={'#687089'}
                                        onPress={() => null}
                                    />
                                </>
                                :
                                <ActivityIndicator size={85} color="#687089" /> // otherwise loader appears

                        }

                    </View>


                </View>
            </ScrollView>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    optionsContainer: {
        backgroundColor: '#eff1f8',
        flex: 1,
    },
    chooseOptionContainerHeader: {

        height: height / 4,
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
    chooseOptionContainerBody: {
        alignItems: 'center'
    },
});

function mapStateToProps(state) {

    return {
        isSeller: state.root.async_storage_data?.data?.isLoggedIn // getting boolean of logged in state from asyncStorage
    }
}
function mapDispatchToProps(dispatch) {
    return ({
        setNavigationPropsAction: (navigation) => { dispatch(setNavigationProps(navigation)) }, // middleware function set navigation props in redux
        RetrieveDataAssyncStorageAction: () => { dispatch(RetrieveDataAssyncStorage()) }, // middleware function of seller's asyncStorage data
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(ChooseOption);
