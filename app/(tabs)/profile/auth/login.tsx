import React, { useEffect, useState } from "react";
import {
  Image,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { Button } from "react-native-paper";
import GOOGLE_LOGO from "../../../../assets/profile/google-logo.png";
import FB_LOGO from "../../../../assets/profile/facebook-logo.png";

const Login = () => {
    const [step, setStep] = useState("enterPhone");
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [timer, setTimer] = useState(30);
    const [phone, setPhone] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const [isInputFocused, setIsInputFocused] = useState(false)
  
    useEffect(() => {
      if (timer > 0) {
        const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        return () => clearInterval(interval);
      }
    }, [timer]);
  
    const handleOtpChange = (value: string, index: number) => {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
    };
  
    const validatePhone = (text: string) => {
      setPhone(text);
      if (text.length === 10) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };
  
    const handleSendOtp = () => {
      setStep("enterOtp");
    };

  return (
    <View style={[styles.outerContainer]}>
      {step === "enterPhone" && (
        <>
          <View style={styles.container}>
            <Text style={styles.title}>Login to your account</Text>
            <Text style={styles.subtitle}>{`It's great to see you again.`}</Text>

            {/* Phone Number Field */}
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              placeholderTextColor="#888"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={validatePhone}
            />

            {/* Forgot password */}
            <Text style={styles.termsText}>
              Forgot Password?
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
                Login
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
              <Text style={styles.googleText}>Sign In with Google</Text>
            </TouchableOpacity>

            {/* Facebook Button */}
            <TouchableOpacity style={styles.facebookButton}>
              <Image source={FB_LOGO} style={styles.googleIcon} />
              <Text style={styles.facebookText}>Sign In with Facebook</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {step === "enterOtp" && (
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={[styles.scrollContainer, isInputFocused && { marginBottom: 220 },]}
          >
            <Text style={styles.title}>Welcome back!! </Text>
            <Text style={styles.subtitle}>
              An OTP is sent to your phone. Please enter it below.
            </Text>

            <View>
              <Text style={[styles.header]}>Enter OTP</Text>
              <View style={styles.otpRow}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    style={styles.otpInput}
                    maxLength={1}
                    keyboardType="number-pad"
                    value={digit}
                    onChangeText={(val) => handleOtpChange(val, index)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                  />
                ))}
              </View>
              <Button textColor="white" style={styles.submitBtn}>
                Submit
              </Button>
            </View>
          </ScrollView>
      )}
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     justifyContent: "center",
//   },
//   heading: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 16,
//     textAlign: "center",
//   },
//   inputRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     marginBottom: 20,
//   },
//   countryCode: {
//     fontSize: 16,
//     marginRight: 8,
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//   },
//   continueBtn: {
//     backgroundColor: "#222",
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 24,
//     elevation: 2,
//   },
//   continueText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
// });

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
    flexGrow: 1,               // ✅ allows ScrollView to expand & move freely
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
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 16,
    marginBottom: 18,
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
  submitBtn : {
    backgroundColor: "black",
    color: "white",
    fontWeight: "600",
    paddingVertical: 1
  }
});

export default Login;

