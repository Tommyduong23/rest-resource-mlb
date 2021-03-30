import Resource from 'rest-resource'
import { DefaultClient } from 'rest-resource/dist/client'

export class MLBClient extends DefaultClient {
    negotiateContent(ResourceClass) {
        return (response) => {
            let objects = []
            if(Array.isArray(response.data)) {
                response.data.forEach((attributes) => objects.push(new ResourceClass(attributes)))
            }
            else if(typeof response.data === 'object' && response.data !== null) {
                let dataKey = Object.keys(response.data).filter(item => item.toLowerCase() !== 'copyright')[0]
                response.data[dataKey].forEach((attributes) => objects.push(new ResourceClass(attributes)))
            } else {
                objects.push(new ResourceClass(response.data))
            }

            return {
                response,
                resources: objects,
                count: () => response.headers['Pagination-Count'],
                pages: () => Math.ceil(response.headers['Pagination-Count'] / response.headers['Pagination-Limit']),
                currentPage: () => response.headers['Pagination-Page'],
                perPage: () => response.headers['Pagination-Limit'],
            }
        }
    }
}

export class BaseResource extends Resource {
    static client = new MLBClient('https://statsapi.mlb.com/api/v1' )
}
