import axios from 'axios';
import Config from 'react-native-config';

const getAddress = async (lat, lng) => {
  return await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=ko&result_type=street_address&key=${Config.GOOGLE_API_KEY}`,
  );
};

export {getAddress};
