import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setSignUpStore} from '../redux/';
import {ROUTE} from '../navigators/SignUp';
import {COUNTRY} from '../lib/config';

const {SG, AU} = COUNTRY;

const CountryScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const choose = country => {
    dispatch(setSignUpStore({country}));
    navigation.navigate(ROUTE.SIGNUP);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Choose your country</Text>
      </View>
      <View style={styles.buttonView}>
        <Button
          containerStyle={styles.button}
          title={SG}
          onPress={() => choose(SG)}
        />
        <Button
          containerStyle={styles.button}
          title={AU}
          onPress={() => choose(AU)}
        />
      </View>
    </View>
  );
};

export default CountryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
  },
  header: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  headerTitle: {
    fontSize: 30,
  },
  buttonView: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    width: 120,
  },
});
