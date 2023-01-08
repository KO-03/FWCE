export interface Country {
    name: String,
    code?: String,
    coord?: String,
    group?: String,
    flagUrl?: String,
    team?: Team
}

export interface WorldCupEdition {
    editionName: String,
    // year?: String,
    // country?: String,
    wikidataId?: String
}

export interface WorldCupDetail {
    logo: String,
    countryName: String,
    startTime: String,
    endTime: String,
    cost: number,
    nbParticipants: String,
    winner: String,
    attendance: number,
    nbMatchs: String,
    nbGoals: String
}

export interface Team {
    teamName: String
}

export interface GroupData {
    name: String,
    data: [{id: String}]
}

export interface idVal {
    id: String
}