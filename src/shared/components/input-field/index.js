import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput
} from 'react-native';
const { width, height, fontScale } = Dimensions.get('window')

function InputField(props) {
    const { placeholder, keyboardType, value, secureTextEntry, onChangeText } = props

    return (
        <TextInput
            style={styles.textField}
            placeholder={placeholder}
            keyboardType={keyboardType}
            value={value}
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
            placeholderTextColor="#a6aab9"
        />
    );
};

const styles = StyleSheet.create({
    textField: {
        backgroundColor: 'white',
        color: '#a6aab9',
        margin: 5,
        borderRadius: 4,
        width: '90%'
    }
});

export default InputField;
