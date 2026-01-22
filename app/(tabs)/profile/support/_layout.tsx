import { Stack } from 'expo-router';

export default function SupportLayout() {
  return (
    <Stack>
			<Stack.Screen name="feedback" options={{headerTitle: "Feedback", headerShown: true}} />
			<Stack.Screen name="help" options={{headerTitle: "", headerShown: true}} />
		</Stack>
  );
}