import { BaseResource } from './index'
import LeagueResource from './league'

import { NumberNormalizer } from 'rest-resource/dist/helpers/normalization'

export default class TeamResource extends BaseResource {
    static endpoint = '/teams'

    static related = {
        league: {
            to: LeagueResource,
            nested: true
        }
    }

    static normalization = {
        league: new NumberNormalizer(),
    }
}