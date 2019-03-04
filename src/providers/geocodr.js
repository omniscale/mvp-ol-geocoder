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
        offset: 0,
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
        limit: options.limit || this.settings.params.limit,
        offset: options.offset || this.settings.params.offset
      }
    };
  }

  handlePagingResponse(res) {
    const total = res.features_total;
    const returned = res.features_returned;
    const offset = res.features_offset;
    return { 'total': total, 'offset': offset, 'returned': returned };
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
