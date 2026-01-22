import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { SafeAreaView } from 'react-native-safe-area-context';

const addressTypes = ['Home', 'Office', 'Other'];

const AddressFormSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  mobile: Yup.string().required('Required'),
  pinCode: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  street: Yup.string().required('Required'),
  locality: Yup.string().required('Required'),
  landmark: Yup.string(),
});

export default function AddressForm() {
  const [selectedType, setSelectedType] = useState('Home');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            mobile: '',
            pinCode: '',
            city: '',
            state: '',
            street: '',
            locality: '',
            landmark: '',
          }}
          validationSchema={AddressFormSchema}
          onSubmit={(values) => {
            console.log({ ...values, addressType: selectedType });
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <Text style={styles.label}>Country *</Text>
              <Text style={styles.static}>India</Text>

              <Text style={styles.label}>First Name *</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                value={values.firstName}
              />
              {touched.firstName && errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}

              <Text style={styles.label}>Last Name *</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                value={values.lastName}
              />
              {touched.lastName && errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}

              <Text style={styles.label}>Mobile Number *</Text>
              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                onChangeText={handleChange('mobile')}
                onBlur={handleBlur('mobile')}
                value={values.mobile}
              />
              {touched.mobile && errors.mobile && <Text style={styles.error}>{errors.mobile}</Text>}

              <Text style={styles.label}>PIN Code *</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={handleChange('pinCode')}
                onBlur={handleBlur('pinCode')}
                value={values.pinCode}
              />
              {touched.pinCode && errors.pinCode && <Text style={styles.error}>{errors.pinCode}</Text>}

              <Text style={styles.label}>City *</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('city')}
                onBlur={handleBlur('city')}
                value={values.city}
              />
              {touched.city && errors.city && <Text style={styles.error}>{errors.city}</Text>}

              <Text style={styles.label}>State *</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('state')}
                onBlur={handleBlur('state')}
                value={values.state}
              />
              {touched.state && errors.state && <Text style={styles.error}>{errors.state}</Text>}

              <Text style={styles.label}>Flat no/Building, Street name *</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('street')}
                onBlur={handleBlur('street')}
                value={values.street}
              />
              {touched.street && errors.street && <Text style={styles.error}>{errors.street}</Text>}

              <Text style={styles.label}>Area/Locality *</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('locality')}
                onBlur={handleBlur('locality')}
                value={values.locality}
              />
              {touched.locality && errors.locality && <Text style={styles.error}>{errors.locality}</Text>}

              <Text style={styles.label}>Landmark</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('landmark')}
                onBlur={handleBlur('landmark')}
                value={values.landmark}
              />

              {/* Address Type Buttons */}
              <View style={styles.typeRow}>
                {addressTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.typeBtn,
                      selectedType === type && styles.typeBtnSelected,
                    ]}
                    onPress={() => setSelectedType(type)}
                  >
                    <Text
                      style={[
                        styles.typeText,
                        selectedType === type && styles.typeTextSelected,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Submit */}
              <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit}>
                <Text style={styles.saveText}>SAVE ADDRESS</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
  },
  static: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 4,
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
  },
  typeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  typeBtn: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  typeBtnSelected: {
    backgroundColor: '#f7c948',
    borderColor: '#f7c948',
  },
  typeText: {
    fontSize: 14,
    color: '#333',
  },
  typeTextSelected: {
    fontWeight: '700',
    color: '#000',
  },
  saveBtn: {
    backgroundColor: '#f7c948',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 40,
  },
  saveText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});