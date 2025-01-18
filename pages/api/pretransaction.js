// /pages/api/pretransaction.js
const https = require('https');
const PaytmChecksum = require('paytmchecksum');

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { oid, subTotal, email } = req.body;

      const paytmParams = {
        body: {
          requestType: "Payment",
          mid: process.env.NEXT_PUBLIC_PAYTM_MID,
          websiteName: "vastrawear", // Update for production
          orderId: oid,
          callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
          txnAmount: { value: subTotal, currency: "INR" },
          userInfo: { custId: email },
        },
      };

      const checksum = await PaytmChecksum.generateSignature(
        JSON.stringify(paytmParams.body),
        process.env.PAYTM_MKEY
      );

      paytmParams.head = { signature: checksum };

      const post_data = JSON.stringify(paytmParams);

      const options = {
        hostname: "securegw.paytm.in",
        port: 443,
        path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${oid}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": post_data.length,
        },
      };

      const response = await new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => resolve(JSON.parse(data)));
          res.on('error', reject);
        });
        req.write(post_data);
        req.end();
      });

      if (response.body.txnToken) {
        res.status(200).json({ success: true, txnToken: response.body.txnToken });
      } else {
        res.status(500).json({ success: false, message: "Failed to fetch txnToken" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
