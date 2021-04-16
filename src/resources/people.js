import { NumberNormalizer } from 'rest-resource/dist/helpers/normalization'

import { BaseResource } from './index'
import { PositionResource } from './meta'

export default class PeopleResource extends BaseResource {
    static endpoint = '/people'

    static related = {
        primaryPosition: {
            to: PositionResource,
        },
    }

    static normalization = {
        primaryPosition: new NumberNormalizer({ uniqueKey: 'code' }),
    }
}
