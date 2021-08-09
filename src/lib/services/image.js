/**
 * @module Imange service
 * @description api call to upload images
 */

import {HOST} from '../config';

const {baseURL, port} = HOST;

export default {
  uploadImage: async ({name, nric, plan, image}) => {
    const formdata = new FormData();
    formdata.append('image', {...image, name: image.fileName});
    formdata.append('name', name);
    formdata.append('nric', nric);
    formdata.append('plan', plan);

    console.log('api', `${baseURL}:${port}/api/upload`);

    return await fetch(`${baseURL}:${port}/api/upload`, {
      method: 'post',
      body: formdata,
    });
  },
};
