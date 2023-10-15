import axios from 'axios';

const sendSms = async (from, to, content) => {
    console.log(process.env.CLIENTID, 'sec', process.env.CLIENTSECRET)
    const params = new URLSearchParams({
        clientid: process.env.CLIENTID || "paxiucym",
        clientsecret: process.env.CLIENTSECRET || "cwuoejxp",
        from: "+233546249862",
        to: "+2330200784008",
        content: 'SOME CONTENT',
    }).toString();

    const apiUrl = `https://devp-sms03726-api.hubtel.com/v1/messages/send?${params}`;

    try {
        const response = await axios.get(apiUrl);
        console.log('SMS sent:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error sending SMS:', error);
        throw error;
    }
};

// import fetch from 'node-fetch';

// async function run() {
//     const resp = await fetch(
//         `https://devp-sms03726-api.hubtel.com/v1/messages/send`,
//         {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: 'Basic ' + Buffer.from('<username>:<password>').toString('base64')
//             },
//             body: JSON.stringify({
//                 from: 'MySenderId',
//                 to: 'string',
//                 content: 'hello world'
//             })
//         }
//     );

//     const data = await resp.json();
//     console.log(data);
// }

// run();

export default sendSms;
