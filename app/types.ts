export interface Root {
    status: string
    source: Source
    collaborators: Collaborator2[]
    relays: Relay2[]
    current_track: CurrentTrack
    history: History[]
    logo_url: string
    streaming_hostname: string
    outputs: Output[]
}

export interface Source {
    type: string
    collaborator: Collaborator
    relay: Relay
}

export interface Collaborator {
    id: string
    name: string
    status: string
}

export interface Relay {
    id: number
    url: string
    status: string
}

export interface Collaborator2 {
    id: string
    name: string
    status: string
}

export interface Relay2 {
    id: number
    url: string
    status: string
}

export interface CurrentTrack {
    title: string
    start_time: string
    artwork_url: string
    artwork_url_large: string
}

export interface History {
    title: string
}

export interface Output {
    name: string
    format: string
    bitrate: number
}