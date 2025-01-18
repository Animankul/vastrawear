export default function handler(req, res) {

    let pincodes= {

        "425201": ["Bhusawal","Maharashtra"],
        "110003" : ["Delhi","Delhi"],
        "560017" :["Bangalore","Karnataka"],

    }








    res.status(200).json(pincodes); // Ensure the array contains strings
}
