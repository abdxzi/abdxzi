import { Address } from 'ton-core';

const rawAddress = 'a3935861f79daf59a13d6d182e1640210c02f98e3df18fda74b8f5ab141abf18';
const workchain = 0;

// Create the Address object
const address = new Address(workchain, Buffer.from(rawAddress, 'hex'));

// Convert to friendly format
const friendlyAddress = address.toString();

console.log(friendlyAddress);