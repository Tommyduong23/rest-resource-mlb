import { NumberNormalizer } from 'rest-resource/dist/helpers/normalization'

import { BaseResource } from './index'
import SportResource from './sport'
import TeamResource from './team'

export default class PlayerResource extends BaseResource {
    static endpoint = '/sports/1/players'

    static related = {
        sport: {
            to: SportResource,
        },
        primaryTeam: {
            to: TeamResource,
        }
    }

    static normalization = {
        sport: new NumberNormalizer(),
        primaryTeam: new NumberNormalizer(),
    }
}
