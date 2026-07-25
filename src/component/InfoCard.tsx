import {Text, View} from "react-native";

export default function InfoCard({title, value}: any) {
    return (<View className="bg-slate-900 rounded-2xl p-4">
        <Text className="text-slate-400">{title}</Text>
        <Text className="text-white text-lg font-semibold">{value}</Text>
    </View>)
}
