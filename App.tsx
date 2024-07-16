import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PasswordGenerator from './component/PasswordGenerator';

const App = () => {
  return (
    <SafeAreaView>
      <View>
        <PasswordGenerator/>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
