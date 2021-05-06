import React, { useEffect } from 'react';
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
// import middlewares function
import { setNavigationProps } from '../../../Store/Middlewares/middlewares';

// import 'connect' to connet the redux with screens
import { connect } from 'react-redux';

// import components
import Button from '../../components/button/index';

function ChooseOption(props) {

    const { navigation } = props;
    useEffect(() => {
        props.setNavigationPropsAction(navigation)
    }, []);
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
                        <Button
                            title={"I want to Buy Groceries"}
                            color={'#687089'}
                            onPress={() => null}
                        />
                        <Button
                            title={"I want to Sell Groceries"}
                            color={'#687089'}
                            onPress={() => navigation.navigate('sellerSignUp')}
                        />
                        <Button
                            title={"Administration Login"}
                            color={'#687089'}
                            onPress={() => null}
                        />
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
function mapDispatchToProps(dispatch) {
    return ({
        setNavigationPropsAction: (navigation) => { dispatch(setNavigationProps(navigation)) },
    })
}
export default connect(null, mapDispatchToProps)(ChooseOption);
