import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const PasswordSchema = Yup.object({
  passwordLength: Yup.number()
    .min(4, 'Should be minimum of 4 characters')
    .max(16, 'Should be maximum of 16 characters')
    .required('Length should be greater than 0'),
});

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [special, setSpecial] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';
    const upperCaseChars = 'QWERTYUIOPLKJHGFDSAZXCVBNM';
    const lowerCaseChars = 'qwertyuiopasdfghjklzxcvbnm';
    const specialChars = '!@#$%^&*()_+/-?';
    const numbersChar = '1234567890';

    if (lowerCase) {
      characterList += lowerCaseChars;
    }
    if (upperCase) {
      characterList += upperCaseChars;
    }
    if (numbers) {
      characterList += numbersChar;
    }
    if (special) {
      characterList += specialChars;
    }

    const passwordCreated = createPassword(characterList, passwordLength);
    setPassword(passwordCreated);
    setIsPassGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPasswordState = () => {
    setLowerCase(false);
    setUpperCase(false);
    setNumbers(false);
    setSpecial(false);
    setPassword('');
    setIsPassGenerated(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
      <SafeAreaView>
        <View style={styles.section}>
          <Text style={styles.title}>Password Generator</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.box}>
            <Formik
              initialValues={{passwordLength: ''}}
              validationSchema={PasswordSchema}
              onSubmit={values => {
                generatePasswordString(+values.passwordLength);
              }}>
              {({
                values,
                errors,
                touched,
                isValid,
                handleChange,
                handleSubmit,
                handleReset,
              }) => (
                <View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password Length*</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                    <TextInput
                      style={styles.input}
                      placeholder="8"
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.checkboxContainer}>
                    <Text style={styles.label}>Include Numeric Values</Text>
                    <BouncyCheckbox
                      size={25}
                      fillColor="red"
                      unFillColor="#FFFFFF"
                      iconStyle={{borderColor: 'red'}}
                      innerIconStyle={{borderWidth: 2}}
                      textStyle={{fontFamily: 'JosefinSans-Regular'}}
                      isChecked={numbers}
                      onPress={() => setNumbers(!numbers)}
                    />
                  </View>
                  <View style={styles.checkboxContainer}>
                    <Text style={styles.label}>Include Lowercase Values</Text>
                    <BouncyCheckbox
                      size={25}
                      fillColor="red"
                      unFillColor="#FFFFFF"
                      iconStyle={{borderColor: 'red'}}
                      innerIconStyle={{borderWidth: 2}}
                      textStyle={{fontFamily: 'JosefinSans-Regular'}}
                      isChecked={lowerCase}
                      onPress={() => setLowerCase(!lowerCase)}
                    />
                  </View>
                  <View style={styles.checkboxContainer}>
                    <Text style={styles.label}>Include Special Values</Text>
                    <BouncyCheckbox
                      size={25}
                      fillColor="red"
                      unFillColor="#FFFFFF"
                      iconStyle={{borderColor: 'red'}}
                      innerIconStyle={{borderWidth: 2}}
                      textStyle={{fontFamily: 'JosefinSans-Regular'}}
                      isChecked={special}
                      onPress={() => setSpecial(!special)}
                    />
                  </View>
                  <View style={styles.checkboxContainer}>
                    <Text style={styles.label}>Include Uppercase Values</Text>
                    <BouncyCheckbox
                      size={25}
                      fillColor="red"
                      unFillColor="#FFFFFF"
                      iconStyle={{borderColor: 'red'}}
                      innerIconStyle={{borderWidth: 2}}
                      textStyle={{fontFamily: 'JosefinSans-Regular'}}
                      isChecked={upperCase}
                      onPress={() => setUpperCase(!upperCase)}
                    />
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.button, !isValid && styles.disabledButton]}
                      disabled={!isValid}
                      onPress={() => handleSubmit()}>
                      <Text style={styles.buttonText}>Generate Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        handleReset();
                        resetPasswordState();
                      }}>
                      <Text style={styles.buttonText}>Reset</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.passwordContainer}>
                    <Text selectable={true} style={styles.generatedPassword}>
                      {password}
                    </Text>
                  </View>
                </View>
              )}
            </Formik>
          </View>
          <View style={styles.footer}>
            <Text>Made by Sourav Sharma</Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  box:{
    marginBottom:10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  checkboxContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  passwordContainer: {
    marginTop: 20,
  },
  generatedPassword: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  footer: {
    flex:1,
    alignItems: 'flex-end',
  },
});

export default PasswordGenerator;
