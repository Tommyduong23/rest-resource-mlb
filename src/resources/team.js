import { NumberNormalizer } from 'rest-resource/dist/helpers/normalization'

import { BaseResource } from './index'
import DivisionResource from './division'
import LeagueResource from './league'
import SportResource from './sport'
import VenueResource from './venue'

export default class TeamResource extends BaseResource {
    static endpoint = '/teams'

    static related = {
        division: {
            to: DivisionResource,
        },
        league: {
            to: LeagueResource,
        },
        sport: {
            to: SportResource,
        },
        sprintLeague: {
            to: LeagueResource,
        },
        springVenue: {
            to: VenueResource,
        },
        venue: {
            to: VenueResource,
        },
    }

    static normalization = {
        division: new NumberNormalizer(),
        league: new NumberNormalizer(),
        sport: new NumberNormalizer(),
        springLeague: new NumberNormalizer(),
        springVenue: new NumberNormalizer(),
        venue: new NumberNormalizer(),
    }
}
