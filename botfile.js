const WebSocket = require('ws');
const DerivAPI = require('@deriv/deriv-api/dist/DerivAPI');
const { find }   = require('rxjs/operators');

const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const port = 3001;


// app_id 1089 is for testing, create your own app_id and use it here.
// go to api.deriv.com to register your own app.
const connection = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=36956');
const api        = new DerivAPI({ connection });
const basic = api.basic;
const expected_payout = process.env.EXPECTED_PAYOUT || 19;

const token = "VoHhgwYIcMFWr90";

//basic.ping().then(console.log);

if (!token) {
    console.error('DERIV_TOKEN environment variable is not set');
    process.exit(1);
}



async function buyContract(contractType, selectedSymbol, selectedDuration, selectedAmount,selectedCurrency, selectedBasis, selectedDurationUnit) {
    try {
        const account = await api.account(token);

        const { balance, currency } = account;

        console.log(`Your current balance is: ${balance.currency} ${balance.display}`);

        balance.onUpdate(() => {
            console.log(`Your new balance is: ${balance.currency} ${balance.display}`);
        });

        //first of all get proposal


      

        const contract = await api.contract({
            contract_type: 'CALL',
            currency:"USD",
            amount       : 50,
            duration     : 5,
            duration_unit: 't',
            symbol       : 'R_100',
            basis        : 'stake',
        });

      //  var buy = await contract.buy();

        

      //  return (console.log())

     contract.onUpdate(({ status, payout, bid_price }) => {
            switch (status) {
                case 'proposal':
                    return console.log(
                        `Current payout: ${payout.currency} ${payout.display}`,
                    );
                case 'open':
                    return console.log(
                        `Current bid price: ${bid_price.currency} ${bid_price.display}`,
                    );
                default:
                    break;
            }
        });

        // Wait until payout is greater than USD 19
        await contract.onUpdate()
            .pipe(find(({ payout }) => payout.value >= expected_payout)).toPromise();

        var buy = await contract.buy();

        console.log(`Buy price is: ${buy.price.currency} ${buy.price.display}`);

        // Wait until the contract is sold
        await contract.onUpdate().pipe(find(({ is_sold }) => is_sold)).toPromise();

        const { profit, status } = contract;

      // console.log(`You ${status}: ${profit.currency} ${profit.display}`);

       return 'Contract has been bought';
    } catch (err) {
        console.error(err);
    } finally {
        // Close the connection and exit
        api.basic.disconnect();
    }


}


// Replace 'YOUR_BOT_TOKEN' with your actual Telegram bot token
const bot = new TelegramBot('6196228459:AAFveMlvk1tCMMhukKA5a3RsxjCtG1DgTtg', { polling: true });

// Middleware to parse incoming JSON requests
app.use(express.json());

// Endpoint to handle incoming updates from the Telegram Bot API
app.post(`/bot${bot.token}`, (req, res) => {
  const update = req.body;
  bot.processUpdate(update);
  res.sendStatus(200);
});

// Handle incoming messages
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  if (messageText.toLowerCase().includes('contract-deriv')) {
    var response = 'Starting transaction...';

// Find the text within the square brackets
const match = messageText.match(/\[(.*?)\]/);

if (match && match[1]) {
  // Split the text by commas
  const values = match[1].split(',').map(value => value.trim().replace(/"/g, ''));


  //buy contract
  buyContract(values[0],values[1],values[2],values[4], values[3],values[5], values[6] ).then(result => {

       
            response = result

            bot.sendMessage(chatId, response)
            .then(() => {
                console.log('Response sent:', response);
            })
            .catch((error) => {
                console.error('Error sending response:', error);
            });

  }).catch((error) => {
    console.error('Error sending response:', error);
  });


}

  }

});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });



