import readline from 'readline';
import { findTicket } from './findTicket';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("What's the link for the ticketswap event? \n", url => {
  // TODO: Log the answer in a database
  console.log('Starting ticket search');
  findTicket(url);
});
