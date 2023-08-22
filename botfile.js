const DerivAPI = require('@deriv/deriv-api/dist/DerivAPI.js');
const WebSocket = require('ws');
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const port = 3001;
var percentage = 0;
//const connection = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=36528');
//const api = new DerivAPI({ connection });
//const token ="vvij6IVp07tvcUW"; app_id = "36956 ";

//const token = "vvij6IVp07tvcUW";



//const connectionTwo = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=36956');
//const apiTwo = new DerivAPI({ connectionTwo });

//const tokenTwo = "7a4Og6k7qAr1QFo";

//main derive functions


async function checkBalance(){
var connection = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=36528');
var api = new DerivAPI({ connection });
//const token ="vvij6IVp07tvcUW"; app_id = "36956 ";

var token = "vvij6IVp07tvcUW";


 try {
    const account = await api.account(token);
const balance = account.balance;
//    const formatted_balance = balance.format;
  //  console.log('Balance:', formatted_balance);

    return JSON.stringify(balance._data.amount);
  } catch (error) {
    console.error('Error: ' + JSON.stringify(error));
    
   return  'Error: ' + JSON.stringify(error);

  }
}


//Get percentage
async function buyContract(contractType, selectedSymbol, selectedDuration, selectedAmount, selectedCurrency, selec>
  var connection = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=36528');
  var api = new DerivAPI({ connection });
  var token = "vvij6IVp07tvcUW";


  try {
    const basic = api.basic;

    await basic.ping();

    const ticks = await api.ticks(selectedSymbol);

    const account = await api.account(token);
    const balance = account.balance;
    const formatted_balance = balance.format;


/*    const contract = await api.contract({
      contract_type: contractType,
      symbol: selectedSymbol,
      duration: selectedDuration,
      duration_unit: selectedDurationUnit,
      currency: selectedCurrency,
      amount: selectedAmount,
      basis: selectedBasis,
      //...contract_options
    });


  const buy = await contract.buy();*/

  
const proposal = {
  proposal: 1,
  amount: selectedAmount,
  basis: selectedBasis,
  contract_type: contractType,
  currency: selectedCurrency,
  duration: selectedDuration,
  duration_unit: selectedDurationUnit,
  symbol: selectedSymbol,
};

  const getProposal = await api.contract(proposal);

  //return getProposal._data.payout._data.value;
  return new Promise((resolve, reject) => {
     /* contract.onUpdate().subscribe(contract => {
        if (contract.is_sold) {
 console.log(contract);
          resolve("-");
        } else {
          resolve("Error");
        }
 resolve (contract.profit._data.percentage);


      });*/
 

        resolve( getProposal._data.payout._data.value);
    });
  } catch (error) {
    console.error('Error: ' + JSON.stringify(error));
    return "Error: " + JSON.stringify(error);
  }
}




/*/get percentage profit

async function buyContractMain(contractType, selectedSymbol, selectedDuration, selectedAmount,selectedCurrency, se>

var connection = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=36528');
var api = new DerivAPI({ connection });
//const token ="vvij6IVp07tvcUW"; app_id = "36956 ";

var token = "vvij6IVp07tvcUW";


const contract = {
    // Specify the contract details
   
    price: selectedPrice
  };

  try {
   /*const basic = api.basic;

basic.ping().then(console.log);

//get ticks object
const ticks = await api.ticks(selectedSymbol);
//ticks.onUpdate().subscribe(console.log);

//console.log(ticks);
*/
//get account information 

/*const account = await api.account(token);

const balance = account.balance;

const formatted_balance = balance.format;

console.log(account);



const contract = await api.contract({
contract_type: contractType,
  symbol:selectedSymbol,
  duration:selectedDuration,
  duration_unit: 'm',
  currency:selectedCurrency,
  amount:selectedAmount, 
  basis: selectedBasis,
  //...contract_options
});

const buy = await contract.buy();

contract.onUpdate().subscribe(contract => {
  if (contract.is_sold) {
     // sell_pop_up.set(contract);

    console.log(contract);
    //percentage = 50;
     return "-";

 }else{
return "Error";
}

 percentage = 50;

return percentage;
});

//contract.onUpdate().subscribe(console.log);

//console.log(buy);

//return true;

} catch (error) {
    // Handle any errors that occur
   console.error('Error:  ' +JSON.stringify(error));
return "Error:"  + JSON.stringify(error);
  }
}
*/




