import { NumberNormalizer } from 'rest-resource/dist/helpers/normalization'

import { BaseResource } from './index'
import SportResource from './sport'

export class AwardResource extends BaseResource {
    static endpoint = '/awards'

    static related = {
        sport: {
            to: SportResource,
        },
    }

    static normalization = {
        sport: new NumberNormalizer(),
    }
}

// TODO: Set up related resources from here down
export class BaseballStatisticResource extends BaseResource {
    static endpoint = '/baseballStats'
}

export class EventTypeResource extends BaseResource {
    static endpoint = '/eventTypes'
}

export class GameStatusResource extends BaseResource {
    static endpoint = '/gameStatus'
}

export class GameTypeResource extends BaseResource {
    static endpoint = '/gameTypes'
}

export class HitTrajectoryResource extends BaseResource {
    static endpoint = '/hitTrajectories'
}

export class JobTypeResource extends BaseResource {
    static endpoint = '/jobTypes'
}

export class LanguageResource extends BaseResource {
    static endpoint = '/languages'
}

export class LeagueLeaderTypesResource extends BaseResource {
    static endpoint = '/leagueLeaderTypes'
}

export class LogicalEventResource extends BaseResource {
    static endpoint = '/logicalEvents'
}

export class MetricResource extends BaseResource {
    static endpoint = '/metrics'
}

export class PitchCodeResource extends BaseResource {
    static endpoint = '/pitchCodes'
}

export class PitchTypeResource extends BaseResource {
    static endpoint = '/pitchTypes'
}

export class PlatformResource extends BaseResource {
    static endpoint = '/platforms'
}

export class PositionResource extends BaseResource {
    static endpoint = '/positions'
}

export class ReviewReasonResource extends BaseResource {
    static endpoint = '/reviewReasons'
}

export class RosterTypeResource extends BaseResource {
    static endpoint = '/rosterTypes'
}

export class ScheduleEventTypeResource extends BaseResource {
    static endpoint = '/scheduleEventTypes'
}

export class SituationCodeResource extends BaseResource {
    static endpoint = '/situationCodes'
}

export class SkyResource extends BaseResource {
    static endpoint = '/sky'
}

export class StandingsTypeResource extends BaseResource {
    static endpoint = '/standingsTypes'
}

export class StatisticGroupResource extends BaseResource {
    static endpoint = '/statGroups'
}

export class StaticTypeResource extends BaseResource {
    static endpoint = '/statType'
}

export class WindDirectionResource extends BaseResource {
    static endpoint = '/windDirection'
}
