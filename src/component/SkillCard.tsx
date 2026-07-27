import {View,Text} from "react-native";
import {iSkill} from "@/types/type.42";

export default function SkillCard({item}: {item: iSkill}){
    const level = Math.round(item.level);

    return (<View className="bg-gray-300 rounded-2xl p-4 mb-4">
        <View className="flex-row justify-between">
            <Text className="text-gray-900">{item.name}</Text>
            <Text className="text-gray-900 font-bold">{level}</Text>
        </View>
        <View className="bg-gray-500 h-3 rounded-full mt-3">
            <View
                style={{
                    width:`${level * 4}%`
                }}
                className="bg-gray-900 h-3 rounded-full"/>
        </View>
    </View>)
}
