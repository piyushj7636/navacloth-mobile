import {
  useProfileImageSignedUrlMutation,
  useUpdateProfileMutation,
} from "@/redux/apiSlice";
import { setUser } from "@/redux/features/user/authSlice";
import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch, useSelector } from "react-redux";

const EditProfileScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const [profileImageSignedUrl] = useProfileImageSignedUrlMutation();
  const [updateProfile] = useUpdateProfileMutation();

  const profileData = useSelector(
    (state: RootState) => state.auth.auth.user
  );
	console.log("Profile data: ", profileData)

  /* ---------- MIME TYPE ---------- */
  const getMimeType = (path: string | null) => {
    if (!path) return "image/jpeg";
    if (path.endsWith(".png")) return "image/png";
    if (path.endsWith(".jpg") || path.endsWith(".jpeg"))
      return "image/jpeg";
    return "application/octet-stream";
  };

  /* ---------- Pick Image ---------- */
  const pickImage = () => {
    Alert.alert("Select Photo", "Choose option", [
      { text: "Camera", onPress: openCamera },
      { text: "Gallery", onPress: openGallery },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const openGallery = async () => {
    try {
      const img = await ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
        cropperCircleOverlay: true,
        compressImageQuality: 0.7,
        mediaType: "photo",
      });

      setImage(img.path);
    } catch (err: any) {
      if (err?.code !== "E_PICKER_CANCELLED") console.log(err);
    }
  };

  const openCamera = async () => {
    try {
      const img = await ImagePicker.openCamera({
        width: 400,
        height: 400,
        cropping: true,
        cropperCircleOverlay: true,
      });

      setImage(img.path);
    } catch (err: any) {
      if (err?.code !== "E_PICKER_CANCELLED") console.log(err);
    }
  };

  /* ---------- Validation ---------- */
  const validate = () => {
    if (!profileData?.name?.trim()) return "Name required";
    if (!profileData?.email?.includes("@")) return "Invalid email";
    if (!profileData?.phone || profileData.phone.length < 10)
      return "Invalid phone";
    return null;
  };

  /* ---------- Upload To S3 ---------- */
  const uploadToS3 = async (uploadUrl: string, filePath: string) => {
    const res = await fetch(filePath);
    const blob = await res.blob();

    await fetch(uploadUrl, {
      method: "PUT",
      body: blob,
      headers: {
        "Content-Type": blob.type || "image/jpeg",
      },
    });
  };

  /* ---------- Save ---------- */
  const handleSave = async () => {
    const error = validate();
    if (error) return Alert.alert("Error", error);

    try {
      setLoading(true);

      let fileUrl: string | undefined;

      /* STEP 1 — upload image if selected */
      if (image) {
        const fileType = getMimeType(image);

        const { data } = await profileImageSignedUrl({
          userId: profileData.user_id,
          fileType,
        });

				console.log("Initial call data: ", data)

        if (data?.uploadUrl && data?.fileUrl) {
					console.log("Image Url: ", fileUrl)
          await uploadToS3(data.uploadUrl, image);
          fileUrl = data.fileUrl;
        }
      }
			console.log("Image Url: ", fileUrl)

      /* STEP 2 — update profile */
      await updateProfile({
        userId: profileData.user_id,
        name: profileData.name,
        imageUrl: fileUrl,
      }).unwrap();

      Alert.alert("Success", "Profile updated");
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Update failed");
    } finally {
      setLoading(false);
    }
  };

	// useEffect(() => {
	// 		if (profileData) {
	// 			dispatch(setUser(profileData));
	// 		}
	// 	}, [profileData]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Avatar */}
      <TouchableOpacity style={styles.avatarWrap} onPress={pickImage}>
        <Image
          source={{
            uri:
              image ||
              profileData?.image_url ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          }}
          style={styles.avatar}
        />
        <Text style={styles.changePhoto}>Change Photo</Text>
      </TouchableOpacity>

      {/* Inputs */}
      <Input
        label="Name"
        value={profileData?.name || ""}
        onChangeText={(text: string) =>
          dispatch(setUser({ ...profileData, name: text }))
        }
      />

      <Input
        label="Email"
        value={profileData?.email || ""}
        onChangeText={(text: string) =>
          dispatch(setUser({ ...profileData, email: text }))
        }
      />

      <Input
        label="Phone"
        value={profileData?.phone || ""}
        keyboardType="numeric"
        onChangeText={(text: string) =>
          dispatch(setUser({ ...profileData, phone: text }))
        }
      />

      {/* Save */}
      <TouchableOpacity style={styles.btn} onPress={handleSave}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Save Changes</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

/* ---------- Reusable Input ---------- */
const Input = ({
  label,
  ...props
}: {
  label: string;
  [key: string]: any;
}) => (
  <View style={{ marginBottom: 18 }}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.input} {...props} />
  </View>
);

export default EditProfileScreen;

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  avatarWrap: {
    alignItems: "center",
    marginBottom: 30,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },

  changePhoto: {
    color: "#007BFF",
    fontWeight: "600",
  },

  label: {
    marginBottom: 6,
    color: "#444",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },

  btn: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});