/**
 * @class GeoCodr
 */

export class GeoCodr {
  /**
   * @constructor
   */
  constructor() {
    this.settings = {
      url: '/query?',
      params: {
        query: '',
        key: '',
        limit: 25,
        type: 'search',
        class: 'address',
        shape: 'centroid'
      }
    };
  }

  getParameters(options) {
    return {
      url: this.settings.url,
      params: {
        query: options.query,
        key: options.key,
        type: options.search || this.settings.params.type,
        class: options.class || this.settings.params.class,
        shape: options.shape || this.settings.params.shape,
        limit: options.limit || this.settings.params.limit
      }
    };
  }

  handleResponse(results) {
    return results.map(result => ({
      lon: result.geometry.coordinates[0],
      lat: result.geometry.coordinates[1],
      address: {
        name: result.properties._title_
      }
    }));
  }
}
