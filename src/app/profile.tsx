import {Image, Pressable, ScrollView, Text, View} from "react-native";
import SkillCard from "@/component/SkillCard";
import InfoCard from "@/component/InfoCard";
import ProjectCard from "@/component/ProjectCard";
import {iProject, iSkill, iTeam, iUser} from "@/types/type.42";
import SmallText from "@/component/SmallText";
import {useEffect, useState} from "react";
import {Entypo} from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";
import {useUserProject, useUserSkills} from "@/lib/api.42.user";
import {Route} from "expo-router/build/ui";
import ErrorText from "@/component/ErrorText";

export default function ProfileScreen({route}: {route: Route}) {
    const {showActionSheetWithOptions} = useActionSheet();
    // @ts-ignore
    const {users} = route.params;
    const user: iUser = users[0];
    const {data: skills, error: errorSkills} = useUserSkills(user.id);
    const {data: projects, error: errorProjects} = useUserProject(user.id);
    const [cursus, setCursus] = useState<number | undefined>();
    const [errorMsgSkills, setErrorSkills] = useState("");
    const [errorMsgProjects, setErrorProjects] = useState("");

    useEffect(() => {
        if (errorSkills)
            setErrorSkills(String(errorSkills));
        else
            setErrorSkills("");
    }, [errorSkills]);

    useEffect(() => {
        if (errorProjects)
            setErrorProjects(String(errorProjects));
        else
            setErrorProjects("");
    }, [errorProjects]);

    useEffect(() => {
        if (cursus === undefined && skills && skills.length > 0)
            setCursus(skills.findIndex(s => s.cursus.name === "42cursus") ?? 0);
    }, [skills]);

    const openSelect = () => {
        if (skills) {
            const options = skills.map(s => s.cursus.name);
            const destructiveButtonIndex = skills.length;
            options.push("Cancel");

            showActionSheetWithOptions({options, destructiveButtonIndex},
                (selectedIndex) => {
                    if (selectedIndex !== undefined && selectedIndex !== destructiveButtonIndex)
                        setCursus(selectedIndex);
                }
            );
        }

    };

    return (<ScrollView className="flex-1 p-5 mb-6">
        <View className="flex flex-row items-center mb-5 gap-4">
            <Image source={{uri: user.image?.link}} className="w-32 h-32 rounded-3xl bg-gray-300"/>
            <View className="flex-1 content-around my-2">
                <ScrollView horizontal={true}>
                    <Text className="flex-1 text-gray-900 text-3xl font-bold">{user.usual_full_name}</Text>
                </ScrollView>
                <Text className="text-gray-500 text-xl font-semibold mb-3">@{user.login}</Text>
                {
                    skills && cursus !== undefined &&
                    <Pressable onPress={openSelect} className="self-start flex-row gap-1 rounded-full bg-gray-300 px-3 py-2 items-center">
                        <Text className="max-w-[70%] text-gray-500 font-semibold text-xs" numberOfLines={1} ellipsizeMode="tail">{skills[cursus].cursus.name}</Text>
                        <Entypo name="chevron-down" size={15} color="#6b7280"/>
                    </Pressable>
                }
            </View>
        </View>
        <View className="gap-4 mb-6">
            <InfoCard title="Email" value={user.email}/>
            <InfoCard title="Wallet" value={`${user.wallet}₳`}/>
            <InfoCard title="Location" value={user.location}/>
            {skills && cursus !== undefined && <InfoCard title="Level" value={skills[cursus].level}/>}
        </View>

        <Section name="Skills" errorMsg={errorMsgSkills} items={cursus !== undefined && skills !== undefined ? skills[cursus].skills : undefined} />
        <Section name="Projects" errorMsg={errorMsgProjects} items={projects}/>
        <View className="h-12"/>
    </ScrollView>)
}

function Section({name, items, errorMsg}: {name: "Projects" | "Skills", items?: iSkill[] | iProject[], errorMsg: string}) {
    const isProject = name === "Projects";
    const [viewSec, setViewSec] = useState(true);
    const [expend, setExpend] = useState(false);
    const empty = isProject ? "No project start yet" : "No skill on this cursus";
    const Componant = isProject ? ProjectCard : SkillCard;

    const getNewestTeam = (t: iTeam[]) => {
        let ret = null;
        for (let i = 0; i < t.length; i++) {
            const val = new Date(t[i].updated_at).getTime();
            if (ret === null || val - ret > 0)
                ret = val;
        }
        return ret;
    }

    if (isProject && items)
        // @ts-ignore
        items = items.sort((a: iProject, b: iProject) => getNewestTeam(a.teams) - getNewestTeam(b.updated_at))

    return (<>
        <Pressable onPress={() => setViewSec(!viewSec)} className="flex-row items-center gap-1 my-5">
            <Text className="text-gray-900 text-2xl font-bold">{name}</Text>
            {
                items && items.length > 5 &&
                <Entypo name={viewSec ? "chevron-down" : "chevron-right"} size={26} color="#111827"/>
            }
        </Pressable>
        <ErrorText>{errorMsg}</ErrorText>
        {
            !errorMsg && viewSec && (items && items.length > 0 ?
                items.slice(0, expend ? undefined : 5).map((p, idx) =>
                    // @ts-ignore
                    <Componant key={idx} item={p}/>) :
                <SmallText>{empty}</SmallText>)
        }
        {
            viewSec && items && items.length > 5 &&
            <Pressable onPress={() => setExpend(!expend)}>
                <Text className="text-xs text-center text-gray-900 font-semibold">{expend ? "Less" : "More"}</Text>
            </Pressable>
        }
    </>)
}
