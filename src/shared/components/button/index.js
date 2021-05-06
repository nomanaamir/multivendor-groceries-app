import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
const { width, height, fontScale } = Dimensions.get('window')

function Button(props) {
    const { title, color, onPress } = props
    const bgColor = {
        backgroundColor: color
    }
    return (
        <TouchableOpacity style={[styles.button, bgColor]} onPress={onPress}>
            <Text style={styles.buttonText}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: height / 12,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        borderRadius: 20
    },
    buttonText: {
        color: 'white',
        fontSize: fontScale * 13

    }
});

export default Button;
