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
import Button from '../../components/button/index'
function ChooseOption(props) {

    const { navigation } = props;
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

export default ChooseOption;
