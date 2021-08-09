import React, {useState, useEffect} from 'react';
import {View, Text, Alert, StyleSheet, Platform} from 'react-native';
import {Button, Input} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {setSignUpStore} from '../redux/';
import {ROUTE} from '../navigators/SignUp';
import {PLAN_ITEMS} from '../lib/config';
import {permissionMgr} from '../lib/managers';
import {ImageSvc} from '../lib/services';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const state = useSelector(({signUpStore}) => signUpStore);
  const {country, name, nric, plan, image} = state;
  const [menuOpen, setMenuOpen] = useState(false);
  const [photoOpen, setPhotoOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState({});
  const menuOpenStyle =
    menuOpen && Platform.OS === 'android'
      ? {flex: 0.4, alignItems: 'flex-start'}
      : {};

  useEffect(() => {
    navigation.setOptions({headerBackTitle: country});
  }, [country, navigation]);

  const validate = () => {
    const errors = Object.keys(state).reduce((err, key) => {
      if (!state[key]) {
        err[key] = `${key} is required`;
      }
      return err;
    }, {});
    const hasError = !Object.keys(errors).length;
    setError(errors);

    return hasError;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sign Up</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Name</Text>
        <View style={styles.inputView}>
          <Input
            placeholder="Name"
            onChangeText={value => {
              dispatch(setSignUpStore({name: value}));
            }}
            onBlur={() => {
              setError(err => ({...err, name: ''}));
            }}
            defaultValue={name}
            errorStyle={styles.error}
            errorMessage={error?.name}
            maxLength={64}
            autoCapitalize="words"
          />
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Nric</Text>
        <View style={styles.inputView}>
          <Input
            placeholder="Nric"
            onChangeText={value => {
              dispatch(setSignUpStore({nric: value}));
            }}
            onBlur={() => {
              setError(err => ({...err, nric: ''}));
            }}
            defaultValue={nric}
            errorStyle={styles.error}
            errorMessage={error?.nric}
            maxLength={16}
            autoCapitalize="characters"
          />
        </View>
      </View>
      <View style={{...styles.row, ...styles.planRow, ...menuOpenStyle}}>
        <Text style={styles.rowLabel}>Plan</Text>
        <DropDownPicker
          containerStyle={styles.inputView}
          style={error?.plan ? styles.buttonHighlight : {}}
          open={menuOpen}
          value={plan}
          items={PLAN_ITEMS}
          setOpen={setMenuOpen}
          setValue={value => {
            setError(err => ({...err, plan: ''}));
            dispatch(setSignUpStore({plan: value()}));
          }}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Upload{'\n'} NRIC</Text>
        <View style={styles.inputView}>
          <Button
            title="Upload NRIC"
            disabled={photoOpen}
            containerStyle={styles.imageButton}
            buttonStyle={error?.image ? styles.buttonHighlight : {}}
            onPress={async () => {
              const canOpen = await permissionMgr.checkAndRequestPhoto();
              if (canOpen) {
                setPhotoOpen(true);
                launchImageLibrary(
                  {
                    mediaType: 'photo',
                  },
                  async ({didCancel, errorCode, errorMessage, assets}) => {
                    if (didCancel) {
                      setPhotoOpen(false);
                      return;
                    }
                    if (errorCode || errorMessage) {
                      Alert.alert('Error', errorMessage, [{text: 'OK'}]);
                      setPhotoOpen(false);
                      return;
                    }
                    setError(err => ({...err, image: ''}));
                    dispatch(setSignUpStore({image: assets[0]}));
                    setPhotoOpen(false);
                  },
                );
              }
            }}
          />
          <Text style={styles.imageFileName}>{image?.fileName}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          title="Submit"
          containerStyle={styles.submitButton}
          disabled={submitting}
          loading={submitting}
          onPress={async () => {
            if (!validate()) {
              return;
            }
            setSubmitting(true);

            try {
              await ImageSvc.uploadImage(state);
              navigation.navigate(ROUTE.THANKS);
            } catch (e) {
              console.log(e);
              Alert.alert(
                e.message || 'Network Error',
                'Please try it again later!',
                [{text: 'OK'}],
              );
              setSubmitting(false);
            }
          }}
        />
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    margin: 0,
  },
  header: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  headerTitle: {
    fontSize: 30,
  },
  row: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  planRow: {
    zIndex: 1000,
  },
  rowLabel: {
    left: 20,
    width: 100,
    fontSize: 14,
  },
  inputView: {
    right: 20,
    width: '70%',
    flexDirection: 'row',
  },
  buttonHighlight: {
    borderColor: 'red',
    borderWidth: 1,
  },
  imageButton: {
    width: 150,
  },
  imageFileName: {
    width: 100,
    left: 160,
    position: 'absolute',
  },
  submitButton: {
    width: 250,
  },
  footer: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  error: {
    color: 'red',
  },
});
