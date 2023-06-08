import { StatusBar } from 'expo-status-bar';
import { Alert, View } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Location from 'expo-location';
import Header from './components/Header';
import Section1 from './components/Section1';
import Section2 from './components/Section2';
import styles from './styles/global';
import { useReducer, useState } from 'react';

const initialState = {
    driver: '',
    vehicle: '',
    plate: '',
    date: '',
    name: '',
    address: '',
    comment: '',
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_VALUE':
            return { ...state, [action.payload.name]: action.payload.value };

        case 'SET_DATE':
            return { ...state, date: action.payload };

        case 'RESET_ALL':
            return initialState;

        default:
            return state;
    }
};

export default function App() {
    const [step, setStep] = useState('none');
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleNextStep = (nextStep) => {
        if (state.driver === '') {
            Alert.alert('Error', 'Driver value is required.');
            return;
        }

        if (state.vehicle === '') {
            Alert.alert('Error', 'Vehicle value is required.');
            return;
        }

        if (state.plate === '') {
            Alert.alert('Error', 'Plate value is required.');
            return;
        }

        if (state.date === '') {
            Alert.alert('Error', 'Date value is required.');
            return;
        }

        setStep(nextStep);
    };

    const handleDone = () => {
        if (state.name === '') {
            Alert.alert('Error', 'Name value is required.');
            return;
        }

        if (state.address === '') {
            Alert.alert('Error', 'Address value is required.');
            return;
        }

        if (state.comment === '') {
            Alert.alert('Error', 'Comment value is required.');
            return;
        }

        Alert.alert('Please wait', 'Generating a file...', [], { cancelable: false });

        // get location
        Location.requestForegroundPermissionsAsync()
            .then((result) => {
                if (result.status !== 'granted') {
                    Alert.alert('Error', 'Permission to access location was denied');
                } else {
                    Location.getCurrentPositionAsync({})
                        .then((location) => {
                            const data = `Driver,Vehicle,Plate,Date,Type,Name,Address,Comment,Location\n${state.driver},${state.vehicle},${state.plate},${state.date},${step},${state.name},${state.address},${state.comment},${location.coords.latitude}:${location.coords.longitude}`;
                            saveFile(data);
                        })
                        .catch((e) => {
                            Alert.alert(e.message);
                        });
                }
            })
            .catch((e) => {
                Alert.alert(e.message);
            });
    };

    const saveFile = async (content) => {
        try {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status === 'granted') {
                const fileUri = `${FileSystem.documentDirectory}${Date.now()}.csv`;
                await FileSystem.writeAsStringAsync(fileUri, content, { encoding: FileSystem.EncodingType.UTF8 });

                const asset = await MediaLibrary.createAssetAsync(fileUri);
                const album = await MediaLibrary.getAlbumAsync('CarService');

                if (album == null) {
                    await MediaLibrary.createAlbumAsync('CarService', asset, false);
                } else {
                    await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
                }

                setStep('none');
                dispatch({ type: 'RESET_ALL' });
                Alert.alert('Success', asset.uri);
            } else {
                Alert.alert('Error', 'No permission to create a file');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const handleDate = (date) => {
        dispatch({ type: 'SET_DATE', payload: date });
    };

    const handleChange = (name, value) => {
        dispatch({ type: 'SET_VALUE', payload: { name, value } });
    };

    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            <Header />
            {step === 'none' ? (
                <Section1 handleNextStep={handleNextStep} state={state} handleChange={handleChange} handleDate={handleDate} />
            ) : (
                <Section2 step={step} state={state} handleDone={handleDone} handleChange={handleChange} />
            )}
        </View>
    );
}
