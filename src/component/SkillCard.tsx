import {View,Text} from "react-native";

export default function SkillCard({name, level}: any){

    return (<View className="bg-slate-900 rounded-2xl p-4 mb-3">
        <View className="flex-row justify-between">
            <Text className="text-white">{name}</Text>
            <Text className="text-indigo-400">{level}%</Text>
        </View>
        <View className="bg-slate-700 h-3 rounded-full mt-3">
            <View
                style={{
                    width:`${level}%`
                }}
                className="bg-indigo-500 h-3 rounded-full"/>
        </View>
    </View>)
}
