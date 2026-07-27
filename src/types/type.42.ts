export interface iAuthToken {
    access_token: string
    token_type: "bearer"
    expires_in: number
    scope: "public"
    created_at: number
    secret_valid_until: number
}

export interface iUser {
    id: number
    email: string
    login: string
    first_name: string
    last_name: string
    usual_full_name: string
    usual_first_name: string
    url: string
    phone: string
    displayname: string
    kind: string
    image: {
        link: string
        versions:
            {
                large: string
                medium: string
                small: string
                micro: string
            }
    }
    "staff?": boolean
    correction_point: number
    pool_month: string
    pool_year: string
    location: string
    wallet: number
    anonymize_date: string
    data_erasure_date: string
    created_at: string
    updated_at: string
    "alumnized_at?": string
    "alumni?": boolean
    "active?": boolean
}

export type tStatus = "finished" | "in_progress" | "creating_group" | "waiting_for_correction";

interface iProjectUser {
    id: number
    login: string
    url: string
    leader: boolean
    occurrence: number
    validated: boolean
    projects_user_id: number
}

export interface iTeam {
    id: number
    name: string
    url: string
    final_mark: number
    project_id: number
    created_at: string
    updated_at: string
    status: tStatus
    terminating_at: string
    users: iProjectUser[]
    "locked?": boolean
    "validated?": boolean
    "closed?": boolean
    repo_url: string
    repo_uuid: string
    locked_at: string
    closed_at: string
    project_session_id: number
    project_gitlab_path: string
}

export interface iProject {
    id: number
    occurrence: number
    final_mark: number
    status: tStatus
    "validated?": boolean
    current_team_id: number
    project:
        {
            id: number
            name: string
            slug: string
            parent_id?: number
        }
    cursus_ids: [number]
    marked_at: string
    marked: boolean
    retriable_at: string
    created_at: string
    updated_at: string
    user: iUser
    teams: iTeam[]
}

export interface iSkill {
    id: number
    name: string
    level: number
}

export interface iSkills {
    id: number
    begin_at: string
    end_at: string
    grade?: string
    level: number
    skills: iSkill[]
    cursus_id: number
    has_coalition: boolean
    blackholed_at?: string
    created_at: string
    updated_at: string
    user: iUser
    cursus: {
        id: number
        created_at: string
        name: string
        slug: string
        kind: string
    }
}
