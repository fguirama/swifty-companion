import {Image, ScrollView, Text, Pressable, View} from "react-native";
import SkillCard from "@/component/SkillCard";
import InfoCard from "@/component/InfoCard";
import ProjectCard from "@/component/ProjectCard";

export default function ProfileScreen({route, navigation}: any) {
    const {user} = route.params;
    console.log("user TEST", user);

    return (<ScrollView className="flex-1 bg-slate-950 px-5">
            <Pressable onPress={() => navigation.goBack()} className="mt-12 mb-5">
                <Text className="text-indigo-400 text-lg">← Back</Text>
            </Pressable>
            <View className="items-cente mb-8">
                <Image
                    source={{uri: user.image?.link}}
                    className="w-32 h-32 rounded-full"/>
                <Text className="text-white text-3xl font-bold mt-4">{user.usual_full_name}</Text>
                <Text className="text-slate-400 text-lg">@{user.login}</Text>
            </View>
            <View className="gap-4">
                <InfoCard title="Email" value={user.email}/>
                <InfoCard title="Phone" value={user.phone}/>
                <InfoCard title="Wallet" value={`${user.wallet}₳`}/>
                <InfoCard title="Location" value={user.location}/>
                <InfoCard title="Level" value="7"/>
            </View>

            <Text className="text-white text-2xl font-bold mt-10 mb-5">Skills</Text>
            <SkillCard name="C" level={85}/>
            <SkillCard name="React" level={70}/>
            <SkillCard name="Docker" level={60}/>

            <Text className="text-white text-2xl font-bold mt-10 mb-5">Projects</Text>
            <ProjectCard name="ft_printf" status="success"/>
            <ProjectCard name="cub3d" status="success"/>
            <ProjectCard name="minishell" status="failed"/>
    </ScrollView>)
}