async function test(){

return "test";
}

async function buyContractMain(contractType, selectedSymbol, selectedDuration, selectedAmount, selectedCurrency,se>
  var connection = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=37356');
  var api = new DerivAPI({ connection });
  var token = "VoHhgwYIcMFWr90";
//var token ="vvij6IVp07tvcUW";

  /*const contract = {
    // Specify the contract details
    price: selectedPrice
  };*/

  try {
    const basic = api.basic;
contract_type: contractType,
  symbol:selectedSymbol,
duration:selectedDuration,
  duration_unit: 'm',
  currency:selectedCurrency,
  amount:selectedAmount, 
  basis: selectedBasis,
  //...contract_options
});

const buy = await contract.buy();

contract.onUpdate().subscribe(contract => {
  if (contract.is_sold) {
     // sell_pop_up.set(contract);

    console.log(contract);
    //percentage = 50;
     return "-";

 }else{
return "Error";
}

 percentage = 50;

return percentage;
});

//contract.onUpdate().subscribe(console.log);

//console.log(buy);

 await basic.ping();

    const ticks = await api.ticks(selectedSymbol);

    const account = await api.account(token);
    const balance = account.balance;
    const formatted_balance = balance.format;

    const contract = await api.contract({
      contract_type: contractType,
      symbol: selectedSymbol,
      duration: selectedDuration,
      duration_unit: selectedDurationUnit,
      currency: selectedCurrency,
      amount: selectedAmount,
      basis: selectedBasis,
      //...contract_options
    });

    const buy = await contract.buy();

    return new Promise((resolve, reject) => {
      contract.onUpdate().subscribe(contract => {
        if (contract.is_sold) {
          console.log(contract);
      //    resolve("-");
        } else {
        //  resolve("Error");
        }
                 resolve(contract.profit._data.percentage);
  });
  //      resolve("Contract placed successfully  "+JSON.stringify(contract.profit._data.percentage));
    });
  } catch (error) {
    console.error('Error: ' + JSON.stringify(error));
    return "Error: " + JSON.stringify(error);
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

//  console.log(values); // Output the extracted values
buyContract(values[0],values[1],values[2],values[4], values[3],values[5], values[6] ).then(result => {
    console.log(result); // Output: "successfully received signal"
    
// response = "Retrieved percentage: "+result;
var share  = result;

if(share > 70){
buyContractMain(values[0],values[1],values[2],values[4], values[3],values[5], values[6] ).then(result => {

    
    response = "Successful! Payout = "+share;
  

  bot.sendMessage(chatId, response)
      .then(() => {
        console.log('Response sent:', response);
      })
      .catch((error) => {
        console.error('Error sending response:', error);
      });


}) .catch((error) => {
        console.error('Error sending response:', error);
      });
}else{

response = "Could not buy/sell contract. \n Percentage share is lower than 70. \n Percentage share =  ["+share+"]";

}
//      response = "Contract Placed :  "+result;

// Send the response back to the user
    bot.sendMessage(chatId, response)
      .then(() => {
        console.log('Response sent:', response);
      })
      .catch((error) => {
        console.error('Error sending response:', error);
      });

  });




}else{
   response = 'an error occurred';



    // Send the response back to the user
    bot.sendMessage(chatId, response)
      .then(() => {
        console.log('Response sent:', response);
      }).catch((error) => {
        console.error('Error sending response:', error);
      });

}


  }else if(messageText.toLowerCase().includes('balance')){

     checkBalance().then(result => {
    console.log(result); // Output: "successfully received signal"

      response = "Balance  retrieved  successfully:   "+result;

    // Send the response back to the user
    bot.sendMessage(chatId, response)
      .then(() => {
        console.log('Response sent:', response);
      })
      .catch((error) => {
        console.error('Error sending response:', error);
      });
  });

}

else if(messageText.toLowerCase().includes('hi') || messageText.toLowerCase().includes('hello') ){


    const response = 'Hi, I am the official trading bot for this channel. I can help you purchase a contract if yo>

    // Send the response back to the user
    bot.sendMessage(chatId, response)
      .then(() => {
        console.log('Response sent:', response);
      })
      .catch((error) => {
        console.error('Error sending response:', error);
      });
  
}
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
