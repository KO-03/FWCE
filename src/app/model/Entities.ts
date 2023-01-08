import { Team } from './country';

export interface CountryEntity {
    countrySportLabel: {
        value: String
    },
    countryCoord:  {
        value: String
    },
    groupNameLabel:  {
        value: String
    },
    flag:  {
        value: String
    },
    countryCodeLabel: {
        value: String
    },
    teamNameLabel?: {
        value: String
    }
}


export interface WorldCupEditionEntity {
    worldCupEditionLabel: {
        value: String
    },
    worldCupEdition?: {
        value: String
    }
}


export interface WorldCupDetailEntity {
    logo: {
        value: String
    },
    countryLabel: {
        value: String
    },
    startTime: {
        value: String
    },
    endTime: {
        value: String
    },
    cost: {
        value: String
    },
    nbParticipants: {
        value: String
    },
    winnerLabel: {
        value: String
    },
    attendanceLabel: {
        value: String
    },
    nbMatchs: {
        value: String
    },
    nbGoals: {
        value: String
    }
}


export interface TeamEntity {
    countryCodeLabel: {
        value: String
    },
    teamNameLabel?: {
        value: String
    }
}