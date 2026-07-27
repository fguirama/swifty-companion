import {Text, View} from "react-native";

export default function InfoCard({title, value}: any) {
    const isLoc = title === "Location";
    return (<View className="bg-gray-300 rounded-2xl p-4">
        <View className="flex flex-row items-center gap-2">
            {isLoc && <View className={"h-3 w-3 rounded-full " + (value === null ? "bg-red-500" : "bg-green-500")} />}
            <Text className="text-gray-500">{title}</Text>
        </View>
        <Text className="text-gray-900 text-lg font-semibold">{value === null && isLoc ? "Unavailable" : value}</Text>
    </View>)
}
