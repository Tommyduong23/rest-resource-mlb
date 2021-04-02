import { NumberNormalizer } from 'rest-resource/dist/helpers/normalization'

import { BaseResource } from './index'
import LeagueResource from './league'
import SportResource from './sport'
import VenueResource from './venue'

export default class TeamResource extends BaseResource {
    static endpoint = '/teams'

    static related = {
        league: {
            to: LeagueResource,
            nested: true, 
        },
        sport: {
            to: SportResource,
            nested: true,
        },
        venue: {
            to: VenueResource,
            nested: true,
        }
    }

    static normalization = {
        league: new NumberNormalizer(),
        sport: new NumberNormalizer(),
        venue: new NumberNormalizer(),
    }
}