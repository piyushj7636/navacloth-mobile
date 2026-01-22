// import { RootState } from "@/redux/store";
import React, { useRef, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  // NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  // TextInputKeyPressEventData,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-paper";
// import { useDispatch, useSelector } from "react-redux";
import FB_LOGO from "../../../../assets/profile/facebook-logo.png";
import GOOGLE_LOGO from "../../../../assets/profile/google-logo.png";
// import { setIsSendingOtp } from "@/redux/features/user/signupSlice";
import { useCreateUserMutation, useGetUserQuery, useVerifyOtpMutation } from "@/redux/apiSlice";
import { setIsUserLoggedIn, setUser } from "@/redux/features/user/authSlice";
import { saveTokens } from "@/redux/token";
import { getApp } from "@react-native-firebase/app";
import { getAuth, signInWithPhoneNumber } from '@react-native-firebase/auth';
import { router } from "expo-router";
import { useDispatch } from "react-redux";

const Signup = () => {
  const [step, setStep] = useState("enterPhone");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [confirm, setConfirm] = useState<any>(null);
  const [phone, setPhone] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [verifyOtp] = useVerifyOtpMutation();
  const [createUser] = useCreateUserMutation()
  const { data: userData } = useGetUserQuery()
  const inputs = useRef<(TextInput | null)[]>([]);
  const dispatch = useDispatch()
  const app = getApp();
  const auth = getAuth(app);

  const handleSendOtp = async () => {
    try {    
      const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`;
      await createUser({ phone: formattedPhone }).unwrap();
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone);
      setConfirm(confirmation);
      Alert.alert('OTP Sent', 'Check your phone for the verification code.');
      setStep("enterOtp")
    } catch (error) {
      console.error('OTP send error:', error);
      Alert.alert('Error', 'Failed to send OTP.');
    }
  };

  const handleChange = (text: string, idx: number) => {
    const value = text.replace(/[^0-9]/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    if (value && idx < 5) inputs.current[idx + 1]?.focus();
  };

  const handleKeyPress = (e: any, idx: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const code = otp.join('');
    console.log(code)

    if (!confirm) {
    Alert.alert('Error', 'OTP session expired. Please resend OTP.');
    return;
  }

  if (code.length !== 6 || !/^\d{6}$/.test(code)) {
    Alert.alert('Error', 'Please enter a valid 6-digit OTP.');
    return;
  }

    try {
      await confirm.confirm(code);
      const idToken = await auth.currentUser?.getIdToken(true);
      if (!idToken) {
      Alert.alert('Error', 'Failed to retrieve ID token.');
      return;
    }
      await saveTokens(idToken, '')
      await verifyOtp({ otp, fullName, email, gender, idToken }).unwrap();
      Alert.alert('Success', 'Phone authentication successful!');
      dispatch(setIsUserLoggedIn(true))
      dispatch(setUser(userData))
      router.replace("/(tabs)/profile")
    } catch (error) {
      console.error('Invalid OTP:', error);
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };

  const validatePhone = (text: string) => {
    setPhone(text);
    if (text.length === 10) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  return (
    <View style={[styles.outerContainer]}>
      {step === "enterPhone" && (
        <>
          <View style={styles.container}>
            <Text style={styles.title}>Create an account</Text>
            <Text style={styles.subtitle}>{`Let's create your account.`}</Text>

            {/* Phone Number Field */}
            <View style={styles.inputRow}>
              <Text style={styles.countryCode}>+91</Text>
              <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              placeholderTextColor="#888"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={validatePhone}
            />
            </View>
            
            {/* Terms and Conditions */}
            <Text style={styles.termsText}>
              By signing up you agree to our{" "}
              <Text style={styles.link}>Terms</Text>,{" "}
              <Text style={styles.link}>Privacy Policy</Text>, and{" "}
              <Text style={styles.link}>Cookie Use</Text>
            </Text>

            {/* Disabled Button */}
            <TouchableOpacity
              style={isDisabled ? styles.disabledButton : styles.enabledButton}
              disabled={isDisabled}
              onPress={handleSendOtp}
            >
              <Text
                style={
                  isDisabled
                    ? styles.disabledButtonText
                    : styles.enabledButtonText
                }
              >
                Create an Account
              </Text>
            </TouchableOpacity>

            {/* OR Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.line} />
              <Text style={styles.orText}>Or</Text>
              <View style={styles.line} />
            </View>

            {/* Google Button */}
            <TouchableOpacity style={styles.googleButton}>
              <Image source={GOOGLE_LOGO} style={styles.googleIcon} />
              <Text style={styles.googleText}>Sign Up with Google</Text>
            </TouchableOpacity>

            {/* Facebook Button */}
            <TouchableOpacity style={styles.facebookButton}>
              <Image source={FB_LOGO} style={styles.googleIcon} />
              <Text style={styles.facebookText}>Sign Up with Facebook</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {step === "enterOtp" && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={[
              styles.scrollContainer,
              isInputFocused && { marginBottom: 220 },
            ]}
          >
            <Text style={styles.title}>Just few more details</Text>
            <Text style={styles.subtitle}>
              We need few more details to personalize your experience.
            </Text>

            <View>
              <Text style={[styles.header]}>Full name</Text>
              <TextInput
                style={[styles.inputText]}
                placeholder="ex: Jhon Sharma"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            <View>
              <Text style={[styles.header]}>Phone number</Text>
              <View style={styles.inputRow}>
                <Text style={styles.countryCode}>+91</Text>
                <TextInput
                  style={styles.inputPhone}
                  value={phone}
                  editable={false}
                />
              </View>
            </View>

            <View>
              <Text style={[styles.header]}>Email ID</Text>
              <TextInput
                style={[styles.inputText]}
                placeholder="ex: yourmail@gmail.com"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View>
              <Text style={[styles.header]}>Gender</Text>
              <View style={styles.genderRow}>
                {["Male", "Female", "Other"].map((option) => (
                  <Pressable
                    key={option}
                    style={[
                      styles.genderBtn,
                      gender === option && styles.genderSelected,
                    ]}
                    onPress={() => setGender(option)}
                  >
                    <Text style={styles.genderText}>{option}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View>
              <Text style={[styles.header]}>Enter OTP</Text>
              <View style={styles.otpRow}>
                {otp.map((digit, idx) => (
                  <TextInput
                    key={idx}
                    style={styles.otpInput}
                    maxLength={1}
                    keyboardType="number-pad"
                    value={digit}
                    onChangeText={(text) => handleChange(text, idx)}
                    onKeyPress={(e) => handleKeyPress(e, idx)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                  />
                ))}
              </View>
              <Button textColor="white" style={styles.submitBtn} onPress={handleVerifyOtp}>
                Submit
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

export default Signup;
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 20,
    backgroundColor: "white",
    // justifyContent: "center"
  },
  scrollContainer: {
    flexGrow: 1, // ✅ allows ScrollView to expand & move freely
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#000",
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    marginTop: 4,
    marginBottom: 20,
  },
  header: {
    fontSize: 15,
    color: "#111",
    marginBottom: 10,
    fontWeight: "600",
  },
  input: {
    paddingHorizontal: 5,
    height: 50,
    fontSize: 16,
  },
  termsText: {
    fontSize: 12,
    color: "#666",
    lineHeight: 18,
  },
  link: {
    color: "#000",
    textDecorationLine: "underline",
  },
  disabledButton: {
    backgroundColor: "#ddd",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  enabledButton: {
    backgroundColor: "#111",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  disabledButtonText: {
    color: "#999",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  enabledButtonText: {
    color: "#eee",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  orText: {
    marginHorizontal: 12,
    color: "#666",
    fontSize: 14,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: "center",
    marginBottom: 14,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  facebookIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleText: {
    fontSize: 15,
    color: "#000",
    fontWeight: "500",
  },
  facebookButton: {
    backgroundColor: "#1877F2",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: "center",
    marginBottom: 14,
  },
  facebookText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
    // textAlign: "center",
  },
  inputText: {
    fontSize: 16,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: "#ccc",
    // borderColor: "#ff5555",
    // borderColor: "#2ecc71"
  },
  genderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  genderBtn: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#fff",
    alignItems: "center",
    elevation: 1,
  },
  genderSelected: {
    backgroundColor: "#9eec0cff",
    // borderColor: "#111827",
  },
  genderText: {
    color: "#111",
    fontWeight: "500",
    fontSize: 15,
  },
  genderTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  otpInput: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 22,
    backgroundColor: "#FFFFFF",
    color: "#111",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  errorText: {
    color: "#DC2626",
    fontSize: 13,
    marginBottom: 10,
    textAlign: "center",
  },
  resendText: {
    color: "#6B7280",
    fontSize: 14,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    // paddingVertical: 4,
    backgroundColor: "#FFFFFF",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  countryCode: {
    fontSize: 16,
    marginRight: 10,
    color: "#374151",
  },
  inputPhone: {
    fontSize: 15,
    // marginVertical: -10,
  },
  submitBtn: {
    backgroundColor: "black",
    color: "white",
    fontWeight: "600",
    paddingVertical: 1,
  },
});
