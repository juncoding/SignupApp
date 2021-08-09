import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {resetSignUpStore} from '../redux/';
import {ROUTE} from '../navigators/SignUp';
import {PLAN_ITEMS} from '../lib/config';

const ThanksScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const state = useSelector(({signUpStore}) => signUpStore);
  const {country, name, plan} = state;
  const {label: planLabel} = PLAN_ITEMS.find(item => item.value === plan) || {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thank you for sign up!</Text>
      </View>
      <View style={styles.fieldView}>
        <Text style={styles.rowLabel}>Country</Text>
        <Input
          disabled
          inputContainerStyle={styles.input}
          defaultValue={country}
        />
      </View>
      <View style={styles.fieldView}>
        <Text style={styles.rowLabel}>Name</Text>
        <Input
          disabled
          inputContainerStyle={styles.input}
          defaultValue={name}
        />
      </View>
      <View style={styles.fieldView}>
        <Text style={styles.rowLabel}>Plan</Text>
        <Input
          disabled
          inputContainerStyle={styles.input}
          defaultValue={planLabel}
        />
      </View>
      <View style={styles.buttonView}>
        <Button
          title="Go Back"
          style={styles.button}
          onPress={() => {
            navigation.navigate(ROUTE.COUNTRY);
            dispatch(resetSignUpStore());
          }}
        />
      </View>
    </View>
  );
};

export default ThanksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
  },
  header: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  headerTitle: {
    fontSize: 30,
  },
  fieldView: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    width: '50%',
  },
  rowLabel: {
    left: 20,
    width: 100,
    fontSize: 16,
  },
  buttonView: {
    flex: 0.3,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  button: {
    width: 120,
  },
});
