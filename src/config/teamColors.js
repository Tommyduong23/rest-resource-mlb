const colors = {
    108: [
        '#BA0021',
        '#FFFFFF'
    ],
    109: [
        '#E3D4AD',
        '#000000'
    ],
    110: [
        '#DF4601',
        '#000000'
    ],
    111: [
        '#BD3039',
        '#FFFFFF'
    ],
    112: [
        '#0E3386',
        '#FFFFFF'
    ],
    113: [
        '#C6011F',
        '#000000'
    ],
    114: [
        '#E31937',
        '#FFFFFF'
    ],
    115: [
        '#333366',
        '#C4CED4'
    ],
    116: [
        '#0C2C56',
        '#FFFFFF'
    ],
    117: [
        '#002D62',
        '#FFFFFF'
    ],
    118: [
        '#004687',
        '#FFFFFF'
    ],
    119: [
        '#005A9C',
        '#FFFFFF'
    ],
    120: [
        '#AB0003',
        '#FFFFFF'
    ],
    121: [
        '#002D72',
        '#FF5910'
    ],
    133: [
        '#003831',
        '#EFB21E'
    ],
    134: [
        '#FDB827',
        '#000000'
    ],
    135: [
        '#002D62',
        '#FEC325'
    ],
    136: [
        '#0C2C56',
        '#C4CED4'
    ],
    137: [
        '#FD5A1E',
        '#000000'
    ],
    138: [
        '#C41E3A',
        '#FFFFFF'
    ],
    139: [
        '#092C5C',
        '#8FBCE6'
    ],
    140: [
        '#C0111F',
        '#FFFFFF'
    ],
    141: [
        '#134A8E',
        '#FFFFFF'
    ],
    142: [
        '#002B5C',
        '#FFFFFF'
    ],
    143: [
        '#E81828',
        '#FFFFFF'
    ],
    144: [
        '#13274F',
        '#FFFFFF'
    ],
    145: [
        '#000000',
        '#C4CED4'
    ],
    146: [
        '#0077C8',
        '#000000'
    ],
    147: [
        '#132448',
        '#FFFFFF'
    ],
    158: [
        '#0A2351',
        '#ffc42f'
    ],
}

export function getTeamColors(id) {
    // Clean this up later, maybe using a reduce?
    let result = colors[id]
    let resultInvalid = !result || result.length < 2 || !result[0] || !result[1] || result[0] == null || result[1] == null

    return resultInvalid ? ['white', 'black'] : result
}
