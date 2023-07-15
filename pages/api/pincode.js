import pincodes from '../../thunder-tests/pincode.json';
export default function handler(req, res) {
    res.status(200).json(pincodes);
}