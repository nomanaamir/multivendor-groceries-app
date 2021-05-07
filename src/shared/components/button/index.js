import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator
} from 'react-native';
const { width, height, fontScale } = Dimensions.get('window')

function Button(props) {
    const { title, color, loader, onPress } = props
    const bgColor = {
        backgroundColor: color
    }
    return (
        <TouchableOpacity style={[styles.button, bgColor]} onPress={onPress} disabled={loader}>
            {
                loader === false ?
                    <Text style={styles.buttonText}>
                        {title}
                    </Text>
                    :
                    <ActivityIndicator size={25} color="white" />
            }
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
