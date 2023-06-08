import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ff6e6c',
        padding: 32,
        width: '100%',
        height: '100%',
    },

    header: {
        width: '100%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
    },

    headerTitle: {
        color: 'white',
        fontSize: 32,
        paddingTop: 20,
        fontWeight: 'bold',
    },

    input: {
        color: 'white',
        fontSize: 14,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 12,
        marginBottom: 16,
    },

    textarea: {
        color: 'white',
        fontSize: 14,
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 12,
        marginBottom: 16,
    },

    inputWrapper: {
        marginBottom: 32,
    },

    button: {
        marginBottom: 16,
        backgroundColor: 'white',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: '#ff6e6c',
        fontSize: 16,
        fontWeight: 'bold',
    },

    selectedTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
});

export default styles;
