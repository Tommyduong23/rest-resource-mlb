export const colors = {
    'default': {
        primary: 'white',
        secondary: 'black',
    },
    108: {
        primary: '#BA0021',
        secondary: '#FFFFFF',
    },
    109: {
        primary: '#E3D4AD',
        secondary: '#000000',
    },
    110: {
        primary: '#DF4601',
        secondary: '#000000',
    },
    111: {
        primary: '#BD3039',
        secondary: '#FFFFFF',
    },
    112: {
        primary: '#0E3386',
        secondary: '#FFFFFF',
    },
    113: {
        primary: '#C6011F',
        secondary: '#000000',
    },
    114: {
        primary: '#E31937',
        secondary: '#FFFFFF',
    },
    115: {
        primary: '#333366',
        secondary: '#C4CED4',
    },
    116: {
        primary: '#0C2C56',
        secondary: '#FFFFFF',
    },
    117: {
        primary: '#002D62',
        secondary: '#FFFFFF',
    },
    118: {
        primary: '#004687',
        secondary: '#FFFFFF',
    },
    119: {
        primary: '#005A9C',
        secondary: '#FFFFFF',
    },
    120: {
        primary: '#AB0003',
        secondary: '#FFFFFF',
    },
    121: {
        primary: '#002D72',
        secondary: '#FF5910',
    },
    133: {
        primary: '#003831',
        secondary: '#EFB21E',
    },
    134: {
        primary: '#FDB827',
        secondary: '#000000',
    },
    135: {
        primary: '#002D62',
        secondary: '#FEC325',
    },
    136: {
        primary: '#0C2C56',
        secondary: '#C4CED4',
    },
    137: {
        primary: '#FD5A1E',
        secondary: '#000000',
    },
    138: {
        primary: '#C41E3A',
        secondary: '#FFFFFF',
    },
    139: {
        primary: '#092C5C',
        secondary: '#8FBCE6',
    },
    140: {
        primary: '#C0111F',
        secondary: '#FFFFFF',
    },
    141: {
        primary: '#134A8E',
        secondary: '#FFFFFF',
    },
    142: {
        primary: '#002B5C',
        secondary: '#FFFFFF',
    },
    143: {
        primary: '#E81828',
        secondary: '#FFFFFF',
    },
    144: {
        primary: '#13274F',
        secondary: '#FFFFFF',
    },
    145: {
        primary: '#000000',
        secondary: '#C4CED4',
    },
    146: {
        primary: '#0077C8',
        secondary: '#000000',
    },
    147: {
        primary: '#132448',
        secondary: '#FFFFFF',
    },
    158: {
        primary: '#0A2351',
        secondary: '#ffc42f',
    },
}

export function getTeamColors(id) {
    return colors[id] || colors['default']
}
